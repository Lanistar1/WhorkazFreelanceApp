// import React, { useState, useRef, useEffect } from "react";
// import { MoreHorizontal } from "lucide-react";
// import router from "next/router";

// interface Job {
//   posted: string;
//   title: string;
//   status: "In progress" | "Open" | "Completed";
//   applicants: number;
//   clients: string;
//   hires: number;
//   budget: number;
//   dueDate: string;
//   id: string;
// }

// const getStatusClass = (status: Job["status"]) => {
//   switch (status) {
//     case "In progress":
//       return "bg-orange-100 dark:bg-orange-100 text-orange-800 dark:text-orange-800";
//     case "Open":
//       return "bg-purple-100 dark:bg-purple-100 text-purple-800 dark:text-purple-800";
//     case "Completed":
//       return "bg-green-100 dark:bg-green-100 text-green-800 dark:text-green-800";
//     default:
//       return "";
//   }
// };

// const Table: React.FC<{ jobs: Job[] }> = ({ jobs }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalPosition, setModalPosition] = useState({ top: 0, right: 0 });
//   const [selectedJob, setSelectedJob] = useState<Job | null>(null);
//   const iconRef = useRef<HTMLSpanElement>(null);

//   const handleIconClick = (event: React.MouseEvent, job: Job) => {
//     const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
//     setModalPosition({
//       top: rect.bottom + window.scrollY, // Position below the icon
//       right: rect.left + window.scrollX - 120, // Adjust left to center the modal relative to the icon
//     });
//     setSelectedJob(job);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedJob(null);
//   };

//   // Close modal if clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (iconRef.current && !iconRef.current.contains(event.target as Node)) {
//         setIsModalOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);


//     const handleViewWork = (job: Job) => {
//         console.log("Here Now");
//         router.push(`/myjob/${job.id}`); 
//         closeModal();
//     };

//   return (
//     <div className="overflow-x-auto border border-[#C7C7CF] p-4 rounded-[12px] mb-20 md:mb-0 shadow-sm">
//       <table className="w-full bg-white dark:bg-white shadow-none">
//         <thead className="hidden sm:table-header-group">
//           <tr className="text-left text-gray-500 dark:text-gray-500 text-sm">
//             <th className="p-4 text-[16px] font-semibold text-[#95959F]">Job title</th>
//             <th className="p-4 text-[16px] font-semibold text-[#95959F]">Status Badge</th>
//             <th className="p-4 text-[16px] font-semibold text-[#95959F]">Client name</th>
//             <th className="p-4 text-[16px] font-semibold text-[#95959F]">Budget</th>
//             <th className="p-4 text-[16px] font-semibold text-[#95959F]">Date due</th>
//             <th className="p-4 text-[16px] font-semibold text-[#95959F]">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {jobs.map((job, index) => (
//             <tr
//               key={index}
//               className="border-t border-gray-200 dark:border-gray-200 flex flex-col sm:table-row mb-4 sm:mb-0"
//             >
//               <td className="p-4 w-full sm:w-auto">
//                 <p className="text-[14px] font-semibold text-[#C7C7CF] dark:text-[#C7C7CF]">
//                   {job.posted}
//                 </p>
//                 <p className="text-[16px] font-semibold text-[#4B4B56]">{job.title}</p>
//               </td>
//               <td className="p-4 w-full sm:w-auto">
//                 <span
//                   className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(
//                     job.status
//                   )}`}
//                 >
//                   {job.status}
//                 </span>
//               </td>
//               <td className="p-4 w-full sm:w-auto">
//                 <span className="sm:hidden font-medium text-[#4B4B56]">Client Name: </span>
//                 {job.clients}
//               </td>
//               <td className="p-4 w-full sm:w-auto">
//                 <span className="sm:hidden font-medium text-[#4B4B56]">Budget: </span>
//                 {job.budget}
//               </td>
//               <td className="p-4 w-full sm:w-auto">
//                 <span className="sm:hidden font-medium text-[#4B4B56]">Due date: </span>
//                 {job.dueDate}
//               </td>
//               <td className="p-4 w-full sm:w-auto" ref={iconRef}>
//                 <MoreHorizontal
//                   className="h-5 w-5 text-gray-500 dark:text-gray-500 cursor-pointer"
//                   onClick={(e) => handleIconClick(e, job)}
//                 />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {isModalOpen && selectedJob && (
//         <div
//           className="fixed bg-white dark:bg-white border border-[#DBDBE3] rounded-[8px] shadow-lg p-2 z-50"
//           style={{
//             top: `${modalPosition.top}px`,
//             left: `${modalPosition.right}px`,
//             minWidth: "200px",
//           }}
//         >
//           <ul className="text-[14px] font-medium text-[#4B4B56] dark:text-[#4B4B56]">
//             <li
//               className="px-4 py-2 text-[16px] font-semibold text-[#4B4B56] hover:bg-gray-100 dark:hover:bg-gray-100 rounded-t-[8px] cursor-pointer"
//               onClick={() => handleViewWork(selectedJob)}            >
//               View work
//             </li>
//             <li
//               className="px-4 py-2 hover:bg-gray-100 text-[16px] font-semibold text-[#4B4B56] dark:hover:bg-gray-100 cursor-pointer"
//               onClick={closeModal}
//             >
//               Mark as complete
//             </li>
//             <li
//               className="px-4 py-2 text-[16px] font-semibold text-[#FF2929] hover:bg-gray-100 dark:hover:bg-gray-100 rounded-b-[8px] cursor-pointer"
//               onClick={closeModal}
//             >
//               Decline job
//             </li>
//           </ul>
//           {/* Arrow pointing to the icon */}
//           <div
//             className="absolute w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-white dark:border-b-white"
//             style={{
//               top: "-8px",
//               left: "50%",
//               transform: "translateX(-50%)",
//             }}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Table;





