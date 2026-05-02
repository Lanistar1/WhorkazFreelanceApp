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
  const profileStats = userData?.data?.profileStats;


  useEffect(() => {
    if (user?.kycVerificationStatus) {
      // Save specifically for use on other pages
      localStorage.setItem("userKycStatus", user.kycVerificationStatus);
      console.log("my KYC status", user.kycVerificationStatus)
    }
  }, [user]); 
  // Default fallback
   const fullName = user?.workman
    ? `${user.firstName || user.firstName || ""} ${user.lastName ||user.lastName || ""}`.trim() || "User"
    : user?.client?.companyName || "User";

  const profilePhoto = user?.workman?.photo || "/assets/images/person3.png";
  const phoneVerified = user?.isPhoneVerified;
  const emailVerified = user?.isEmailVerified;

  // Profile completion percentage (example logic)
  const completionItems = [
    !!(user?.profilePic || user?.client?.photo), // profile picture
    !!user?.isPhoneVerified,                    // phone verified
    (user?.bankAccounts?.length ?? 0) > 0,      // payments setup
    user?.kycVerificationStatus === "verified", // kyc verified
    profileStats?.completeFirstJob == true   // posted first job
  ];

  const completedCount = completionItems.filter(Boolean).length;
  const completionPercent = completedCount * 20; // 5 items = 20% each

  const safePercent = Math.min(completionPercent, 100);

  

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
        <Header title={`Welcome, ${fullName.split(" ")[0]}`} />

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
              {/* <Link href="/dashboard/verify-kyc">
                <button className="bg-white dark:bg-white text-gray-900 dark:text-gray-900 px-4 py-2 rounded-full font-medium border border-gray-300 dark:border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-100 transition-colors cursor-pointer">Verify KYC</button>
              </Link> */}
              {user?.kycVerificationStatus !== "verified" && (
                <Link href="/dashboard/verify-kyc">
                  <button className="bg-white dark:bg-white text-gray-900 dark:text-gray-900 px-4 py-2 rounded-full font-medium border border-gray-300 dark:border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-100 transition-colors cursor-pointer">Verify KYC</button>
                </Link>
              )}
              {user?.isPhoneVerified === false && (
                <Link href="">
                  <button className="bg-white dark:bg-white text-gray-900 dark:text-gray-900 px-4 py-2 rounded-full font-medium border border-gray-300 dark:border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-100 transition-colors cursor-pointer">
                    Verify Phone Number
                  </button>
                </Link>
              )}
            </div>
          </div>

          {/* Search and Profile Section */}
          <div className="flex flex-col-reverse lg:flex-row lg:space-x-6 mb-8">
            {/* Search and Categories */}
            <div className="flex-1 mt-6 lg:mt-0 mb-10 md:mb-0">
              {/* Dashboard Overview */}
               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                {/* Jobs Applied */}
                <div className="bg-white rounded-[14px] border border-gray-200 p-5 shadow-sm">
                  <p className="text-md text-gray-500 text-center font-semibold text-gray-600">Jobs Applied for</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2 text-center">{profileStats?.totalJobAppliedFor}</p>
                  
                  <p className="text-sm  mt-1 text-center">This is the number of jobs you have posted.</p>
                </div>

                {/* Active Jobs */}
                <div className="bg-white rounded-[14px] border border-gray-200 p-5 shadow-sm">
                  <p className="text-md font-semibold text-gray-600 text-center">Active Jobs</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2 text-center">{profileStats?.activeJob}</p>
                  <p className="text-sm text-gray-500 mt-1 text-center">Your ongoing jobs</p>
                </div>

                {/* Earnings */}
                <div className="bg-white rounded-[14px] border border-gray-200 p-5 shadow-sm">
                  <p className="text-md font-semibold text-gray-600 text-center">Total Earnings</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2 text-center">₦{profileStats?.totalEarning}</p>
                  <p className="text-sm text-gray-500 mt-1 text-center">Your earnings will show here</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mt-8 bg-white rounded-[14px] border border-gray-200 p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900">Quick Actions</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Manage your account and profile faster.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <Link href="/settings">
                    <button className="w-full cursor-pointer flex items-center justify-between px-5 py-4 rounded-[12px] border border-gray-200 hover:border-[#3900DC] hover:bg-[#F5F2FF] transition">
                      <div>
                        <p className="font-semibold text-gray-900 text-start">Update Profile</p>
                        <p className="text-sm text-gray-500">Add skills, bio and experience</p>
                      </div>
                      <span className="text-[#3900DC] font-bold text-lg">→</span>
                    </button>
                  </Link>

                   <Link href="/plans">
                    <button className="w-full cursor-pointer flex items-center justify-between px-5 py-4 rounded-[12px] border border-gray-200 hover:border-[#3900DC] hover:bg-[#F5F2FF] transition">
                      <div>
                        <p className="font-semibold text-gray-900 text-start">Subscription</p>
                        <p className="text-sm text-gray-500">Unlock full access to the system</p>
                      </div>
                      <span className="text-[#3900DC] font-bold text-lg">→</span>
                    </button>
                  </Link>

                  <Link href="/courses">
                    <button className="w-full cursor-pointer flex items-center justify-between px-5 py-4 rounded-[12px] border border-gray-200 hover:border-[#3900DC] hover:bg-[#F5F2FF] transition">
                      <div>
                        <p className="font-semibold text-gray-900 text-start">Apprenticeship</p>
                        <p className="text-sm text-gray-500">Upgrade your skills by enrolling in a course</p>
                      </div>
                      <span className="text-[#3900DC] font-bold text-lg">→</span>
                    </button>
                  </Link>

                  <Link href="/explore">
                    <button className="w-full flex items-center cursor-pointer justify-between px-5 py-4 rounded-[12px] border border-gray-200 hover:border-[#3900DC] hover:bg-[#F5F2FF] transition">
                      <div>
                        <p className="font-semibold text-gray-900 text-start">Explore Jobs</p>
                        <p className="text-sm text-gray-500">Find work matching your skills</p>
                      </div>
                      <span className="text-[#3900DC] font-bold text-lg">→</span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Profile Completion */}
            <div className="lg:w-100 lg:h-[480px] mt-4 lg:mt-0 bg-white dark:bg-white rounded-[12px] p-6 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <Image
                  src={user?.profilePic || user?.workman?.photo || ""}
                  alt="Whorkaz Logo"
                  width={48}
                  height={48}
                  className="rounded-full h-20 w-20 object-cover border-2 border-white shadow-md"
                />
                <div>
                  {/* <p className="font-medium">Jason Alexander</p> */}
                  <p className="font-medium">{fullName}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">Workaz Workman</p>
                </div>
              </div>
              <p className="font-medium mb-2">Complete your profile</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2 mt-4">
              <div
                className="bg-[#3900DC] h-2 rounded-full transition-all duration-500"
                style={{ width: `${completionPercent}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">{Math.round(completionPercent)}% complete</p>
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
                  <div className={`h-4 w-4 rounded-full border flex items-center justify-center ${profileStats?.completeFirstJob == true  ? "bg-[#3900DC] border-[#3900DC]" : "border-gray-300"}`}>
                    {profileStats?.completeFirstJob == true && <div className="w-2 h-2 bg-white rounded-full"></div>}
                  </div>
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