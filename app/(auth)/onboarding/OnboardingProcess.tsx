/* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import Image from "next/image";
// import { useState } from "react";
// import Link from "next/link";
// import CustomButton from "@/components/CustomButton";

// const OnboardingProcess = () => {
//   const [step, setStep] = useState(1);
//   const [selectedServices, setSelectedServices] = useState<string[]>([]);

//   // Step 2 states
//   const [yearsOfExperience, setYearsOfExperience] = useState("0-2 years");
//   const [certifications, setCertifications] = useState([{ title: "", year: "" }]);
//   const [serviceDescription, setServiceDescription] = useState("");
//   const [languages, setLanguages] = useState([{ language: "English", year: "" }]);

//   // Step 3 states
//   const [projectTitle, setProjectTitle] = useState("");
//   const [projectDescription, setProjectDescription] = useState("");
//   const [skillsUsed, setSkillsUsed] = useState("");
//   const [uploadedMedia, setUploadedMedia] = useState(null);

//   const services = [
//     "Makeup & Beauty",
//     "Fashion & Tailoring",
//     "Home Cleaning",
//     "Graphic Design",
//     "Photography",
//     "Plumbing",
//     "Web Development",
//     "Other"
//   ];

//   const experienceOptions = [
//     "0-2 years",
//     "3-5 years",
//     "6-10 years",
//     "10+ years"
//   ];

//   const yearOptions = [
//     "",
//     "2024",
//     "2023",
//     "2022",
//     "2021",
//     "2020",
//     // Add more years as needed
//   ];

//   const skillsOptions = [
//     "Digital Marketing",
//     "Graphic Design",
//     "Web Development",
//     "Photography",
//     "Content Writing",
//     // Add more skills as needed
//   ];

//   const handleServiceToggle = (service: string) => {
//     if (selectedServices.includes(service)) {
//       setSelectedServices(selectedServices.filter(s => s !== service));
//     } else if (selectedServices.length < 2) {
//       setSelectedServices([...selectedServices, service]);
//     }
//     // If already 2 selected, ignore adding more
//   };

//   const handleContinueStep1 = () => {
//     if (selectedServices.length > 1) {
//       console.log(`Selected services: ${selectedServices.join(", ")}`);
//       setStep(2);
//     }
//   };

//   const addCertification = () => {
//     setCertifications([...certifications, { title: "", year: "" }]);
//   };

//   const removeCertification = (index: number) => {
//     if (certifications.length > 1) {
//       setCertifications(certifications.filter((_, i) => i !== index));
//     }
//   };

//   const updateCertification = (index: number, field: "title" | "year", value: string) => {
//     const updated = certifications.map((cert, i) =>
//       i === index ? { ...cert, [field]: value } : cert
//     );
//     setCertifications(updated);
//   };

//   const addLanguage = () => {
//     setLanguages([...languages, { language: "", year: "" }]);
//   };

//   const removeLanguage = (index: number) => {
//     if (languages.length > 1) {
//       setLanguages(languages.filter((_, i) => i !== index));
//     }
//   };

//   const updateLanguage = (index: number, field: "language" | "year", value: string) => {
//     const updated = languages.map((lang, i) =>
//       i === index ? { ...lang, [field]: value } : lang
//     );
//     setLanguages(updated);
//   };

//   const handleContinueStep2 = () => {
//     console.log({
//       yearsOfExperience,
//       certifications,
//       serviceDescription,
//       languages
//     });
//     setStep(3);
//   };

//   const handleUploadProject = () => {
//     console.log({
//       projectTitle,
//       projectDescription,
//       skillsUsed,
//       uploadedMedia
//     });
//     // Final step logic (e.g., submit project and complete onboarding)
//     console.log("Project uploaded and onboarding complete!");
//   };

//   const handleSkipForNow = () => {
//     // Skip project upload and complete onboarding
//     console.log("Skipped project upload, onboarding complete!");
//   };

//   const handleBack = () => {
//     if (step > 1) {
//       setStep(step - 1);
//     } else {
//       console.log("Back to home");
//     }
//   };

//   const progress = ((step / 3) * 100).toFixed(2) + "%"; // Assuming 3 steps total

//   return (
//     <div className="flex mx-5 md:mx-20 max-w-[450px] lg:max-w-full min-h-screen md:p-8 bg-[#FFFDFA]">
//       <div className="flex flex-row gap-6 w-full md:p-8 rounded-2xl">
//         {/* Logo, Back Arrow, and Progress Bar */}
//         {/* <div className="flex flex-col items-start mb-10">
//           <Link href="/">
//             <Image
//               src="/assets/icons/AppLogo.png"
//               alt="Whorkaz Logo"
//               width={150}
//               height={14}
//               className="object-contain"
//             />
//           </Link>
//           <button onClick={handleBack} className="-ml-6 -mt-4">
//             <Image
//               src="/assets/icons/back-arrow.png"
//               alt="Back Arrow"
//               width={100}
//               height={100}
//               className="object-contain"
//             />
//           </button>
//         </div> */}
//         {/* Logo, Back Arrow, and Progress Bar on big screen*/}
//         <div className="hidden md:flex flex-col items-start mb-10">
//           <Link href="/">
//             <Image
//               src="/assets/icons/AppLogo.png"
//               alt="Whorkaz Logo"
//               width={150}
//               height={14}
//               className="object-contain"
//             />
//           </Link>
//           <button onClick={handleBack} className="-ml-6 -mt-4">
//             <Image
//               src="/assets/icons/back-arrow.png"
//               alt="Back Arrow"
//               width={100}
//               height={100}
//               className="object-contain"
//             />
//           </button>
//         </div>

