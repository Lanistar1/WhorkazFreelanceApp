'use client'
import React from "react";
import { MoreHorizontal, Heart } from "lucide-react"; // Removed MessageCircle as not used in the image
import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";

interface Job {
  id: string;
  title: string;
  posted: string;
  user: {
    name: string;
    avatar: string;
    jobs: number;
    location: string;
  };
  tags: string[];
  description: string;
}

const ExplorePage = () => {
  const jobs: Job[] = [
    {
      id: "1",
      title: "Bathroom Renovation for 2-Bedroom Apartment",
      posted: "3 ago",
      user: {
        name: "Linda O",
        avatar: "/assets/images/person3.png",
        jobs: 3,
        location: "Lekki Phase Lagos",
      },
      tags: ["Plumber", "Tiler", "Interior Finisher"],
      description: "We're looking for an experienced plumber and tiler to help renovate two bathrooms. Tasks include removing old fixtures, installing new piping for floor and walls, tiling the new shower, WC, and sink. Must be available to start this weekend and complete within 7 days.",
    },
    {
      id: "2",
      title: "Bathroom Renovation for 2-Bedroom Apartment",
      posted: "3 ago",
      user: {
        name: "Linda O",
        avatar: "/assets/images/person3.png",
        jobs: 3,
        location: "Lekki Phase Lagos",
      },
      tags: ["Plumber", "Tiler", "Interior Finisher"],
      description: "We're looking for an experienced plumber and tiler to help renovate two bathrooms. Tasks include removing old fixtures, installing new piping for floor and walls, tiling the new shower, WC, and sink. Must be available to start this weekend and complete within 7 days.",
    },
  ];

  const categories = [
    { name: "Carpentry", icon: "/assets/icons/carpentry.png" },
    { name: "Electrical", icon: "/assets/icons/electric.png" },
    { name: "Auto", icon: "/assets/icons/auto.png" },
    { name: "Repairs", icon: "/assets/icons/repair.png" },
    { name: "Dispatch", icon: "/assets/icons/dispatch.png" },
    { name: "Cleaning", icon: "/assets/icons/cleaning.png" },
    { name: "Cleaning", icon: "/assets/icons/cleaning2.png" },
  ];

  return (
    <div className="min-h-screen w-full bg-white dark:bg-white text-gray-900 dark:text-gray-900">
      {/* Header */}
      <Header title="Explore" />

      {/* Main Content */}
      <main className="px-6 py-4">
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
            placeholder="What do you need help with?"
            className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-300 rounded-[12px] text-[16px] font-medium text-[#4B4B56] dark:text-[#4B4B56] focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <div className="absolute right-30 top-1/2 transform -translate-y-1/2 h-6 border-l border-[#3900DC]"></div>
          <div className="absolute right-0 top-0 h-full w-[100px] flex items-center pr-3">
            <select
              className="appearance-none w-full py-2 bg-transparent text-[14px] font-medium text-[#4B4B56] dark:text-[#4B4B56] hover:bg-gray-100 dark:hover:bg-gray-100 transition-colors"
            >
              <option value="electrical">Find Work</option>
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

        {/* Categories */}
        <div className="flex space-x-3 mb-8 overflow-x-auto pb-2">
          {categories.map((category, index) => (
            <button
              key={index}
              className="flex flex-col justify-center items-center w-[128px] h-[94px] space-x-2 px-4 py-2 bg-white dark:bg-white border border-gray-300 dark:border-gray-300 rounded-[12px] text-[14px] font-medium text-[#4B4B56] dark:text-[#4B4B56] hover:bg-gray-100 dark:hover:bg-gray-100 transition-colors whitespace-nowrap"
            >
             <Image src={category.icon} alt={category.name} className="w-8 h-8 mb-2" width={26} height={26} />
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {/* Top Jobs Section */}
        <div className="flex items-center justify-between mb-6 border border-[#cccccc] p-4 rounded-[8px]">
          <h2 className="text-[20px] font-semibold text-[#32323E]">Top jobs for you</h2>
          <div className="flex items-center space-x-2">
            <span className="text-[14px] text-[#95959F]">sorted by:</span>
            <button className="px-3 py-1 border border-gray-300 dark:border-gray-300 rounded-full text-[14px] font-medium text-[#4B4B56] dark:text-[#4B4B56] hover:bg-gray-100 dark:hover:bg-gray-100 transition-colors">
              Latest
            </button>
          </div>
        </div>

        {/* Jobs List */}
        <div className="space-y-6 mb-20">
          {jobs.map((job) => (
            <Link href={`/explore/${job.id}`} key={job.id}>
              <div className="bg-white dark:bg-white border border-[#DBDBE3] rounded-[12px] p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow mb-6">
                <div className="flex items-start space-x-4">
                  {/* Job Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[14px] font-medium text-[#95959F]">{job.posted}</span>
                      <div className="flex items-center space-x-2">
                        <Heart className="h-5 w-5 text-gray-400 cursor-pointer" />
                        <MoreHorizontal className="h-5 w-5 text-gray-500 dark:text-gray-500 cursor-pointer" />
                      </div>
                    </div>
                    <h3 className="text-[18px] font-semibold text-[#32323E] mb-3">{job.title}</h3>

                    {/* User Info */}
                    <div className="flex items-center space-x-3 mb-3">
                      <Image
                        src={job.user.avatar}
                        alt={job.user.name}
                        width={48}
                        height={48}
                        className="rounded-full object-cover"
                      />
                      <div>
                        <div className="text-[16px] font-semibold text-[#4B4B56]">{job.user.name}</div>
                        <div className="text-[14px] text-[#95959F]">{job.user.jobs} jobs • {job.user.location}</div>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-purple-100 dark:bg-purple-100 text-purple-700 dark:text-purple-700 rounded-full text-[12px] font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Description */}
                    <p className="text-[14px] text-[#4B4B56] leading-relaxed">{job.description}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ExplorePage;