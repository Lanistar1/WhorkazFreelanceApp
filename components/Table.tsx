
import React from "react";
import { MoreHorizontal } from "lucide-react";

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

const getStatusClass = (status: Job['status']) => {
  switch (status) {
    case 'In progress':
      return 'bg-orange-100 dark:bg-orange-100 text-orange-800 dark:text-orange-800';
    case 'Open':
      return 'bg-purple-100 dark:bg-purple-100 text-purple-800 dark:text-purple-800';
    case 'Completed':
      return 'bg-green-100 dark:bg-green-100 text-green-800 dark:text-green-800';
    default:
      return '';
  }
};

const Table: React.FC<{ jobs: Job[] }> = ({ jobs }) => {
  return (
    <div className="overflow-x-auto border border-[#C7C7CF] p-4 rounded-[12px] mb-20 md:mb-0 shadow-sm">
      <table className="w-full bg-white dark:bg-white shadow-none">
        <thead className="hidden sm:table-header-group">
          <tr className="text-left text-gray-500 dark:text-gray-500 text-sm">
            <th className="p-4 text-[16px] font-semibold text-[#95959F]">Job title</th>
            <th className="p-4 text-[16px] font-semibold text-[#95959F]">Status Badge</th>
            <th className="p-4 text-[16px] font-semibold text-[#95959F]">Client name</th>
            <th className="p-4 text-[16px] font-semibold text-[#95959F]">Budget</th>
            <th className="p-4 text-[16px] font-semibold text-[#95959F]">Date due</th>
            <th className="p-4 text-[16px] font-semibold text-[#95959F]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job, index) => (
            <tr
              key={index}
              className="border-t border-gray-200 dark:border-gray-200 flex flex-col sm:table-row mb-4 sm:mb-0"
            >
              <td className="p-4 w-full sm:w-auto">
                <p className="text-[14px] font-semibold text-[#C7C7CF] dark:text-[#C7C7CF]">{job.posted}</p>
                <p className="text-[16px] font-semibold text-[#4B4B56]">{job.title}</p>
              </td>
              <td className="p-4 w-full sm:w-auto">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(job.status)}`}
                >
                  {job.status}
                </span>
              </td>
              <td className="p-4 w-full sm:w-auto">
                <span className="sm:hidden font-medium text-[#4B4B56]">Client Name: </span>{job.clients}
              </td>
              <td className="p-4 w-full sm:w-auto">
                <span className="sm:hidden font-medium text-[#4B4B56]">Budget: </span>{job.budget}
              </td>
              <td className="p-4 w-full sm:w-auto">
                <span className="sm:hidden font-medium text-[#4B4B56]">Due date: </span>{job.dueDate}
              </td>
              <td className="p-4 w-full sm:w-auto">
                <MoreHorizontal className="h-5 w-5 text-gray-500 dark:text-gray-500 cursor-pointer" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;