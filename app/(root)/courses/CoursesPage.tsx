'use client'
import React, { useState } from "react";
import Header from "@/components/Header";
import Image from "next/image";

interface Course {
  id: string;
  title: string;
  skillLevel: string;
  duration: string;
  price: string;
  image: string;
}

const CoursesPage = () => {
  const popularCourses: Course[] = [
    {
      id: "1",
      title: "Electrical Wiring Safety & Best Practices",
      skillLevel: "Beginner",
      duration: "45mins",
      price: "₦25,000",
      image: "/assets/images/electrician.png",
    },
    {
      id: "2",
      title: "Electrical Wiring Safety & Best Practices",
      skillLevel: "Beginner",
      duration: "45mins",
      price: "₦25,000",
      image: "/assets/images/electrician.png",
    },
    {
      id: "3",
      title: "Electrical Wiring Safety & Best Practices",
      skillLevel: "Beginner",
      duration: "45mins",
      price: "₦25,000",
      image: "/assets/images/electrician.png",
    },
  ];

  const recommendedCourses: Course[] = [
    {
      id: "4",
      title: "Electrical Wiring Safety & Best Practices",
      skillLevel: "Beginner",
      duration: "45mins",
      price: "₦25,000",
      image: "/assets/images/electrician.png",
    },
    {
      id: "5",
      title: "Electrical Wiring Safety & Best Practices",
      skillLevel: "Beginner",
      duration: "45mins",
      price: "₦25,000",
      image: "/assets/images/electrician.png",
    },
    {
      id: "6",
      title: "Electrical Wiring Safety & Best Practices",
      skillLevel: "Beginner",
      duration: "45mins",
      price: "₦25,000",
      image: "/assets/images/electrician.png",
    },
  ];

  const [activeTab, setActiveTab] = useState("Marketplace");

  const renderContent = () => {
    switch (activeTab) {
      case "Marketplace":
        return (
          <>
            {/* Popular Courses */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-[20px] font-semibold text-[#32323E]">Popular Courses</h2>
                <div className="relative">
                  <select
                    className="appearance-none px-4 py-2 bg-white dark:bg-white border border-gray-300 dark:border-gray-300 rounded-[12px] text-[14px] font-medium text-[#4B4B56] dark:text-[#4B4B56] hover:bg-gray-100 dark:hover:bg-gray-100 transition-colors pr-8"
                  >
                    <option value="all">All</option>
                    <option value="electrical">Electrical</option>
                    <option value="plumbing">Plumbing</option>
                  </select>
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {popularCourses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-white dark:bg-white border border-[#DBDBE3] rounded-[12px] overflow-hidden shadow-sm"
                  >
                    <Image
                      src={course.image}
                      alt={course.title}
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-[16px] font-semibold text-[#32323E] mb-2">
                        {course.title}
                      </h3>
                      <div className="flex justify-between items-center space-x-2 text-[14px] text-[#95959F] mb-2">
                        <span>Skill Level: {course.skillLevel}</span>
                        <span>{course.duration}</span>
                      </div>
                      <p className="text-[16px] font-semibold text-[#32323E]">
                        {course.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Courses */}
            <div>
              <h2 className="text-[20px] font-semibold text-[#32323E] mb-4">
                Recommended Courses
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {recommendedCourses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-white dark:bg-white border border-[#DBDBE3] rounded-[12px] overflow-hidden shadow-sm"
                  >
                    <Image
                      src={course.image}
                      alt={course.title}
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-[16px] font-semibold text-[#32323E] mb-2">
                        {course.title}
                      </h3>
                      <div className="flex justify-between items-center space-x-2 text-[14px] text-[#95959F] mb-2">
                        <span>Skill Level: {course.skillLevel}</span>
                        <span>{course.duration}</span>
                      </div>
                      <p className="text-[16px] font-semibold text-[#32323E]">
                        {course.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        );
      case "Paid courses":
      case "Posted Courses":
        return (
          <div className="text-center py-12">
            <h3 className="text-[18px] font-semibold text-[#32323E]">Nothing to show here</h3>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full bg-white dark:bg-white text-gray-900 dark:text-gray-900">
      {/* Header */}
      <Header title="Courses" />

      {/* Main Content */}
      <main className="px-6 py-4">
        {/* Grow Your Career Section */}
        <div className="flex flex-row sm:flex-row items-start sm:items-center justify-between mb-8 space-y-4 sm:space-y-0">
          <h1 className="text-[20px] md:text-[24px] font-semibold text-[#32323E]">
            Grow Your Career.
          </h1>
          <button className="px-4 md:px-6 py-3 bg-[#3900DC] text-white rounded-full text-[12px] md:text-[16px] font-medium hover:bg-purple-700 transition-colors">
            + Create new course
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-6 mb-8 border-b border-[#DBDBE3] pb-2 overflow-x-auto">
          <button
            className={`text-[16px] font-medium whitespace-nowrap cursor-pointer ${activeTab === "Marketplace" ? "text-[#32323E] border-b-2 border-[#3900DC]" : "text-[#4B4B56] hover:text-[#32323E]"}`}
            onClick={() => setActiveTab("Marketplace")}
          >
            Marketplace
          </button>
          <button
            className={`text-[16px] font-medium whitespace-nowrap cursor-pointer ${activeTab === "Paid courses" ? "text-[#32323E] border-b-2 border-[#3900DC]" : "text-[#4B4B56] hover:text-[#32323E]"}`}
            onClick={() => setActiveTab("Paid courses")}
          >
            Paid courses
          </button>
          <button
            className={`text-[16px] font-medium whitespace-nowrap cursor-pointer ${activeTab === "Posted Courses" ? "text-[#32323E] border-b-2 border-[#3900DC]" : "text-[#4B4B56] hover:text-[#32323E]"}`}
            onClick={() => setActiveTab("Posted Courses")}
          >
            Posted Courses
          </button>
        </div>

        {/* Search Bar */}
        {/* Search Bar */}
        <div className="relative mb-8">
        <Image
            src="/assets/icons/searchIcon.png" // Replace with actual search icon path
            alt="Search"
            width={18}
            height={18}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 object-contain"
        />
        <input
            type="text"
            placeholder="What do you want to learn?"
            className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-300 rounded-[12px] text-[16px] font-medium text-[#4B4B56] dark:text-[#4B4B56] focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <div className="absolute right-30 top-1/2 transform -translate-y-1/2 h-6 border-l border-[#3900DC]"></div>
        <div className="absolute right-0 top-0 h-full w-[100px] flex items-center pr-3">
            <select
            className="appearance-none w-full py-2 bg-transparent text-[14px] font-medium text-[#4B4B56] dark:text-[#4B4B56] hover:bg-gray-100 dark:hover:bg-gray-100 transition-colors"
            >
            <option value="electrical">Electrical</option>
            <option value="plumbing">Plumbing</option>
            <option value="carpentry">Carpentry</option>
            </select>
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
                />
            </svg>
            </span>
        </div>
        </div>

        {renderContent()}
      </main>
    </div>
  );
};

export default CoursesPage;