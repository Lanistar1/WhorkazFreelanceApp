"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import CustomButton from "@/components/CustomButton";

const OnboardingProcess = () => {
  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  // Step 2 states
  const [yearsOfExperience, setYearsOfExperience] = useState("0-2 years");
  const [certifications, setCertifications] = useState([{ title: "", year: "" }]);
  const [serviceDescription, setServiceDescription] = useState("");
  const [languages, setLanguages] = useState([{ language: "English", year: "" }]);

  // Step 3 states
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [skillsUsed, setSkillsUsed] = useState("");
  const [uploadedMedia, setUploadedMedia] = useState(null);

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

  const experienceOptions = [
    "0-2 years",
    "3-5 years",
    "6-10 years",
    "10+ years"
  ];

  const yearOptions = [
    "",
    "2024",
    "2023",
    "2022",
    "2021",
    "2020",
    // Add more years as needed
  ];

  const skillsOptions = [
    "Digital Marketing",
    "Graphic Design",
    "Web Development",
    "Photography",
    "Content Writing",
    // Add more skills as needed
  ];

  const handleServiceToggle = (service: string) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter(s => s !== service));
    } else if (selectedServices.length < 2) {
      setSelectedServices([...selectedServices, service]);
    }
    // If already 2 selected, ignore adding more
  };

  const handleContinueStep1 = () => {
    if (selectedServices.length > 0) {
      console.log(`Selected services: ${selectedServices.join(", ")}`);
      setStep(2);
    }
  };

  const addCertification = () => {
    setCertifications([...certifications, { title: "", year: "" }]);
  };

  const removeCertification = (index: number) => {
    if (certifications.length > 1) {
      setCertifications(certifications.filter((_, i) => i !== index));
    }
  };

  const updateCertification = (index: number, field: "title" | "year", value: string) => {
    const updated = certifications.map((cert, i) =>
      i === index ? { ...cert, [field]: value } : cert
    );
    setCertifications(updated);
  };

  const addLanguage = () => {
    setLanguages([...languages, { language: "", year: "" }]);
  };

  const removeLanguage = (index: number) => {
    if (languages.length > 1) {
      setLanguages(languages.filter((_, i) => i !== index));
    }
  };

  const updateLanguage = (index: number, field: "language" | "year", value: string) => {
    const updated = languages.map((lang, i) =>
      i === index ? { ...lang, [field]: value } : lang
    );
    setLanguages(updated);
  };

  const handleContinueStep2 = () => {
    console.log({
      yearsOfExperience,
      certifications,
      serviceDescription,
      languages
    });
    setStep(3);
  };

  const handleUploadProject = () => {
    console.log({
      projectTitle,
      projectDescription,
      skillsUsed,
      uploadedMedia
    });
    // Final step logic (e.g., submit project and complete onboarding)
    console.log("Project uploaded and onboarding complete!");
  };

  const handleSkipForNow = () => {
    // Skip project upload and complete onboarding
    console.log("Skipped project upload, onboarding complete!");
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      console.log("Back to home");
    }
  };

  const progress = ((step / 3) * 100).toFixed(2) + "%"; // Assuming 3 steps total

  return (
    <div className="flex mx-5 md:mx-20 max-w-[450px] lg:max-w-full min-h-screen md:p-8 bg-[#FFFDFA]">
      <div className="flex flex-row gap-6 w-full md:p-8 rounded-2xl">
        {/* Logo, Back Arrow, and Progress Bar */}
        {/* <div className="flex flex-col items-start mb-10">
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
        </div> */}
        {/* Logo, Back Arrow, and Progress Bar on big screen*/}
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
            {/* Back Button */}
            <button onClick={handleBack} className="flex-shrink-0">
              <Image
                src="/assets/icons/back-arrow.png"
                alt="Back Arrow"
                width={100}
                height={100}
                className="object-contain"
              />
            </button>

            {/* Progress Bar */}
            <div className="flex-1 h-2 bg-[#F1F1F5] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#3900DC] transition-all duration-500 ease-in-out"
                style={{ width: progress }}
              ></div>
            </div>
          </div>


          {/* progress bar on big screen */}
          <div className="hidden sm:flex flex-1 h-2 bg-[#F1F1F5] rounded-full overflow-hidden">
            
            <div
              className="h-full bg-[#3900DC] transition-all duration-500 ease-in-out"
              style={{ width: progress }}
            ></div>
          </div>

          {step === 1 && (
            <>
              {/* Step 1 Content */}
              <h2 className="text-[28px] font-semibold text-[#191926] my-4">
                What services do you offer?
              </h2>
              <p className="text-[16px] text-[#4B4B56] mb-8">
                Select the main service(s) you provide (you cant select more than two):
              </p>

              {/* Services Checkboxes */}
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

              {/* Continue Button */}
              <div className="mt-10">
                <CustomButton
                  title="Continue"
                  onClick={handleContinueStep1}
                />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              {/* Step 2 Content */}
              <h2 className="text-[28px] font-semibold text-[#191926] my-4">
                Tell Us About Your Experience
              </h2>
              <p className="text-[16px] text-[#4B4B56] mb-8">
                Showcase your skills.
              </p>

              <div className="md:mr-80">
                 {/* Years of Experience */}
              <div className="mb-6">
                <label className="text-[16px] text-[#4B4B56] mb-2 block">Years of experience</label>
                <select
                  value={yearsOfExperience}
                  onChange={(e) => setYearsOfExperience(e.target.value)}
                  className="w-full p-3 rounded-lg border border-[#E5E5E9] bg-white focus:outline-none focus:border-[#3900DC]"
                >
                  {experienceOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {/* Certifications or Courses */}
              <div className="mb-6">
                <label className="text-[16px] text-[#4B4B56] mb-2 block">Certification or Courses</label>
                {certifications.map((cert, index) => (
                  <div key={index} className="flex gap-4 mb-2">
                    <input
                      type="text"
                      placeholder="Title label"
                      value={cert.title}
                      onChange={(e) => updateCertification(index, "title", e.target.value)}
                      className="flex-1 p-3 rounded-lg border border-[#E5E5E9] bg-white focus:outline-none focus:border-[#3900DC]"
                    />
                    <select
                      value={cert.year}
                      onChange={(e) => updateCertification(index, "year", e.target.value)}
                      className="w-32 p-3 rounded-lg border border-[#E5E5E9] bg-white focus:outline-none focus:border-[#3900DC]"
                    >
                      {yearOptions.map((year) => (
                        <option key={year} value={year}>
                          {year || "Year"}
                        </option>
                      ))}
                    </select>
                    {certifications.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeCertification(index)}
                        className="text-[#4B4B56] hover:text-[#3900DC]"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addCertification}
                  className="text-[#3900DC] text-sm hover:underline"
                >
                  + Add more courses
                </button>
              </div>

              {/* Service Description */}
              <div className="mb-6">
                <label className="text-[16px] text-[#4B4B56] mb-2 block">Service description</label>
                <textarea
                  placeholder="Share a bit about your work experience, cool projects you've done and your expertise"
                  value={serviceDescription}
                  onChange={(e) => setServiceDescription(e.target.value)}
                  rows={4}
                  className="w-full p-3 rounded-lg border border-[#E5E5E9] bg-white focus:outline-none focus:border-[#3900DC] resize-none"
                />
              </div>

              {/* Languages */}
              <div className="mb-6">
                <label className="text-[16px] text-[#4B4B56] mb-2 block">Languages</label>
                {languages.map((lang, index) => (
                  <div key={index} className="flex gap-4 mb-2">
                    <input
                      type="text"
                      placeholder="English"
                      value={lang.language}
                      onChange={(e) => updateLanguage(index, "language", e.target.value)}
                      className="flex-1 p-3 rounded-lg border border-[#E5E5E9] bg-white focus:outline-none focus:border-[#3900DC]"
                    />
                    <select
                      value={lang.year}
                      onChange={(e) => updateLanguage(index, "year", e.target.value)}
                      className="w-32 p-3 rounded-lg border border-[#E5E5E9] bg-white focus:outline-none focus:border-[#3900DC]"
                    >
                      {yearOptions.map((year) => (
                        <option key={year} value={year}>
                          {year || "Year"}
                        </option>
                      ))}
                    </select>
                    {languages.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeLanguage(index)}
                        className="text-[#4B4B56] hover:text-[#3900DC]"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addLanguage}
                  className="text-[#3900DC] text-sm hover:underline"
                >
                  + Add more languages
                </button>
              </div>
              </div>

             

              {/* Continue Button */}
              <div className="mt-10">
                <CustomButton
                  title="Continue"
                  onClick={handleContinueStep2}
                />
              </div>
            </>
          )}

          {step === 3 && (
            <>
              {/* Step 3 Content - Show Your Work */}
              <h2 className="text-[28px] font-semibold text-[#191926] my-4">
                Show Your Work
              </h2>
              <p className="text-[16px] text-[#4B4B56] mb-8">
                Upload work to increase trust and visibility.
              </p>

              <div className="md:mr-80">
                {/* Project Title */}
              <div className="mb-6">
                <label className="text-[16px] text-[#4B4B56] mb-2 block">Project title</label>
                <input
                  type="text"
                  placeholder="Add project title"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  className="w-full p-3 rounded-lg border border-[#E5E5E9] bg-white focus:outline-none focus:border-[#3900DC]"
                />
              </div>

              {/* Project Description */}
              <div className="mb-6">
                <label className="text-[16px] text-[#4B4B56] mb-2 block">Project description</label>
                <p className="text-[12px] text-[#A1A1A8] mb-2">(min of 2000 characters)</p>
                <textarea
                  placeholder="Share details about your project"
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  rows={6}
                  className="w-full p-3 rounded-lg border border-[#E5E5E9] bg-white focus:outline-none focus:border-[#3900DC] resize-none"
                />
              </div>

              {/* Skills Used */}
              <div className="mb-6">
                <label className="text-[16px] text-[#4B4B56] mb-2 block">Skills used</label>
                <select
                  value={skillsUsed}
                  onChange={(e) => setSkillsUsed(e.target.value)}
                  className="w-full p-3 rounded-lg border border-[#E5E5E9] bg-white focus:outline-none focus:border-[#3900DC]"
                >
                  <option value="" disabled>
                    Find skills
                  </option>
                  {skillsOptions.map((skill) => (
                    <option key={skill} value={skill}>
                      {skill}
                    </option>
                  ))}
                </select>
              </div>

              {/* Media Upload */}
              <div className="mb-6">
                <label className="text-[16px] text-[#4B4B56] mb-2 block">Upload media</label>
                <div className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-[#E5E5E9] rounded-lg bg-white cursor-pointer hover:bg-[#F9F9FB]">
                  <input
                    type="file"
                    accept="image/*,video/*"
                    className="hidden"
                    id="mediaUpload"
                  />
                  <label htmlFor="mediaUpload" className="flex flex-col items-center">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#F1F1F5] text-[#3900DC] mb-2">
                      +
                    </div>
                    <p className="text-[14px] text-[#4B4B56]">Browse existing media</p>
                    <p className="text-[12px] text-[#A1A1A8]">Add image (png, jpg, gif) or video (mp4) to serve as your featured media</p>
                    <p className="text-[12px] text-[#A1A1A8] mt-1">Recommended: 1500 x 2000 (max 2MB)</p>
                  </label>
                </div>
              </div>
              {/* Buttons */}
              <div className="flex flex-row justify-between gap-4 mt-10">
                <button
                  onClick={handleSkipForNow}
                  className="text-[14px] px-6 py-3 border border-[#E5E5E9] rounded-full text-[#4B4B56] hover:bg-[#F9F9FB] transition-colors"
                >
                  Skip for now
                </button>
                <button onClick={handleUploadProject} className="bg-[#3900DC] cursor-pointer text-white font-semibold rounded-[32px] w-[200px] md:w-[200px] h-[54px] px-5 flex items-center justify-center hover:opacity-90 transition ">
                  Upload project
                </button>
                {/* <CustomButton
                  title="Upload project"
                  onClick={handleUploadProject}
                /> */}
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