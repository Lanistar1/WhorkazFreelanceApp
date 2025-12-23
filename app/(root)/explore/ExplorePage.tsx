'use client';

import React, { useState } from "react";
import { MoreHorizontal, Heart } from "lucide-react";
import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";
import { useServices } from "@/app/actions/reactQuery";
import { useJobs } from "@/app/actions/reactQuery";
import type { Service } from "@/app/actions/type";
import { format } from "date-fns";

const ExplorePage = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  // Fetch services
  const { data: services = [], isLoading: isLoadingServices } = useServices();

  // Fetch jobs (filtered by selected service)
  const { data: jobsData, isLoading: isLoadingJobs } = useJobs(
    selectedService ? { customServiceName: selectedService.name } : {}
  );

  const jobs = jobsData?.jobs || [];
  const totalCount = jobsData?.count || 0;

  const handleServiceClick = (service: Service) => {
    setSelectedService(selectedService?.id === service.id ? null : service);
  };

  return (
    <div className="min-h-screen w-full bg-white text-gray-900">
      <Header title="Explore" />

      <main className="px-6 py-4">
        {/* Search Bar */}
        <div className="relative mb-6">
          <Image
            src="/assets/icons/searchIcon.png"
            alt="Search"
            width={18}
            height={18}
            className="absolute left-3 top-1/2 transform -translate-y-1/2"
          />
          <input
            type="text"
            placeholder="What do you need help with"
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-[12px] text-[16px] text-[#4B4B56] focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <select className="absolute right-0 top-0 h-full px-4 bg-transparent text-[14px] text-[#4B4B56] appearance-none focus:outline-none">
            <option>Find Work</option>
          </select>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* Categories */}
        <div className="flex space-x-3 mb-8 overflow-x-auto pb-2 no-scrollbar">
          {isLoadingServices ? (
            Array(7)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-[110px] h-[94px] bg-gray-200 rounded-[12px] animate-pulse"
                />
              ))
          ) : services.length === 0 ? (
            <div className="w-full text-center py-8 text-[#95959F]">
              <p className="text-lg font-medium">No services available</p>
              <p className="text-sm mt-1">Check back later!</p>
            </div>
          ) : (
            services.map((service) => (
              <button
                key={service.id}
                onClick={() => handleServiceClick(service)}
                className={`flex-shrink-0 w-[110px] flex flex-col items-center px-4 py-2 rounded-[12px] text-[14px] font-medium transition-all ${
                  selectedService?.id === service.id
                    ? "bg-[#3900DC] text-white border-2 border-[#3900DC]"
                    : "bg-white border border-gray-300 text-[#4B4B56] hover:bg-gray-100"
                }`}
              >
                <div className="w-8 h-8 mb-2 bg-gray-200 rounded-lg" />
                <span className="text-center text-xs">{service.name}</span>
              </button>
            ))
          )}
        </div>

        {/* Top Jobs */}
        <div className="flex items-center justify-between mb-4 border p-3 rounded-[5px] border-[#cccccc]">
          <h2 className="text-[20px] font-semibold text-[#32323E]">
            {selectedService 
              ? `${selectedService.name} Jobs (${totalCount})`
              : `Top jobs for you (${totalCount})`}
          </h2>
          <div className="flex items-center space-x-2 text-[14px] text-[#95959F]">
            <span>sorted by:</span>
            <select className="bg-transparent border border-gray-300 rounded-full px-2 py-1 text-[#4B4B56]">
              <option>Latest</option>
            </select>
          </div>
        </div>

        {/* Jobs List */}
        <div className="space-y-6 mb-20">
          {isLoadingJobs ? (
            Array(2)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="bg-white border rounded-[12px] p-4 shadow-sm animate-pulse">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gray-300 rounded-full" />
                    <div className="flex-1 space-y-3">
                      <div className="h-5 bg-gray-300 rounded w-2/3" />
                      <div className="h-4 bg-gray-200 rounded w-1/2" />
                      <div className="h-3 bg-gray-200 rounded w-full" />
                      <div className="h-3 bg-gray-200 rounded w-3/4" />
                    </div>
                  </div>
                </div>
              ))
          ) : jobs.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300">
              <div className="w-28 h-28 mx-auto mb-6 bg-gray-200 border-4 border-dashed rounded-xl" />
              <p className="text-xl font-semibold text-[#4B4B56]">No jobs found</p>
              <p className="text-[#95959F] mt-3 max-w-md mx-auto">
                {selectedService
                  ? `No jobs in ${selectedService.name.toLowerCase()} right now. Try another category.`
                  : "Post your first job or browse services above."}
              </p>
            </div>
          ) : (
            jobs.map((job) => (
              <Link href={`/explore/${job.id}`} key={job.id}>
                <div className="bg-white border border-[#DBDBE3] mb-3 rounded-[12px] p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[14px] font-medium text-[#95959F]">
                          Posted {format(new Date(job.createdAt), "d 'ago'")}
                        </span>
                        <div className="flex items-center space-x-2">
                          <Heart className="h-5 w-5 text-gray-400 cursor-pointer" />
                          <MoreHorizontal className="h-5 w-5 text-gray-500 cursor-pointer" />
                        </div>
                      </div>
                      <h3 className="text-[18px] font-semibold text-[#32323E] mb-3">{job.milestones[0].workTitle}</h3>

                      {/* User Info */}
                      <div className="flex items-center space-x-3 mb-3">
                        <Image
                          src={job.client.profilePic || "/assets/images/person3.png"}
                          alt={job.client.email}
                          width={48}
                          height={48}
                          className="rounded-full object-cover"
                        />
                        <div>
                          <div className="text-[16px] font-semibold text-[#4B4B56]">
                            {job.client.email.split("@")[0]}  {/* Use email prefix as name placeholder */}
                          </div>
                          <div className="text-[14px] text-[#95959F]">
                            {job.applications.length} applications • {job.milestones[0].location}
                          </div>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {job.milestones[0].skills.slice(0, 3).map((skill, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-[12px] font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                        {job.milestones[0].skills.length > 3 && (
                          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-[12px] font-medium">
                            +{job.milestones[0].skills.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-[14px] text-[#4B4B56] leading-relaxed line-clamp-3">
                        {job.milestones[0].description}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default ExplorePage;