//         <div className="mt-20 w-full">
//           <div className="flex flex-row items-center gap-3 -ml-8 -mt-10 sm:hidden">
//             {/* Back Button */}
//             <button onClick={handleBack} className="flex-shrink-0">
//               <Image
//                 src="/assets/icons/back-arrow.png"
//                 alt="Back Arrow"
//                 width={100}
//                 height={100}
//                 className="object-contain"
//               />
//             </button>

//             {/* Progress Bar */}
//             <div className="flex-1 h-2 bg-[#F1F1F5] rounded-full overflow-hidden">
//               <div
//                 className="h-full bg-[#3900DC] transition-all duration-500 ease-in-out"
//                 style={{ width: progress }}
//               ></div>
//             </div>
//           </div>


//           {/* progress bar on big screen */}
//           <div className="hidden sm:flex flex-1 h-2 bg-[#F1F1F5] rounded-full overflow-hidden">
            
//             <div
//               className="h-full bg-[#3900DC] transition-all duration-500 ease-in-out"
//               style={{ width: progress }}
//             ></div>
//           </div>

//           {step === 1 && (
//             <>
//               {/* Step 1 Content */}
//               <h2 className="text-[28px] font-semibold text-[#191926] my-4">
//                 What services do you offer?
//               </h2>
//               <p className="text-[16px] text-[#4B4B56] mb-8">
//                 Select the main service(s) you provide (you cant select more than two):
//               </p>

//               {/* Services Checkboxes */}
//               <div className="flex flex-col gap-4 md:mr-150">
//                 {services.map((service) => (
//                   <label key={service} className="flex items-center cursor-pointer">
//                     <input
//                       type="checkbox"
//                       checked={selectedServices.includes(service)}
//                       onChange={() => handleServiceToggle(service)}
//                       className={`mr-3 h-4 w-4 text-[#3900DC] focus:ring-[#3900DC] border-[#E5E5E9] bg-white rounded ${
//                         selectedServices.length >= 2 && !selectedServices.includes(service)
//                           ? "opacity-50 cursor-not-allowed"
//                           : ""
//                       }`}
//                       disabled={selectedServices.length >= 2 && !selectedServices.includes(service)}
//                     />
//                     <span className="text-[16px] text-[#191926] font-medium">
//                       {service}
//                     </span>
//                   </label>
//                 ))}
//               </div>

