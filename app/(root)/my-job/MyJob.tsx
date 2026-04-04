'use client'
import React, { useMemo } from "react";
import Header from "@/components/Header";
import Table from "@/components/Table";
import { useMyApplication } from "@/app/actions/reactQuery"; 
import { JobApplication } from "@/app/actions/type";

// This MUST match your Table's Job interface exactly
interface TableJob {
  posted: string;
  title: string;
  status: "In progress" | "Open" | "Completed";
  applicants: number;
  clients: string;
  hires: number; // Required by your Table component
  budget: number | string;
  dueDate: string;
  id: string;
}

const transformToTableData = (apps: JobApplication[]): TableJob[] => {
  
  return apps.map((app) => {
    
    const job = app.job;
    const client = job?.client;

    console.log("CLIENT OBJECT:", client);
    
    // 1. Status Mapping
    let tableStatus: TableJob['status'] = "Open";
    if (job?.status === "in_progress") tableStatus = "In progress";
    if (job?.status === "completed") tableStatus = "Completed";

    // 2. Title Logic (Using the fallback you liked)
    const displayTitle = job?.title || `Project for ${client?.firstName || "Client"}`;

    // 3. Client Name Logic
    // IMPORTANT: This must be named "clients" to match your Table.tsx: {job.clients}
    const clientFullName =
      `${client?.firstName || ""} ${(client as any)?.lastName || (client as any)?.lastname || ""}`
        .trim() || "Unknown Client";
    // 4. Budget Logic
    const budgetValue = job?.budget ? parseFloat(job.budget) : "N/A";

    // 5. Date Logic
    const rawDate = job?.createdAt || app.createdAt;
    const formattedDate = rawDate 
      ? new Date(rawDate).toLocaleDateString('en-GB') 
      : "N/A";

    return {
      id: job?.id || app.jobId,
      posted: new Date(app.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      title: displayTitle,
      status: tableStatus,
      applicants: 0, 
      clients: clientFullName, // Match the 's' in {job.clients}
      hires: app.isHired ? 1 : 0,
      budget: budgetValue, 
      dueDate: formattedDate,
    };
  });
};

const MyJobPage = () => {
  const { data: applications, isLoading, isError, error } = useMyApplication();

  const jobsForTable = useMemo(() => {
    return applications ? transformToTableData(applications) : [];
  }, [applications]);

  if (isLoading) return <div className="p-10 text-center font-medium">Loading jobs...</div>;
  if (isError) return <div className="p-10 text-center text-red-500">Error: {error.message}</div>;

  console.log("JOBS FOR TABLE:", jobsForTable);
  return (
    <div className="min-h-screen bg-white">
      <Header title="My Job" />
      <main className="px-6 py-4">
        {/* Filters Placeholder */}
        <div className="flex items-center space-x-4 mb-8">
          <button className="px-4 py-2 border rounded-full text-sm font-medium text-[#4B4B56]">Status</button>
          <div className="text-sm font-medium text-[#4B4B56]">Sort: Relevance</div>
        </div>

        {/* Table Component */}
        {jobsForTable.length > 0 ? (
          <Table jobs={jobsForTable} />
        ) : (
          <div className="text-center py-20 border rounded-xl bg-gray-50 text-gray-500">
            No applications found.
          </div>
        )}
      </main>
    </div>
  );
};

export default MyJobPage;