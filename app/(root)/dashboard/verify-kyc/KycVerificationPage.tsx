/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import CustomInputField from "@/components/CustomInputField";
import { useVerifyKyc } from "@/app/actions/reactQuery";
import { uploadSingleFile } from "@/app/actions/upload";
import { VerifyKycType } from "@/app/actions/type";
import Header from "@/components/Header";

const KycVerificationPage = () => {
  const router = useRouter();
  const { mutateAsync, isPending } = useVerifyKyc();

  const [isUploading, setIsUploading] = useState(false);
  const [idFile, setIdFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  const [formData, setFormData] = useState<VerifyKycType>({
    fullName: "",
    idNumber: "",
    idPicture: "",
    kycType: "bvn",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0] || null;

    if (!file) return;

    setIdFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!idFile) {
      toast.error("Please upload your ID image");
      return;
    }

    let imageUrl = "";

    setIsUploading(true);
    try {
      imageUrl = await uploadSingleFile(idFile);
    } catch (error) {
      toast.error("Failed to upload ID image");
      setIsUploading(false);
      return;
    } finally {
      setIsUploading(false);
    }

    const payload: VerifyKycType = {
      ...formData,
      idPicture: imageUrl,
    };

    try {
      await mutateAsync(payload);
      toast.success("KYC submitted successfully");
      router.push("/dashboard");
    } catch (error) {
      toast.error("KYC verification failed");
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-white text-gray-900">
        <Header title="KYC Verification" />
        <div className="max-w-xl p-6 ml-5 md:ml-30"> 
            <form onSubmit={handleSubmit} className="space-y-4">
                <CustomInputField
                label="Full Name"
                name="fullName"
                placeholder="Enter full name"
                value={formData.fullName}
                onChange={handleChange}
                required
                />

                <CustomInputField
                label="ID Number"
                name="idNumber"
                placeholder="Enter BVN / NIN"
                value={formData.idNumber}
                onChange={handleChange}
                required
                />

                {/* Upload Field */}
                <div className="w-full">
                <label className="mb-1 block font-semibold text-[18px] text-[#4B4B56]">
                    Upload ID Image
                </label>

                <div className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#E5E5E9] rounded-lg bg-white cursor-pointer hover:bg-[#F9F9FB]">
                    <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="idPicture"
                    onChange={handleImageChange}
                    />

                    <label
                    htmlFor="idPicture"
                    className="flex flex-col items-center cursor-pointer"
                    >
                    {preview ? (
                        <img
                        src={preview}
                        alt="Preview"
                        className="w-24 h-24 object-contain rounded-lg"
                        />
                    ) : (
                        <>
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#F1F1F5] text-[#3900DC] mb-2">
                            +
                        </div>
                        <p className="text-[14px] text-[#4B4B56]">
                            Upload ID image
                        </p>
                        <p className="text-[12px] text-[#A1A1A8]">
                            JPG, PNG • Max 1MB
                        </p>
                        </>
                    )}
                    </label>
                </div>
                </div>

                {/* KYC TYPE */}
                <div className="w-full">
                <label className="mb-1 block font-semibold text-[18px] text-[#4B4B56]">
                    KYC Type
                </label>

                <select
                    name="kycType"
                    value={formData.kycType}
                    onChange={handleChange}
                    className="h-12 w-full rounded-[12px] border border-zinc-200 bg-white px-4 text-[15px] outline-none focus:border-[#3900DC]"
                >
                    <option value="bvn">BVN</option>
                    <option value="nin">NIN</option>
                    <option value="passport">International Passport</option>
                </select>
                </div>

                <button
                disabled={isPending || isUploading}
                className="w-full bg-[#3900DC] text-white py-2 rounded-lg disabled:opacity-60"
                >
                {isUploading
                    ? "Uploading ID..."
                    : isPending
                    ? "Verifying..."
                    : "Verify KYC"}
                </button>
            </form>
        </div>
    </div>
    
  );
};

export default KycVerificationPage;