//               {/* Continue Button */}
//               <div className="mt-10">
//                 <CustomButton
//                   title="Continue"
//                   onClick={handleContinueStep1}
//                 />
//               </div>
//             </>
//           )}

//           {step === 2 && (
//             <>
//               {/* Step 2 Content */}
//               <h2 className="text-[28px] font-semibold text-[#191926] my-4">
//                 Tell Us About Your Experience
//               </h2>
//               <p className="text-[16px] text-[#4B4B56] mb-8">
//                 Showcase your skills.
//               </p>

//               <div className="md:mr-80">
//                  {/* Years of Experience */}
//               <div className="mb-6">
//                 <label className="text-[16px] text-[#4B4B56] mb-2 block">Years of experience</label>
//                 <select
//                   value={yearsOfExperience}
//                   onChange={(e) => setYearsOfExperience(e.target.value)}
//                   className="w-full p-3 rounded-lg border border-[#E5E5E9] bg-white focus:outline-none focus:border-[#3900DC]"
//                 >
//                   {experienceOptions.map((option) => (
//                     <option key={option} value={option}>
//                       {option}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Certifications or Courses */}
//               <div className="mb-6">
//                 <label className="text-[16px] text-[#4B4B56] mb-2 block">Certification or Courses</label>
//                 {certifications.map((cert, index) => (
//                   <div key={index} className="flex gap-4 mb-2">
//                     <input
//                       type="text"
//                       placeholder="Title label"
//                       value={cert.title}
//                       onChange={(e) => updateCertification(index, "title", e.target.value)}
//                       className="flex-1 p-3 text-[#4B4B56] rounded-lg border border-[#E5E5E9] bg-white focus:outline-none focus:border-[#3900DC]"
//                     />
//                     <select
//                       value={cert.year}
//                       onChange={(e) => updateCertification(index, "year", e.target.value)}
//                       className="w-32 p-3 rounded-lg text-[#4B4B56] border border-[#E5E5E9] bg-white focus:outline-none focus:border-[#3900DC]"
//                     >
//                       {yearOptions.map((year) => (
//                         <option key={year} value={year}>
//                           {year || "Year"}
//                         </option>
//                       ))}
//                     </select>
//                     {certifications.length > 1 && (
//                       <button
//                         type="button"
//                         onClick={() => removeCertification(index)}
//                         className="text-[#4B4B56] hover:text-[#3900DC]"
//                       >
//                         Remove
//                       </button>
//                     )}
//                   </div>
//                 ))}
//                 <button
//                   type="button"
//                   onClick={addCertification}
//                   className="text-[#3900DC] text-sm hover:underline"
//                 >
//                   + Add more courses
//                 </button>
//               </div>

//               {/* Service Description */}
//               <div className="mb-6">
//                 <label className="text-[16px] text-[#4B4B56] mb-2 block">Service description</label>
//                 <textarea
//                   placeholder="Share a bit about your work experience, cool projects you've done and your expertise"
//                   value={serviceDescription}
//                   onChange={(e) => setServiceDescription(e.target.value)}
//                   rows={4}
//                   className="w-full p-3 rounded-lg text-[#4B4B56] border border-[#E5E5E9] bg-white focus:outline-none focus:border-[#3900DC] resize-none"
//                 />
//               </div>

//               {/* Languages */}
//               <div className="mb-6">
//                 <label className="text-[16px] text-[#4B4B56] mb-2 block">Languages</label>
//                 {languages.map((lang, index) => (
//                   <div key={index} className="flex gap-4 mb-2">
//                     <input
//                       type="text"
//                       placeholder="English"
//                       value={lang.language}
//                       onChange={(e) => updateLanguage(index, "language", e.target.value)}
//                       className="flex-1 p-3 rounded-lg text-[#4B4B56] border border-[#E5E5E9] bg-white focus:outline-none focus:border-[#3900DC]"
//                     />
//                     <select
//                       value={lang.year}
//                       onChange={(e) => updateLanguage(index, "year", e.target.value)}
//                       className="w-32 p-3 rounded-lg text-[#4B4B56] border border-[#E5E5E9] bg-white focus:outline-none focus:border-[#3900DC]"
//                     >
//                       {yearOptions.map((year) => (
//                         <option key={year} value={year}>
//                           {year || "Year"}
//                         </option>
//                       ))}
//                     </select>
//                     {languages.length > 1 && (
//                       <button
//                         type="button"
//                         onClick={() => removeLanguage(index)}
//                         className="text-[#4B4B56] hover:text-[#3900DC]"
//                       >
//                         Remove
//                       </button>
//                     )}
//                   </div>
//                 ))}
//                 <button
//                   type="button"
//                   onClick={addLanguage}
//                   className="text-[#3900DC] text-sm hover:underline"
//                 >
//                   + Add more languages
//                 </button>
//               </div>
//               </div>

             

//               {/* Continue Button */}
//               <div className="mt-10">
//                 <CustomButton
//                   title="Continue"
//                   onClick={handleContinueStep2}
//                 />
//               </div>
//             </>
//           )}

//           {step === 3 && (
//             <>
//               {/* Step 3 Content - Show Your Work */}
//               <h2 className="text-[28px] font-semibold text-[#191926] my-4">
//                 Show Your Work
//               </h2>
//               <p className="text-[16px] text-[#4B4B56] mb-8">
//                 Upload work to increase trust and visibility.
//               </p>

//               <div className="md:mr-80">
//                 {/* Project Title */}
//               <div className="mb-6">
//                 <label className="text-[16px] text-[#4B4B56] mb-2 block">Project title</label>
//                 <input
//                   type="text"
//                   placeholder="Add project title"
//                   value={projectTitle}
//                   onChange={(e) => setProjectTitle(e.target.value)}
//                   className="w-full p-3 text-[#4B4B56] rounded-lg border border-[#E5E5E9] bg-white focus:outline-none focus:border-[#3900DC]"
//                 />
//               </div>

//               {/* Project Description */}
//               <div className="mb-6">
//                 <label className="text-[16px] text-[#4B4B56] mb-2 block">Project description</label>
//                 <p className="text-[12px] text-[#A1A1A8] mb-2">(min of 2000 characters)</p>
//                 <textarea
//                   placeholder="Share details about your project"
//                   value={projectDescription}
//                   onChange={(e) => setProjectDescription(e.target.value)}
//                   rows={6}
//                   className="w-full p-3 text-[#4B4B56] rounded-lg border border-[#E5E5E9] bg-white focus:outline-none focus:border-[#3900DC] resize-none"
//                 />
//               </div>

//               {/* Skills Used */}
//               <div className="mb-6">
//                 <label className="text-[16px] text-[#4B4B56] mb-2 block">Skills used</label>
//                 <select
//                   value={skillsUsed}
//                   onChange={(e) => setSkillsUsed(e.target.value)}
//                   className="w-full p-3 text-[#4B4B56] rounded-lg border border-[#E5E5E9] bg-white focus:outline-none focus:border-[#3900DC]"
//                 >
//                   <option value="" disabled>
//                     Find skills
//                   </option>
//                   {skillsOptions.map((skill) => (
//                     <option key={skill} value={skill}>
//                       {skill}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Media Upload */}
//               <div className="mb-6">
//                 <label className="text-[16px] text-[#4B4B56] mb-2 block">Upload media</label>
//                 <div className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-[#E5E5E9] rounded-lg bg-white cursor-pointer hover:bg-[#F9F9FB]">
//                   <input
//                     type="file"
//                     accept="image/*,video/*"
//                     className="hidden"
//                     id="mediaUpload"
//                   />
//                   <label htmlFor="mediaUpload" className="flex flex-col items-center">
//                     <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#F1F1F5] text-[#3900DC] mb-2">
//                       +
//                     </div>
//                     <p className="text-[14px] text-[#4B4B56]">Browse existing media</p>
//                     <p className="text-[12px] text-[#A1A1A8]">Add image (png, jpg, gif) or video (mp4) to serve as your featured media</p>
//                     <p className="text-[12px] text-[#A1A1A8] mt-1">Recommended: 1500 x 2000 (max 2MB)</p>
//                   </label>
//                 </div>
//               </div>
//               {/* Buttons */}
//               <div className="flex flex-row justify-between gap-4 mt-10">
//                 <button
//                   onClick={handleSkipForNow}
//                   className="text-[14px] px-6 py-3 border border-[#E5E5E9] rounded-full text-[#4B4B56] hover:bg-[#F9F9FB] transition-colors"
//                 >
//                   Skip for now
//                 </button>
//                 <button onClick={handleUploadProject} className="bg-[#3900DC] cursor-pointer text-white font-semibold rounded-[32px] w-[200px] md:w-[200px] h-[54px] px-5 flex items-center justify-center hover:opacity-90 transition ">
//                   Upload project
//                 </button>
//                 {/* <CustomButton
//                   title="Upload project"
//                   onClick={handleUploadProject}
//                 /> */}
//               </div>
//               </div>

              

              
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OnboardingProcess;



