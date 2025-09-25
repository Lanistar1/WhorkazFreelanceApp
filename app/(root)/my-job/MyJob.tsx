'use client'
import React from "react";
import { MoreHorizontal } from "lucide-react";
import Header from "@/components/Header";
import Image from "next/image";
import Table from "@/components/Table";

interface Job {
  posted: string;
  title: string;
  status: 'In progress' | 'Open' | 'Completed';
  applicants: number;
  clients: string;
  hires: number;
  budget: number;
  dueDate: string
}

const MyJob = () => {
  const jobs: Job[] = [
    {
      posted: 'Posted: May 25, 2025',
      title: 'Paint 3-bedroom flat interior',
      status: 'In progress',
      applicants: 6,
      hires: 1,
      clients: "Jide Kosoko",
      budget: 40000,
      dueDate : "31/05/2025"
    },
    {
      posted: 'Posted: May 25, 2025',
      title: 'Install 4 Ceiling Fans in My 3-Bedroom Apartment',
      status: 'Open',
      applicants: 6,
      hires: 0,
      clients: "Jide Kosoko",
      budget: 40000,
      dueDate : "31/05/2025"
    },
    {
      posted: 'Posted: May 25, 2025',
      title: 'Paint 3-bedroom flat interior',
      status: 'Completed',
      applicants: 6,
      hires: 2,
      clients: "Jide Kosoko",
      budget: 40000,
      dueDate : "31/05/2025"
    },
  ];

  return (
    <div className="min-h-screen w-full bg-white dark:bg-white text-gray-900 dark:text-gray-900">
      {/* Header */}
      <Header title="My Job" />

      {/* Main Content */}
      <main className="px-6 py-4">
        {/* Filters */}
        <div className="flex items-center space-x-4 mb-8">
          <button className="flex items-center justify-between px-4 py-2 bg-white dark:bg-white border border-gray-300 dark:border-gray-300 rounded-full text-[16px] font-medium text-[#4B4B56] dark:text-[#4B4B56] hover:bg-gray-100 dark:hover:bg-gray-100 transition-colors">
            Status
          </button>
          <button className="flex items-center justify-between px-4 py-2 bg-white dark:bg-white border border-gray-300 dark:border-gray-300 rounded-full text-[16px] font-medium text-[#4B4B56] dark:text-[#4B4B56] hover:bg-gray-100 dark:hover:bg-gray-100 transition-colors">
            <Image
                src="/assets/icons/filterIcon.png"
                alt="Filter"
                width={18}
                height={18}
                className="object-contain mr-2"
            />
            All filters
          </button>
          <div className="text-[16px] font-medium text-[#4B4B56] dark:text-[#4B4B56]">Sort: Relevance</div>
        </div>

        {/* Jobs Table */}
        <Table jobs={jobs} />
      </main>
    </div>
  );
};

export default MyJob;