import React, { useState, useRef, useEffect } from "react";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Job {
  posted: string;
  title: string;
  status: "In progress" | "Open" | "Completed";
  applicants: number;
  clients: string;
  hires: number;
  budget: number;
  dueDate: string;
  id: string
}

const getStatusClass = (status: Job["status"]) => {
  switch (status) {
    case "In progress":
      return "bg-orange-100 dark:bg-orange-100 text-orange-800 dark:text-orange-800";
    case "Open":
      return "bg-purple-100 dark:bg-purple-100 text-purple-800 dark:text-purple-800";
    case "Completed":
      return "bg-green-100 dark:bg-green-100 text-green-800 dark:text-green-800";
    default:
      return "";
  }
};

const Table: React.FC<{ jobs: Job[] }> = ({ jobs }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, right: 0 });
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const iconRef = useRef<HTMLSpanElement>(null);
  const router = useRouter();

  const handleIconClick = (event: React.MouseEvent, job: Job) => {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    setModalPosition({
      top: rect.bottom + window.scrollY, // Position below the icon
      right: rect.left + window.scrollX - 120, // Adjust left to center the modal relative to the icon
    });
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  // Close modal if clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (iconRef.current && !iconRef.current.contains(event.target as Node)) {
        setIsModalOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleViewWork = (job: Job) => {
    router.push(`/my-job/${job.id}`); 
    closeModal();
  };

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
                <p className="text-[14px] font-semibold text-[#C7C7CF] dark:text-[#C7C7CF]">
                  {job.posted}
                </p>
                <p className="text-[16px] font-semibold text-[#4B4B56]">{job.title}</p>
              </td>
              <td className="p-4 w-full sm:w-auto">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(
                    job.status
                  )}`}
                >
                  {job.status}
                </span>
              </td>
              <td className="p-4 w-full sm:w-auto">
                <span className="sm:hidden font-medium text-[#4B4B56]">Client Name: </span>
                {job.clients}
              </td>
              <td className="p-4 w-full sm:w-auto">
                <span className="sm:hidden font-medium text-[#4B4B56]">Budget: </span>
                {job.budget}
              </td>
              <td className="p-4 w-full sm:w-auto">
                <span className="sm:hidden font-medium text-[#4B4B56]">Due date: </span>
                {job.dueDate}
              </td>
              <td className="p-4 w-full sm:w-auto">
                <MoreHorizontal
                  className="h-5 w-5 text-gray-500 dark:text-gray-500 cursor-pointer"
                  onClick={(e) => handleIconClick(e, job)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && selectedJob && (
        <div
          className="fixed bg-white dark:bg-white border border-[#DBDBE3] rounded-[8px] shadow-lg p-2 z-50"
          style={{
            top: `${modalPosition.top}px`,
            left: `${modalPosition.right}px`,
            minWidth: "200px",
          }}
        >
          <ul className="text-[14px] font-medium text-[#4B4B56] dark:text-[#4B4B56]">
            <li
              className="px-4 py-2 text-[16px] font-semibold text-[#4B4B56] hover:bg-gray-100 dark:hover:bg-gray-100 rounded-t-[8px] cursor-pointer"
            >
                <Link href={`/my-job/${selectedJob.id}`} key={selectedJob.id}>
                    View work
                </Link>
              
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 text-[16px] font-semibold text-[#4B4B56] dark:hover:bg-gray-100 cursor-pointer"
              onClick={closeModal}
            >
              Mark as complete
            </li>
            <li
              className="px-4 py-2 text-[16px] font-semibold text-[#FF2929] hover:bg-gray-100 dark:hover:bg-gray-100 rounded-b-[8px] cursor-pointer"
              onClick={closeModal}
            >
              Decline job
            </li>
          </ul>
          {/* Arrow pointing to the icon */}
          <div
            className="absolute w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-white dark:border-b-white"
            style={{
              top: "-8px",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Table;