"use client";

import Image from "next/image";
import { useState, ChangeEvent, useEffect } from "react";
import Link from "next/link";
import CustomButton from "@/components/CustomButton";
import { useWorkmanOnboarding } from "@/app/actions/reactQuery";
import { uploadSingleFile } from "@/app/actions/api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { WorkmanOnboardingPayload } from "@/app/actions/type";

const OnboardingProcess = () => {
  
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.error("Please sign up first");
      router.push("/signup");
    }
  }, []);

  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Step 1: Services
  // Step 1
  const services = [
    "Makeup & Beauty",
    "Fashion & Tailoring",
    "Home Cleaning",
    "Graphic Design",
    "Photography",
    "Plumbing",
    "Web Development",
    "Other"
  ];

  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  // Step 2: Experience
  const [yearsOfExperience, setYearsOfExperience] = useState(0);
  const [certifications, setCertifications] = useState<{ name: string; year: number }[]>([{ name: "", year: 0 }]);
  const [serviceDescription, setServiceDescription] = useState("");
  const [languages, setLanguages] = useState<string[]>([""]);

  // Step 3: Past Works
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [skillsUsed, setSkillsUsed] = useState("");

  const [pastWorks, setPastWorks] = useState<{ projectTitle: string; projectDescription: string; skillsUsed: string[]; media: string[] }[]>([{ projectTitle: "", projectDescription: "", skillsUsed: [], media: [] }]);
  const [mediaFiles, setMediaFiles] = useState<File[]>([]); // For step 3 media
  const [mediaPreviews, setMediaPreviews] = useState<string[]>([]);

  const { mutateAsync: onboardWorkman } = useWorkmanOnboarding();

  const handleServiceToggle = (service: string) => {
    setSelectedServices((prev) => 
      prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service].slice(0, 2)
    );
  };

  const handleContinueStep1 = () => {
    if (selectedServices.length > 0) {
      setStep(2);
    } else {
      toast.error("Select at least one service");
    }
  };

  const addCertification = () => {
    setCertifications([...certifications, { name: "", year: 0 }]);
  };

  const removeCertification = (index: number) => {
    if (certifications.length > 1) {
      setCertifications(certifications.filter((_, i) => i !== index));
    }
  };

  const updateCertification = (index: number, field: "name" | "year", value: string | number) => {
    const updated = certifications.map((cert, i) =>
      i === index ? { ...cert, [field]: value } : cert
    );
    setCertifications(updated);
  };

  const handleAddLanguage = () => {
    setLanguages([...languages, ""]);
  };

  const handleRemoveLanguage = (index: number) => {
    if (languages.length > 1) {
      setLanguages(languages.filter((_, i) => i !== index));
    }
  };

  const handleUpdateLanguage = (index: number, value: string) => {
    const updated = languages.map((lang, i) => i === index ? value : lang);
    setLanguages(updated);
  };

  const handleContinueStep2 = () => {
    if (yearsOfExperience > 0 && serviceDescription.trim() && languages.some(l => l.trim())) {
      setStep(3);
    } else {
      toast.error("Please fill all required fields");
    }
  };

  const handleMediaChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setMediaFiles((prev) => [...prev, ...newFiles]);

      newFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setMediaPreviews((prev) => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeMedia = (index: number) => {
    setMediaFiles((prev) => prev.filter((_, i) => i !== index));
    setMediaPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUploadProject = async () => {
    setIsLoading(true);
    try {
      const uploadedMediaUrls = await Promise.all(mediaFiles.map(uploadSingleFile));

      const payload: WorkmanOnboardingPayload = {
        services: selectedServices.map((s) => ({
          serviceId: null,
          customServiceName: s,
        })),
        experience: {
          yearsOfExperience,
          certifications: certifications.filter((c) => c.name.trim()),
          serviceDescription,
          languages: languages.filter((l) => l.trim()),
        },
        pastWorks: [
          {
            projectTitle: pastWorks[0].projectTitle,
            projectDescription: pastWorks[0].projectDescription,
            skillsUsed: pastWorks[0].skillsUsed,
            media: uploadedMediaUrls,
          },
        ],
      };

      await onboardWorkman(payload);
      toast.success("Onboarding completed!");
      router.push("/dashboard");
    } catch (error: any) {
      toast.error("Upload failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkipForNow = () => {
    // Skip and complete onboarding without past works
    toast.info("Onboarding skipped past works");
    router.push("/dashboard");
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      router.back();
    }
  };

  const progress = ((step / 3) * 100).toFixed(0) + "%";

  return (
    <div className="flex mx-5 md:mx-20 max-w-[450px] lg:max-w-full min-h-screen md:p-8 bg-[#FFFDFA]">
      <div className="flex flex-row gap-6 w-full md:p-8 rounded-2xl">
        <div className="hidden md:flex flex-col items-start mb-10">
          <Link href="/">
            <Image
              src="/assets/icons/AppLogo.png"
              alt="Whorkaz Logo"
              width={150}
              height={14}
              className="object-contain"
            />
          </Link>
          <button onClick={handleBack} className="-ml-6 -mt-4">
            <Image
              src="/assets/icons/back-arrow.png"
              alt="Back Arrow"
              width={100}
              height={100}
              className="object-contain"
            />
          </button>
        </div>

        <div className="mt-20 w-full">
          <div className="flex flex-row items-center gap-3 -ml-8 -mt-10 sm:hidden">
            <button onClick={handleBack} className="flex-shrink-0">
              <Image
                src="/assets/icons/back-arrow.png"
                alt="Back Arrow"
                width={100}
                height={100}
                className="object-contain"
              />
            </button>
            <div className="flex-1 h-2 bg-[#F1F1F5] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#3900DC] transition-all duration-500 ease-in-out"
                style={{ width: progress }}
              ></div>
            </div>
          </div>

          <div className="hidden sm:flex flex-1 h-2 bg-[#F1F1F5] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#3900DC] transition-all duration-500 ease-in-out"
              style={{ width: progress }}
            ></div>
          </div>

          {step === 1 && (
            <>
              <h2 className="text-[28px] font-semibold text-[#191926] my-4">
                What services do you offer?
              </h2>
              <p className="text-[16px] text-[#4B4B56] mb-8">
                Select the main service(s) you provide (you cant select more than two):
              </p>

              <div className="flex flex-col gap-4 md:mr-150">
                {services.map((service) => (
                  <label key={service} className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedServices.includes(service)}
                      onChange={() => handleServiceToggle(service)}
                      className={`mr-3 h-4 w-4 text-[#3900DC] focus:ring-[#3900DC] border-[#E5E5E9] bg-white rounded ${
                        selectedServices.length >= 2 && !selectedServices.includes(service)
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      disabled={selectedServices.length >= 2 && !selectedServices.includes(service)}
                    />
                    <span className="text-[16px] text-[#191926] font-medium">
                      {service}
                    </span>
                  </label>
                ))}
              </div>

              <div className="mt-10">
                <CustomButton title="Continue" onClick={handleContinueStep1} disabled={isLoading} />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-[28px] font-semibold text-[#191926] my-4">
                Tell Us About Your Experience
              </h2>
              <p className="text-[16px] text-[#4B4B56] mb-8">
                Showcase your skills.
              </p>

              <div className="md:mr-80">
                <div className="mb-6">
                  <label className="text-[16px] text-[#4B4B56] mb-2 block">Years of experience</label>
                  <select
                    value={yearsOfExperience}
                    onChange={(e) => setYearsOfExperience(Number(e.target.value))}
                    className="w-full p-3 text-[#222222] rounded-lg border border-[#E5E5E9] bg-white focus:outline-none focus:border-[#3900DC]"
                  >
                    <option value={0} disabled>Select years</option>
                    <option value={2}>0-2 years</option>
                    <option value={5}>3-5 years</option>
                    <option value={10}>6-10 years</option>
                    <option value={11}>10+ years</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label className="text-[16px] text-[#4B4B56] mb-2 block">Certification or Courses</label>
                  {certifications.map((cert, index) => (
                    <div key={index} className="flex gap-4 mb-2">
                      <input
                        type="text"
                        placeholder="Title label"
                        value={cert.name}
                        onChange={(e) => updateCertification(index, "name", e.target.value)}
                        className="flex-1 p-3 text-[#222222] rounded-lg border border-[#E5E5E9] focus:outline-none focus:border-[#3900DC]"
                      />
                      <select
                        value={cert.year}
                        onChange={(e) => updateCertification(index, "year", Number(e.target.value))}
                        className="w-32 p-3 text-[#222222] rounded-lg border border-[#E5E5E9] focus:outline-none focus:border-[#3900DC]"
                      >
                        <option value={0}>Year</option>
                        <option value={2024}>2024</option>
                        <option value={2023}>2023</option>
                        {/* Add more */}
                      </select>
                      {certifications.length > 1 && (
                        <button onClick={() => removeCertification(index)} className="text-red-500">Remove</button>
                      )}
                    </div>
                  ))}
                  <button onClick={addCertification} className="text-[#3900DC] text-sm hover:underline">+ Add more</button>
                </div>

                <div className="mb-6">
                  <label className="text-[16px] text-[#4B4B56] mb-2 block">Service description</label>
                  <textarea
                    placeholder="Share a bit about your work experience..."
                    value={serviceDescription}
                    onChange={(e) => setServiceDescription(e.target.value)}
                    rows={4}
                    className="w-full text-[#222222] p-3 rounded-lg border border-[#E5E5E9] focus:outline-none focus:border-[#3900DC] resize-none"
                  />
                </div>

                <div className="mb-6">
                  <label className="text-[16px] text-[#4B4B56] mb-2 block">Languages</label>
                  {languages.map((lang, index) => (
                    <div key={index} className="flex gap-4 mb-2">
                      <input
                        type="text"
                        placeholder="English"
                        value={lang}
                        onChange={(e) => handleUpdateLanguage(index, e.target.value)}
                        className="flex-1 text-[#222222] p-3 rounded-lg border border-[#E5E5E9] focus:outline-none focus:border-[#3900DC]"
                      />
                      {languages.length > 1 && (
                        <button onClick={() => handleRemoveLanguage(index)} className="text-red-500">Remove</button>
                      )}
                    </div>
                  ))}
                  <button onClick={handleAddLanguage} className="text-[#3900DC] text-sm hover:underline">+ Add more</button>
                </div>

                <div className="mt-10">
                  <CustomButton title="Continue" onClick={handleContinueStep2} disabled={isLoading} />
                </div>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="text-[28px] font-semibold text-[#191926] my-4">
                Show Your Work
              </h2>
              <p className="text-[16px] text-[#4B4B56] mb-8">
                Upload work to increase trust and visibility.
              </p>

              <div className="md:mr-80">
                <div className="mb-6">
                  <label className="text-[16px] text-[#4B4B56] mb-2 block">Project title</label>
                  <input
                    type="text"
                    placeholder="Add project title"
                    value={pastWorks[0]?.projectTitle || ""}
                    onChange={(e) =>
                      setPastWorks([
                        {
                          ...pastWorks[0],
                          projectTitle: e.target.value,
                        },
                      ])
                    }
                    className="w-full text-[#222222] p-3 rounded-lg border border-[#E5E5E9] focus:outline-none focus:border-[#3900DC]"
                  />
                </div>

                <div className="mb-6">
                  <label className="text-[16px] text-[#4B4B56] mb-2 block">Project description</label>
                  <textarea
                    placeholder="Share details about your project"
                    value={pastWorks[0]?.projectDescription || ""}
                    onChange={(e) =>
                      setPastWorks([
                        {
                          ...pastWorks[0],
                          projectDescription: e.target.value,
                        },
                      ])
                    }
                    rows={6}
                    className="w-full text-[#222222] p-3 rounded-lg border border-[#E5E5E9] focus:outline-none focus:border-[#3900DC] resize-none"
                  />
                </div>

                <div className="mb-6">
                  <label className="text-[16px] text-[#4B4B56] mb-2 block">Skills used</label>
                  <select
                    value={pastWorks[0]?.skillsUsed[0] || ""}
                    onChange={(e) =>
                      setPastWorks([
                        {
                          ...pastWorks[0],
                          skillsUsed: e.target.value ? [e.target.value] : [],
                        },
                      ])
                    }
                    className="w-full text-[#222222] p-3 rounded-lg border border-[#E5E5E9] focus:outline-none focus:border-[#3900DC]"
                  >
                    <option value="" disabled>Select a skill</option>
                    <option value="Plumbing">Plumbing</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Carpentry">Carpentry</option>
                    <option value="Painting">Painting</option>
                    <option value="Web Development">Web Development</option>
                    {/* Add more as needed */}
                  </select>
                </div>

                <div className="mb-6">
                  <label className="text-[16px] text-[#4B4B56] mb-2 block">Upload media</label>
                  <div className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-[#E5E5E9] rounded-lg bg-white cursor-pointer hover:bg-[#F9F9FB]">
                    <input
                      type="file"
                      accept="image/*,video/*"
                      multiple
                      className="hidden"
                      id="mediaUpload"
                      onChange={handleMediaChange}
                    />
                    <label htmlFor="mediaUpload" className="flex flex-col items-center cursor-pointer">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#F1F1F5] text-[#3900DC] mb-2">
                        +
                      </div>
                      <p className="text-[14px] text-[#4B4B56]">Browse existing media</p>
                      <p className="text-[12px] text-[#A1A1A8]">Add image (png, jpg, gif) or video (mp4) to serve as your featured media</p>
                      <p className="text-[12px] text-[#A1A1A8] mt-1">Recommended: 1500 x 2000 (max 2MB)</p>
                    </label>
                  </div>
                  {mediaPreviews.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {mediaPreviews.map((preview, index) => (
                        <div key={index} className="relative">
                          <img src={preview} alt="preview" className="w-20 h-20 object-cover rounded-lg" />
                          <button onClick={() => removeMedia(index)} className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">x</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex flex-row justify-between gap-4 mt-10">
                  <button
                    onClick={handleSkipForNow}
                    className="text-[14px] px-6 py-3 border border-[#E5E5E9] rounded-full text-[#4B4B56] hover:bg-[#F9F9FB] transition-colors"
                  >
                    Skip for now
                  </button>
                  <CustomButton
                    title={isLoading ? "Uploading..." : "Upload project"}
                    onClick={handleUploadProject}
                    disabled={isLoading}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingProcess;