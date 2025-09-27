'use client'
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Image from "next/image";

interface JobDetail {
  id: string;
  title: string;
  overviewTabs: string[];
  postedBy: {
    name: string;
    avatar: string;
    postedDate: string;
    timeAgo: string;
  };
  description: string;
  additionalRequests: string;
  images: string[];
  details: {
    status: string;
    location: string;
    budget: string;
    timeline: {
      start: string;
      end: string;
    };
    clientBadge: string[];
    category: string;
  };
}

const MyJobDetail = ({ id }: { id: string }) => {
  // Sample data (replace with API call in a real app)
  const jobData: JobDetail[] = [
    {
      id: "1",
      title: "Bathroom Renovation for 2-Bedroom Apartment",
      overviewTabs: ["Overview", "Applicants (2)", "Shortlisted (2)", "Messaged (2)", "Hires (2)", "Not a fit (2)"],
      postedBy: {
        name: "Linda O.",
        avatar: "/assets/images/person3.png",
        postedDate: "Posted 24th of May 2025",
        timeAgo: "1hr ago",
      },
      description: "We're looking for an experienced plumber and tiler to help renovate two bathrooms. Tasks include removing old fixtures, installing new piping for floor and walls, and fixing the new shower, WC, and vanity sink. Must be available to start this weekend and complete within 7 days.",
      additionalRequests: "Please include how long you think the job will take and if you've worked on Binatec fans before.",
      images: [
        "/assets/images/fanImage.png",
        "/assets/images/fanImage.png",
      ],
      details: {
        status: "Open",
        location: "Lekki Phase 1, Lagos, Nigeria",
        budget: "₦400,000",
        timeline: {
          start: "Start date: 1st of June 2025",
          end: "End date: 7th of June 2025",
        },
        clientBadge: [
          "Workaz Verified Client",
          "3 Jobs Posted",
          "100% Response Rate",
        ],
        category: "Electrical Services Fan Installation",
      },
    },
    {
      id: "2",
      title: "Bathroom Renovation for 2-Bedroom Apartment",
      overviewTabs: ["Overview", "Applicants (2)", "Shortlisted (2)", "Messaged (2)", "Hires (2)", "Not a fit (2)"],
      postedBy: {
        name: "Linda O.",
        avatar: "/assets/images/person3.png",
        postedDate: "Posted 24th of May 2025",
        timeAgo: "1hr ago",
      },
      description: "We're looking for an experienced plumber and tiler to help renovate two bathrooms. Tasks include removing old fixtures, installing new piping for floor and walls, and fixing the new shower, WC, and vanity sink. Must be available to start this weekend and complete within 7 days.",
      additionalRequests: "Please include how long you think the job will take and if you've worked on Binatec fans before.",
      images: [
        "/assets/images/fanImage.png",
        "/assets/images/fanImage.png",
      ],
      details: {
        status: "Open",
        location: "Lekki Phase 1, Lagos, Nigeria",
        budget: "₦400,000",
        timeline: {
          start: "Start date: 1st of June 2025",
          end: "End date: 7th of June 2025",
        },
        clientBadge: [
          "Workaz Verified Client",
          "3 Jobs Posted",
          "100% Response Rate",
        ],
        category: "Electrical Services Fan Installation",
      },
    },
  ];

  const [activeTab, setActiveTab] = useState("Overview");
  const job = jobData.find((j) => j.id === id);

  if (!job) {
    return <div className="text-center py-12">Job not found</div>;
  }

  return (
    <div className="min-h-full w-full bg-white dark:bg-white text-gray-900 dark:text-gray-900">
      {/* Header */}
      <Header title="Job Detail" />

      {/* Main Content */}
      <main className="px-6 py-4">
        <h2 className="text-[#4B4B56] text-[32px] font-medium mb-5">{job.title}</h2>
        {/* Overview Tabs */}
        <div className="flex space-x-4 mb-6 overflow-x-auto">
          {job.overviewTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.split(" (")[0])} // Set active tab without count
              className={`text-[14px] font-medium whitespace-nowrap pb-2 rounded-full px-4 py-2 bg-[#FAFAFA] ${
                activeTab === tab.split(" (")[0]
                  ? "text-[#3900DC] border border-[#3900DC] font-semibold"
                  : "text-[#95959F] hover:text-[#95959F] border border-[#DBDBE3] font-semibold"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-[60%_38%] gap-6">
          {/* Left Side - Overview */}
          <div className="bg-white dark:bg-white border border-[#DBDBE3] rounded-[12px] p-4 ">
            <div className="flex items-center space-x-3 mb-4">
              <Image
                src={job.postedBy.avatar}
                alt={job.postedBy.name}
                width={48}
                height={48}
                className="rounded-full object-cover"
              />
              <div>
                <p className="text-[16px] font-semibold text-[#32323E]">{job.postedBy.name}</p>
                <p className="text-[12px] text-[#95959F]">{job.postedBy.postedDate}</p>
              </div>
              <p className="text-[12px] text-[#95959F] ml-auto">{job.postedBy.timeAgo}</p>
            </div>
            <p className="text-[14px] text-[#4B4B56] mb-4">{job.description}</p>
            <div className="mb-4">
              <p className="text-[14px] font-semibold text-[#3900DC]">① Additional Requests:</p>
              <p className="text-[14px] text-[#4B4B56]">{job.additionalRequests}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {job.images.map((img, index) => (
                <Image
                  key={index}
                  src={img}
                  alt={`Job image ${index + 1}`}
                  width={200}
                  height={200}
                  className="w-full h-auto object-cover rounded-[8px]"
                />
              ))}
            </div>
          </div>

          {/* Right Side - Details */}
          <div className="bg-white dark:bg-white border border-[#DBDBE3] rounded-[12px] p-4 space-y-4">
            <h3 className="text-[18px] font-semibold text-[#32323E]">Details</h3>
            <div className="flex items-center space-x-0">
              <Image src="/assets/icons/watch-status.png" alt="" width={12} height={12} />
              <div className="flex flex-row gap-2 pl-2 items-center">
                <p className="text-[14px] font-medium">Status:</p>
                <p
                className={`text-[14px] font-medium px-4 py-1 rounded-full
                    ${
                    job.details.status === "Open"
                        ? "bg-[#EFFFF3] text-[#34C759] border border-[#34C759]"
                        : job.details.status === "Closed"
                        ? "bg-[#FFEAE9] text-[#FF2929] border border-[#FF2929]"
                        : ""
                    }`}
                >
                 {job.details.status}
                </p>
              </div>

              

            </div>
            <div className="flex items-start space-x-2">
              <Image src="/assets/icons/location.png" alt="" width={12} height={12} className="mt-1"/>
              <div className="">
                <p className="text-[14px] font-medium text-[#4B4B56]">Location</p>
                <p className="text-[14px] font-medium text-[#4B4B56]">{job.details.location}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Image src="/assets/icons/budget.png" alt="" width={12} height={12} />
              <p className="text-[14px] font-medium text-[#4B4B56]">Budget: {job.details.budget}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Image src="/assets/icons/timer.png" alt="" width={12} height={12} />
              <p className="text-[14px] font-medium text-[#4B4B56]">Timeline:</p>
            </div>
            <ul className="list-disc pl-6 space-y-1 text-[14px] text-[#4B4B56]">
              <li>{job.details.timeline.start}</li>
              <li>{job.details.timeline.end}</li>
            </ul>
            <div className="flex items-center space-x-2">
              <Image src="/assets/icons/check-badge.png" alt="" width={12} height={12} />
              <p className="text-[14px] font-medium text-[#4B4B56]">Client Badge:</p>
            </div>
            <ul className="list-disc pl-6 space-y-1 text-[14px] text-[#4B4B56]">
              {job.details.clientBadge.map((badge, index) => (
                <li key={index}>{badge}</li>
              ))}
            </ul>
            <div className="flex items-center space-x-2">
              <Image src="/assets/icons/category.png" alt="" width={12} height={12} />
              <p className="text-[14px] font-medium text-[#4B4B56]">Category:</p>
            </div>
            <p className="text-[14px] text-[#4B4B56]">{job.details.category}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyJobDetail;