'use client'
import React, { useEffect } from "react";
//import { Bell, MessageSquare, Wallet } from "lucide-react";
import Image from "next/image";
import Header from "@/components/Header";
import Link from "next/link";
import { useUser } from "@/app/actions/reactQuery";


const DashboardPage = () => {

  const { data: userData, isLoading, isError } = useUser();
  // const user = data?.user;
  const user = userData?.data?.user;


  useEffect(() => {
    if (user?.kycVerificationStatus) {
      // Save specifically for use on other pages
      localStorage.setItem("userKycStatus", user.kycVerificationStatus);
      console.log("my KYC status", user.kycVerificationStatus)
    }
  }, [user]); 
  // Default fallback
   const fullName = user?.client?.clientType === "individual"
    ? `${user.firstName || user.client.firstName || ""} ${user.lastName ||user.client.lastName || ""}`.trim() || "User"
    : user?.client?.companyName || "User";

  const profilePhoto = user?.client?.photo || "/assets/images/person3.png";
  const phoneVerified = user?.isPhoneVerified;
  const emailVerified = user?.isEmailVerified;

  // Profile completion percentage (example logic)
  const completionItems = [
    user?.client?.photo !== null,
    phoneVerified,
    emailVerified,
    true, // payments (you can track this later)
    false // KYC (null means not started)
  ];
  const completedCount = completionItems.filter(Boolean).length;
  const completionPercent = (completedCount / 5) * 100;

  

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#3900DC] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="min-h-screen w-full bg-white dark:bg-white text-gray-900 dark:text-gray-900">
        {/* Header */}
        <Header title="Welcome, Alex" />

        {/* Main Content */}
        <main className="px-6 py-4">
          {/* Banner */}
          <div className="bg-[#EBE5FB] dark:bg-[#EBE5FB] rounded-2xl p-6 mb-8">
            <h2 className="text-2xl font-bold mb-2">Looking for work? We have 100 jobs that {"\n"} currently match your skills.</h2>
            <p className="text-[#95959F] dark:text-gray-600 mb-4">Clients trust complete profiles. Fill in your skills, experience, and upload an ID.</p>
            <div className="flex space-x-4">
              <Link href='/explore'>
                <button className="bg-[#3900DC] text-white px-4 py-2 rounded-full font-medium hover:bg-purple-700 transition-colors">Find your next  job </button>
              </Link>
              <Link href="/dashboard/verify-kyc">
                <button className="bg-white dark:bg-white text-gray-900 dark:text-gray-900 px-4 py-2 rounded-full font-medium border border-gray-300 dark:border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-100 transition-colors cursor-pointer">Verify KYC</button>
              </Link>
            </div>
          </div>

          {/* Search and Profile Section */}
          <div className="flex flex-col-reverse lg:flex-row lg:space-x-6 mb-8">
            {/* Search and Categories */}
            <div className="flex-1 mt-6 lg:mt-0 mb-10 md:mb-0">
              <input
                type="text"
                placeholder="What do you need help with"
                className="w-full px-4 py-3 rounded-[12px] border border-gray-300 dark:border-gray-300 bg-white dark:bg-white focus:outline-none focus:ring-2 focus:ring-purple-600 dark:focus:ring-purple-600 mb-6"
              />
              <div className="flex flex-row justify-between space-x-4 overflow-x-auto pb-4">
                <button className="flex flex-col justify-center items-center w-[128px] h-[94px] px-4 py-2 bg-white dark:bg-white rounded-[12px] shadow-sm hover:shadow-md transition-shadow">
                  <svg className="h-6 w-6 text-gray-500 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                  <span className="text-sm mt-1">Carpentry</span>
                </button>
                <button className="flex flex-col justify-center items-center w-[128px] h-[94px] px-4 py-2 bg-white dark:bg-white rounded-[12px] shadow-sm hover:shadow-md transition-shadow">
                  <svg className="h-6 w-6 text-gray-500 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="text-sm mt-1">Electrical</span>
                </button>
                <button className="flex flex-col justify-center items-center w-[128px] h-[94px] px-4 py-2 bg-white dark:bg-white rounded-[12px] shadow-sm hover:shadow-md transition-shadow">
                  <svg className="h-6 w-6 text-gray-500 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm mt-1">Auto</span>
                </button>
                <button className="flex flex-col justify-center items-center w-[128px] h-[94px] px-4 py-2 bg-white dark:bg-white rounded-[12px] shadow-sm hover:shadow-md transition-shadow">
                  <svg className="h-6 w-6 text-gray-500 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span className="text-sm mt-1">Repairs</span>
                </button>
                <button className="flex flex-col justify-center items-center px-4 py-2 w-[128px] h-[94px] bg-white dark:bg-white rounded-[12px] shadow-sm hover:shadow-md transition-shadow">
                  <svg className="h-6 w-6 text-gray-500 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                  <span className="text-sm mt-1">Moving</span>
                </button>
              </div>

              {/* Popular Projects */}
              <div className="mt-5 md:mt-10">
                <h2 className="text-2xl font-bold mb-4">Popular projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="rounded-2xl overflow-hidden shadow-sm">
                    <Image src="/assets/images/plumbling.png" alt="Plumbing repairs" width={300} height={200} className="w-full" />
                    <div className="p-4 bg-white dark:bg-white">
                      <p className="font-medium">Plumbing repairs</p>
                      <p className="text-sm text-gray-500 dark:text-gray-500">Projects starting from N5,000</p>
                    </div>
                  </div>
                  <div className="rounded-2xl overflow-hidden shadow-sm">
                    <Image src="/assets/images/plumbling.png" alt="Electrical repairs" width={300} height={200} className="w-full" />
                    <div className="p-4 bg-white dark:bg-white">
                      <p className="font-medium">Electrical repairs</p>
                      <p className="text-sm text-gray-500 dark:text-gray-500">Projects starting from N5,000</p>
                    </div>
                  </div>
                  <div className="rounded-2xl overflow-hidden shadow-sm">
                    <Image src="/assets/images/plumbling.png" alt="Plumbing repairs" width={300} height={200} className="w-full" />
                    <div className="p-4 bg-white dark:bg-white">
                      <p className="font-medium">Plumbing repairs</p>
                      <p className="text-sm text-gray-500 dark:text-gray-500">Projects starting from N5,000</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Completion */}
            <div className="lg:w-100 lg:h-[431px] mt-4 lg:mt-0 bg-white dark:bg-white rounded-[12px] p-6 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <Image
                  src={user?.profilePic || user?.workman?.photo || "/assets/images/person3.png"}
                  alt="Whorkaz Logo"
                  width={48}
                  height={48}
                  className="rounded-full h-20 w-20 object-cover border-2 border-white shadow-md"
                />
                <div>
                  {/* <p className="font-medium">Jason Alexander</p> */}
                  <p className="font-medium">{fullName}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">Workaz Client</p>
                </div>
              </div>
              <p className="font-medium mb-2">Complete your profile</p>
              <div className="w-full bg-gray-200 dark:bg-gray-200 rounded-full h-2 mb-2 mt-4">
                <div className="bg-[#3900DC] h-2 rounded-full" style={{ width: "20%" }}></div>
              </div>
               <div className="mt-8">
              <p className="text-[16px] font-semibold text-[#95959F]">Actionable insights</p>
              <ul className="space-y-5 text-sm mt-4">
                {/* Phone Verification */}
                <li className="flex items-center space-x-2">
                  <div className={`h-4 w-4 rounded-full border flex items-center justify-center ${user?.isPhoneVerified ? "bg-[#3900DC] border-[#3900DC]" : "border-gray-300"}`}>
                    {user?.isPhoneVerified && <div className="w-2 h-2 bg-white rounded-full"></div>}
                  </div>
                  <span>Verify your phone number</span>
                </li>

                {/* Payments Setup - Checking if bankAccounts array has items */}
                <li className="flex items-center space-x-2">
                  <div className={`h-4 w-4 rounded-full border flex items-center justify-center ${user?.bankAccounts && user.bankAccounts.length > 0 ? "bg-[#3900DC] border-[#3900DC]" : "border-gray-300"}`}>
                    {user?.bankAccounts && user.bankAccounts.length > 0 && <div className="w-2 h-2 bg-white rounded-full"></div>}
                  </div>
                  <span>Set up payments</span>
                </li>

                {/* Post Job - Manual/Placeholder for now */}
                <li className="flex items-center space-x-2">
                  <div className="h-4 w-4 rounded-full border border-gray-300"></div>
                  <span>Complete your first job</span>
                </li>

                {/* KYC Verification - Checking for 'verified' status */}
                <li className="flex items-center space-x-2">
                  <div className={`h-4 w-4 rounded-full border flex items-center justify-center ${user?.kycVerificationStatus === "verified" ? "bg-[#3900DC] border-[#3900DC]" : "border-gray-300"}`}>
                    {user?.kycVerificationStatus === "verified" && <div className="w-2 h-2 bg-white rounded-full"></div>}
                  </div>
                  <span>KYC verification</span>
                </li>

                {/* Profile Picture */}
                <li className="flex items-center space-x-2">
                  <div className={`h-4 w-4 rounded-full border flex items-center justify-center ${user?.profilePic ? "bg-[#3900DC] border-[#3900DC]" : "border-gray-300"}`}>
                    {user?.profilePic  && <div className="w-2 h-2 bg-white rounded-full"></div>}
                  </div>
                  <span>Added profile picture</span>
                </li>
              </ul>
            </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;