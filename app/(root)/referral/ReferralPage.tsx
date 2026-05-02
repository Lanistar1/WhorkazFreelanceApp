"use client";

import React from "react";
import Header from "@/components/Header";
import { Copy } from "lucide-react";
import { toast } from "react-toastify";
import { useUser } from "@/app/actions/reactQuery";

interface ReferralSummary {
  code: string | null;
  totalReferrals: number;
  completedReferrals: number;
  pendingReferrals: number;
  totalRewardAmount: number;
}

interface ReferralPageProps {
  referralSummary: ReferralSummary;
}

const ReferralPage = () => {
    const { data: userData, isLoading, isError } = useUser();
      const referralResponse = userData?.data?.referralSummary
  const handleCopyCode = async () => {
    if (!referralResponse?.code) {
      toast.error("No referral code available");
      return;
    }

    try {
      await navigator.clipboard.writeText(referralResponse?.code);
      toast.success("Referral code copied!");
    } catch (error) {
      toast.error("Failed to copy referral code");
    }
  };

  return (
    <div className="min-h-screen w-full bg-white text-gray-900">
      <Header title="Referral" />

      <main className="px-6 md:px-24 py-6 space-y-10">
        {/* ================= Referral Code Box ================= */}
        <div className="bg-white border border-[#DBDBE3] rounded-[12px] p-6 shadow-sm">
          <h2 className="text-[18px] font-semibold text-[#32323E] mb-2">
            Your Referral Code
          </h2>

          <p className="text-[14px] text-[#95959F] mb-4">
            Share this code with friends to earn rewards when they register and complete tasks.
          </p>

          <div className="flex items-center justify-between bg-gray-50 border border-[#DBDBE3] rounded-[12px] px-4 py-4">
            <span className="text-[16px] md:text-[18px] font-bold text-[#3900DC] tracking-wider">
              {referralResponse?.code || "No code"}
            </span>

            <button
              onClick={handleCopyCode}
              className="flex items-center cursor-pointer gap-2 px-4 py-2 rounded-full bg-[#3900DC] text-white text-sm font-semibold hover:bg-purple-700 transition-all"
            >
              <Copy className="w-4 h-4" />
              Copy
            </button>
          </div>
        </div>

        {/* ================= Referral Stats ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Referrals */}
          <div className="bg-white border border-[#DBDBE3] rounded-[12px] p-6 shadow-sm">
            <p className="text-[14px] text-[#95959F] font-medium">
              Total Referrals
            </p>
            <h3 className="text-[28px] font-bold text-[#32323E] mt-2">
              {referralResponse?.totalReferrals ?? 0}
            </h3>
          </div>

          {/* Completed Referrals */}
          <div className="bg-white border border-[#DBDBE3] rounded-[12px] p-6 shadow-sm">
            <p className="text-[14px] text-[#95959F] font-medium">
              Completed Referrals
            </p>
            <h3 className="text-[28px] font-bold text-green-600 mt-2">
              {referralResponse?.completedReferrals ?? 0}
            </h3>
          </div>

          {/* Pending Referrals */}
          <div className="bg-white border border-[#DBDBE3] rounded-[12px] p-6 shadow-sm">
            <p className="text-[14px] text-[#95959F] font-medium">
              Pending Referrals
            </p>
            <h3 className="text-[28px] font-bold text-yellow-500 mt-2">
              {referralResponse?.pendingReferrals ?? 0}
            </h3>
          </div>

          {/* Total Reward Amount */}
          <div className="bg-white border border-[#DBDBE3] rounded-[12px] p-6 shadow-sm">
            <p className="text-[14px] text-[#95959F] font-medium">
              Total Reward Earned
            </p>
            <h3 className="text-[28px] font-bold text-[#3900DC] mt-2">
              ₦{Number(referralResponse?.totalRewardAmount ?? 0).toLocaleString()}
            </h3>
          </div>
        </div>

        {/* ================= Extra Section ================= */}
        <div className="bg-gray-50 border border-dashed border-gray-300 rounded-[12px] p-6">
          <h3 className="text-[18px] font-semibold text-[#32323E] mb-2">
            How it works
          </h3>

          <ul className="space-y-2 text-[14px] text-[#4B4B56]">
            <li>• Share your referral code with friends.</li>
            <li>• They sign up using your code.</li>
            <li>• When they complete tasks, you earn rewards.</li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default ReferralPage;