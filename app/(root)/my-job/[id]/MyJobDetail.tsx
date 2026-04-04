// 'use client'
// import React, { useState, useEffect } from "react";
// import Header from "@/components/Header";
// import Image from "next/image";

// interface JobCard {
//   title: string;
//   posted: string;
//   user: {
//     name: string;
//     avatar: string;
//     jobs: number;
//     location: string;
//   };
//   tags: string[];
//   description: string;
//   status: 'Ongoing' | 'Completed' | 'Awaiting';
// }

// interface JobDetail {
//   id: string;
//   title: string;
//   postedBy: {
//     name: string;
//     avatar: string;
//     postedDate: string;
//     timeAgo: string;
//   };
//   description: string;
//   additionalRequests: string;
//   images: string[];
//   details: {
//     status: string;
//     location: string;
//     budget: string;
//     timeline: {
//       start: string;
//       end: string;
//     };
//     clientBadge: string[];
//     category: string;
//   };
//   completedJobs: JobCard[];
//   ongoingJobs: JobCard[];
//   awaitingJobs: JobCard[];
// }

// const MyJobDetail = ({ id }: { id: string }) => {
//   // Sample data (replace with API call in a real app)
//   const jobData: JobDetail[] = [
//     {
//       id: "1",
//       title: "Bathroom Renovation for 2-Bedroom Apartment",
//       postedBy: {
//         name: "Linda O.",
//         avatar: "/assets/images/person3.png",
//         postedDate: "Posted 24th of May 2025",
//         timeAgo: "1hr ago",
//       },
//       description: "We're looking for an experienced plumber and tiler to help renovate two bathrooms. Tasks include removing old fixtures, installing new piping for floor and walls, and fixing the new shower, WC, and vanity sink. Must be available to start this weekend and complete within 7 days.",
//       additionalRequests: "Please include how long you think the job will take and if you've worked on Binatec fans before.",
//       images: [
//         "/assets/images/fanImage.png",
//         "/assets/images/fanImage.png",
//       ],
//       details: {
//         status: "Open",
//         location: "Lekki Phase 1, Lagos, Nigeria",
//         budget: "₦400,000",
//         timeline: {
//           start: "Start date: 1st of June 2025",
//           end: "End date: 7th of June 2025",
//         },
//         clientBadge: [
//           "Workaz Verified Client",
//           "3 Jobs Posted",
//           "100% Response Rate",
//         ],
//         category: "Electrical Services Fan Installation",
//       },
//       completedJobs: [
//         {
//           title: "Bathroom Renovation for 2-Bedroom Apartment",
//           posted: "Posted 1hr ago",
//           user: {
//             name: "Linda O.",
//             avatar: "/assets/images/person3.png",
//             jobs: 3,
//             location: "Lekki Phase 1 Lagos",
//           },
//           tags: ["Plumber", "Tiler", "Interior Finisher"],
//           description: "We're looking for an experienced plumber and tiler to help renovate two bathrooms. Tasks include removing old fixtures, installing new piping for floor and walls, fixing the new shower, WC, and vanity sink. Must be available to start this weekend and complete within 7 days.",
//           status: "Completed",
//         }
//       ], // Empty for Completed tab
//       ongoingJobs: [
//         {
//           title: "Bathroom Renovation for 2-Bedroom Apartment",
//           posted: "Posted 1hr ago",
//           user: {
//             name: "Linda O.",
//             avatar: "/assets/images/person3.png",
//             jobs: 3,
//             location: "Lekki Phase 1 Lagos",
//           },
//           tags: ["Plumber", "Tiler", "Interior Finisher"],
//           description: "We're looking for an experienced plumber and tiler to help renovate two bathrooms. Tasks include removing old fixtures, installing new piping for floor and walls, fixing the new shower, WC, and vanity sink. Must be available to start this weekend and complete within 7 days.",
//           status: "Ongoing",
//         },
//         {
//           title: "Bathroom Renovation for 2-Bedroom Apartment",
//           posted: "Posted 1hr ago",
//           user: {
//             name: "Linda O.",
//             avatar: "/assets/images/person3.png",
//             jobs: 3,
//             location: "Lekki Phase 1 Lagos",
//           },
//           tags: ["Plumber", "Tiler", "Interior Finisher"],
//           description: "We're looking for an experienced plumber and tiler to help renovate two bathrooms. Tasks include removing old fixtures, installing new piping for floor and walls, fixing the new shower, WC, and vanity sink. Must be available to start this weekend and complete within 7 days.",
//           status: "Ongoing",
//         },
//       ],
//       awaitingJobs: [
//         {
//           title: "Bathroom Renovation for 2-Bedroom Apartment",
//           posted: "Posted 1hr ago",
//           user: {
//             name: "Linda O.",
//             avatar: "/assets/images/person3.png",
//             jobs: 3,
//             location: "Lekki Phase 1 Lagos",
//           },
//           tags: ["Plumber", "Tiler", "Interior Finisher"],
//           description: "We're looking for an experienced plumber and tiler to help renovate two bathrooms. Tasks include removing old fixtures, installing new piping for floor and walls, fixing the new shower, WC, and vanity sink. Must be available to start this weekend and complete within 7 days.",
//           status: "Awaiting",
//         },
//       ], // Empty for Awaiting tab
//     },
//     {
//       id: "2",
//       title: "Bathroom Renovation for 2-Bedroom Apartment",
//       postedBy: {
//         name: "Linda O.",
//         avatar: "/assets/images/person3.png",
//         postedDate: "Posted 24th of May 2025",
//         timeAgo: "1hr ago",
//       },
//       description: "We're looking for an experienced plumber and tiler to help renovate two bathrooms. Tasks include removing old fixtures, installing new piping for floor and walls, and fixing the new shower, WC, and vanity sink. Must be available to start this weekend and complete within 7 days.",
//       additionalRequests: "Please include how long you think the job will take and if you've worked on Binatec fans before.",
//       images: [
//         "/assets/images/fanImage.png",
//         "/assets/images/fanImage.png",
//       ],
//       details: {
//         status: "Open",
//         location: "Lekki Phase 1, Lagos, Nigeria",
//         budget: "₦400,000",
//         timeline: {
//           start: "Start date: 1st of June 2025",
//           end: "End date: 7th of June 2025",
//         },
//         clientBadge: [
//           "Workaz Verified Client",
//           "3 Jobs Posted",
//           "100% Response Rate",
//         ],
//         category: "Electrical Services Fan Installation",
//       },
//       completedJobs: [],
//       ongoingJobs: [
//         {
//           title: "Bathroom Renovation for 2-Bedroom Apartment",
//           posted: "Posted 1hr ago",
//           user: {
//             name: "Linda O.",
//             avatar: "/assets/images/person3.png",
//             jobs: 3,
//             location: "Lekki Phase 1 Lagos",
//           },
//           tags: ["Plumber", "Tiler", "Interior Finisher"],
//           description: "We're looking for an experienced plumber and tiler to help renovate two bathrooms. Tasks include removing old fixtures, installing new piping for floor and walls, fixing the new shower, WC, and vanity sink. Must be available to start this weekend and complete within 7 days.",
//           status: "Ongoing",
//         },
//         {
//           title: "Bathroom Renovation for 2-Bedroom Apartment",
//           posted: "Posted 1hr ago",
//           user: {
//             name: "Linda O.",
//             avatar: "/assets/images/person3.png",
//             jobs: 3,
//             location: "Lekki Phase 1 Lagos",
//           },
//           tags: ["Plumber", "Tiler", "Interior Finisher"],
//           description: "We're looking for an experienced plumber and tiler to help renovate two bathrooms. Tasks include removing old fixtures, installing new piping for floor and walls, fixing the new shower, WC, and vanity sink. Must be available to start this weekend and complete within 7 days.",
//           status: "Ongoing",
//         },
//       ],
//       awaitingJobs: [],
//     },
//   ];

//   const [activeTab, setActiveTab] = useState("Overview");
//   const job = jobData.find((j) => j.id === id);

//   if (!job) {
//     return <div className="text-center py-12">Job not found</div>;
//   }

//   // Calculate tab counts dynamically
//   const completedCount = job.completedJobs.length;
//   const ongoingCount = job.ongoingJobs.length;
//   const awaitingCount = job.awaitingJobs.length;

//   const overviewTabs = [
//     "Overview",
//     `Completed (${completedCount})`,
//     `Ongoing (${ongoingCount})`,
//     `Awaiting (${awaitingCount})`,
//   ];

//   const getStatusClass = (status: JobCard['status']) => {
//     switch (status) {
//       case "Ongoing":
//         return "bg-[#FFF6E9] text-[#FF9500]";
//       case "Completed":
//         return "bg-[#EFFFF3] text-[#34C759]";
//       case "Awaiting":
//         return "bg-[#FFEAE9] text-[#FF2929]";
//       default:
//         return "";
//     }
//   };

//   const renderContent = () => {
//     switch (activeTab) {
//       case "Overview":
//         return (
//           <div className="grid grid-cols-1 md:grid-cols-[60%_38%] gap-6">
//             {/* Left Side - Overview */}
//             <div className="bg-white dark:bg-white border border-[#DBDBE3] rounded-[12px] p-4 shadow-sm">
//               <div className="flex items-center space-x-3 mb-4">
//                 <Image
//                   src={job.postedBy.avatar}
//                   alt={job.postedBy.name}
//                   width={48}
//                   height={48}
//                   className="rounded-full object-cover"
//                 />
//                 <div>
//                   <p className="text-[16px] font-semibold text-[#32323E]">{job.postedBy.name}</p>
//                   <p className="text-[12px] text-[#95959F]">{job.postedBy.postedDate}</p>
//                 </div>
//                 <p className="text-[12px] text-[#95959F] ml-auto">{job.postedBy.timeAgo}</p>
//               </div>
//               <p className="text-[14px] text-[#4B4B56] mb-4">{job.description}</p>
//               <div className="mb-4">
//                 <p className="text-[14px] font-semibold text-[#3900DC]">① Additional Requests:</p>
//                 <p className="text-[14px] text-[#4B4B56]">{job.additionalRequests}</p>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {job.images.map((img, index) => (
//                   <Image
//                     key={index}
//                     src={img}
//                     alt={`Job image ${index + 1}`}
//                     width={200}
//                     height={200}
//                     className="w-full h-auto object-cover rounded-[8px]"
//                   />
//                 ))}
//               </div>
//             </div>

//             {/* Right Side - Details */}
//             <div className="bg-white dark:bg-white border border-[#DBDBE3] rounded-[12px] p-4 shadow-sm space-y-4">
//               <h3 className="text-[18px] font-semibold text-[#32323E]">Details</h3>
//               <div className="flex items-center space-x-2">
//                 <Image src="/assets/icons/watch-status.png" alt="" width={12} height={12} />
//                 <div className="flex flex-row gap-2 pl-2 items-center">
//                   <p className="text-[14px] font-medium text-[#4B4B56]">Status:</p>
//                   <p
//                     className={`px-3 py-1 rounded-full text-[12px] font-medium ${
//                       job.details.status === "Open"
//                         ? "bg-[#EFFFF3] text-[#34C759] border border-[#34C759]"
//                         : ""
//                     }`}
//                   >
//                     {job.details.status}
//                   </p>
//                 </div>
//               </div>
//               <div className="flex items-start space-x-2">
//                 <Image src="/assets/icons/location.png" alt="" width={12} height={12} className="mt-1" />
//                 <div>
//                   <p className="text-[14px] font-medium text-[#4B4B56]">Location</p>
//                   <p className="text-[14px] text-[#4B4B56]">{job.details.location}</p>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <Image src="/assets/icons/budget.png" alt="" width={12} height={12} />
//                 <p className="text-[14px] font-medium text-[#4B4B56]">Budget: {job.details.budget}</p>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <Image src="/assets/icons/timer.png" alt="" width={12} height={12} />
//                 <p className="text-[14px] font-medium text-[#4B4B56]">Timeline:</p>
//               </div>
//               <ul className="list-disc pl-6 space-y-1 text-[14px] text-[#4B4B56]">
//                 <li>{job.details.timeline.start}</li>
//                 <li>{job.details.timeline.end}</li>
//               </ul>
//               <div className="flex items-center space-x-2">
//                 <Image src="/assets/icons/check-badge.png" alt="" width={12} height={12} />
//                 <p className="text-[14px] font-medium text-[#4B4B56]">Client Badge:</p>
//               </div>
//               <ul className="list-disc pl-6 space-y-1 text-[14px] text-[#4B4B56]">
//                 {job.details.clientBadge.map((badge, index) => (
//                   <li key={index}>{badge}</li>
//                 ))}
//               </ul>
//               <div className="flex items-center space-x-2">
//                 <Image src="/assets/icons/category.png" alt="" width={12} height={12} />
//                 <p className="text-[14px] font-medium text-[#4B4B56]">Category:</p>
//               </div>
//               <p className="text-[14px] text-[#4B4B56]">{job.details.category}</p>
//             </div>
//           </div>
//         );

//       case "Completed":
//         return (
//           <div className="space-y-6">
//             {job.completedJobs.map((jobCard, index) => (
//               <div key={index} className="bg-white dark:bg-white border border-[#DBDBE3] rounded-[12px] p-4 shadow-sm">
//                 <p className="text-[12px] text-[#95959F] mb-2">{jobCard.posted}</p>
//                 <h3 className="text-[20px] md:text-[28px] font-semibold text-[#32323E] mb-3">{jobCard.title}</h3>
//                 <div className="flex items-center space-x-3 mb-3">
//                   <Image
//                     src={jobCard.user.avatar}
//                     alt={jobCard.user.name}
//                     width={48}
//                     height={48}
//                     className="rounded-full object-cover"
//                   />
//                   <div>
//                     <p className="text-[16px] font-semibold text-[#4B4B56]">{jobCard.user.name}</p>
//                     <p className="text-[14px] text-[#95959F]">{jobCard.user.jobs} jobs • {jobCard.user.location}</p>
//                   </div>
//                   <span
//                     className={`ml-auto px-3 py-1 rounded-full text-[12px] font-medium ${getStatusClass(jobCard.status)}`}
//                   >
//                     {jobCard.status}
//                   </span>
//                 </div>
//                 <div className="flex flex-wrap gap-2 mb-4">
//                   {jobCard.tags.map((tag, tagIndex) => (
//                     <span
//                       key={tagIndex}
//                       className="px-3 py-1 border border-1-[#95959F] bg-white dark:bg-white text-[#95959F] dark:text-[#95959F] rounded-full text-[12px] font-medium"
//                     >
//                       {tag}
//                     </span>
//                   ))}
//                 </div>
//                 <p className="text-[14px] md:text-[16px] font-semibold text-[#4B4B56] leading-relaxed">{jobCard.description}</p>
//               </div>
//             ))}
//           </div>
//         );

//       case "Ongoing":
//         return (
//           <div className="space-y-6">
//             {job.ongoingJobs.map((jobCard, index) => (
//               <div key={index} className="bg-white dark:bg-white border border-[#DBDBE3] rounded-[12px] p-4 shadow-sm">
//                 <p className="text-[12px] text-[#95959F] mb-2">{jobCard.posted}</p>
//                 <h3 className="text-[20px] md:text-[28px] font-medium text-[#4B4B56] mb-3">{jobCard.title}</h3>
//                 <div className="flex items-center space-x-3 mb-3">
//                   <Image
//                     src={jobCard.user.avatar}
//                     alt={jobCard.user.name}
//                     width={48}
//                     height={48}
//                     className="rounded-full object-cover"
//                   />
//                   <div>
//                     <p className="text-[16px] font-semibold text-[#4B4B56]">{jobCard.user.name}</p>
//                     <p className="text-[14px] text-[#95959F]">{jobCard.user.jobs} jobs • {jobCard.user.location}</p>
//                   </div>
//                   <span
//                     className={`ml-auto px-3 py-1 rounded-full text-[12px] font-medium ${getStatusClass(jobCard.status)}`}
//                   >
//                     {jobCard.status}
//                   </span>
//                 </div>
//                 <div className="flex flex-wrap gap-2 mb-4">
//                   {jobCard.tags.map((tag, tagIndex) => (
//                     <span
//                       key={tagIndex}
//                       className="px-3 py-1 border border-1-[#95959F] bg-white dark:bg-white text-[#95959F] dark:text-[#95959F] rounded-full text-[12px] font-medium"
//                     >
//                       {tag}
//                     </span>
//                   ))}
//                 </div>
//                 <p className="text-[14px] md:text-[16px] font-semibold text-[#4B4B56] leading-relaxed">{jobCard.description}</p>
//               </div>
//             ))}
//           </div>
//         );

//       case "Awaiting":
//         return (
//           <div className="space-y-6">
//             {job.awaitingJobs.map((jobCard, index) => (
//               <div key={index} className="bg-white dark:bg-white border border-[#DBDBE3] rounded-[12px] p-4 shadow-sm">
//                 <p className="text-[12px] text-[#95959F] mb-2">{jobCard.posted}</p>
//                 <h3 className="text-[20px] md:text-[28px] font-semibold text-[#32323E] mb-3">{jobCard.title}</h3>
//                 <div className="flex items-center space-x-3 mb-3">
//                   <Image
//                     src={jobCard.user.avatar}
//                     alt={jobCard.user.name}
//                     width={48}
//                     height={48}
//                     className="rounded-full object-cover"
//                   />
//                   <div>
//                     <p className="text-[16px] font-semibold text-[#4B4B56]">{jobCard.user.name}</p>
//                     <p className="text-[14px] text-[#95959F]">{jobCard.user.jobs} jobs • {jobCard.user.location}</p>
//                   </div>
//                   <span
//                     className={`ml-auto px-3 py-1 rounded-full text-[12px] font-medium ${getStatusClass(jobCard.status)}`}
//                   >
//                     {jobCard.status}
//                   </span>
//                 </div>
//                 <div className="flex flex-wrap gap-2 mb-4">
//                   {jobCard.tags.map((tag, tagIndex) => (
//                     <span
//                       key={tagIndex}
//                       className="px-3 py-1 border border-1-[#95959F] bg-white dark:bg-white text-[#95959F] dark:text-[#95959F] rounded-full text-[12px] font-medium"
//                     >
//                       {tag}
//                     </span>
//                   ))}
//                 </div>
//                 <p className="text-[14px] md:text-[16px] font-semibold text-[#4B4B56] leading-relaxed">{jobCard.description}</p>
//               </div>
//             ))}
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="min-h-screen w-full bg-white dark:bg-white text-gray-900 dark:text-gray-900">
//       {/* Header */}
//       <Header title="Job Detail" />

//       {/* Main Content */}
//       <main className="px-6 py-4 mb-16 md:mb-0">
//         <h2 className="text-[#4B4B56] text-[24px] md:text-[32px] font-medium mb-5">{job.title}</h2>
//         {/* Overview Tabs */}
//         <div className="flex space-x-4 mb-6 overflow-x-auto">
//           {overviewTabs.map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab.split(" (")[0])}
//               className={`text-[14px] font-medium whitespace-nowrap px-4 py-2 bg-[#FAFAFA] rounded-full cursor-pointer ${
//                 activeTab === tab.split(" (")[0]
//                   ? "text-[#3900DC] border border-[#3900DC] font-semibold"
//                   : "text-[#95959F] hover:text-[#95959F] border border-[#DBDBE3] font-semibold"
//               }`}
//             >
//               {tab}
//             </button>
//           ))}
//         </div>

//         {/* Content */}
//         {renderContent()}
//       </main>
//     </div>
//   );
// };

// export default MyJobDetail;




/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useState, useMemo } from "react";
import Header from "@/components/Header";
import Image from "next/image";
import { useApplicationId } from "@/app/actions/reactQuery"; 
import { useAuth } from "@/app/context/AuthContext"; 
// Import your types
import { JobFromAPI, Milestone } from "@/app/actions/type"; 
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

// --- YOUR EXISTING INTERFACES ---
interface JobCard {
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
  status: 'Ongoing' | 'Completed' | 'Awaiting';
}

interface JobDetail {
  id: string;
  title: string;
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
  completedJobs: JobCard[];
  ongoingJobs: JobCard[];
  awaitingJobs: JobCard[];
}

// --- TRANSFORM API DATA TO UI DATA ---
const transformApiToJobDetail = (apiJob: JobFromAPI): JobDetail => {
  // FIX: Use optional chaining to safely access the first milestone.
  const primaryMilestone: Milestone | undefined = apiJob.milestones?.[0]; 

  // Safely access the client data which is outside the main JobFromAPI type definition
  // We use 'as any' here because 'client' is not in your original JobFromAPI interface
  const clientData = (apiJob as any).client; 
  
  const postDate = new Date(apiJob.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const timeAgo = "1hr ago"; // Placeholder
  
  // Status mapping
  let detailStatus: string = apiJob.status.charAt(0).toUpperCase() + apiJob.status.slice(1);
  if (detailStatus === 'InProgress') detailStatus = 'In progress';

  // Budget formatting
  const minimumBudget = primaryMilestone?.minimumBudget ? parseFloat(primaryMilestone.minimumBudget).toLocaleString() : 'N/A';
  const maximumBudget = primaryMilestone?.maximumBudget ? parseFloat(primaryMilestone.maximumBudget).toLocaleString() : 'N/A';
  const budget = primaryMilestone 
    ? `₦${minimumBudget} - ₦${maximumBudget}` 
    : "N/A Budget";
    
  // Dates
  const startDate = primaryMilestone?.startOfProject 
    ? `Start date: ${new Date(primaryMilestone.startOfProject).toLocaleDateString('en-GB')}` 
    : "Start date: N/A";
    
  const endDate = primaryMilestone?.endDate 
    ? `End date: ${new Date(primaryMilestone.endDate).toLocaleDateString('en-GB')}` 
    : "End date: N/A";

  // Client Details
  const clientName = clientData?.name || clientData?.email || "Unknown Client"; 
  const clientAvatar = clientData?.profilePic || "/assets/images/person3.png"; 
  const clientLocation = clientData?.address || "Location N/A"; 

  // Placeholders for missing API data
  const additionalRequests = "No additional requests specified."; 
  const category = "N/A Category"; 

  return {
    id: apiJob.id,
    title: primaryMilestone?.workTitle || "N/A Job Title",
    postedBy: {
      name: clientName,
      avatar: clientAvatar,
      postedDate: `Posted ${postDate}`,
      timeAgo: timeAgo,
    },
    description: primaryMilestone?.description || "No description provided.",
    additionalRequests: additionalRequests,
    images: primaryMilestone?.photos || [],
    details: {
      status: detailStatus,
      location: primaryMilestone?.location || clientLocation,
      budget: budget,
      timeline: {
        start: startDate,
        end: endDate,
      },
      clientBadge: [
        "Workaz Verified Client", 
        "Client Status: " + (clientData?.status || 'N/A'),
        "100% Response Rate",
      ],
      category: category, 
    },
    completedJobs: [],
    ongoingJobs: [],
    awaitingJobs: [],
  };
};
// --- END TRANSFORM FUNCTION ---

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;


const MyJobDetail = ({ id }: { id: string }) => {
  // 1. Get token
  const { token, user } = useAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
const [previews, setPreviews] = useState<string[]>([]);
const [isSubmittingWork, setIsSubmittingWork] = useState(false);

const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files) {
    const filesArray = Array.from(e.target.files);
    setSelectedFiles((prev) => [...prev, ...filesArray]);

    const newPreviews = filesArray.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
  }
};

const removeImage = (index: number) => {
  setPreviews((prev) => prev.filter((_, i) => i !== index));
  setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
};

  
  // 2. Fetch data
  const { 
    data: apiJob, 
    isLoading, 
    isError, 
    error 
  } = useApplicationId(id, token as string);

  // 3. Transform API data
  const job: JobDetail | undefined = useMemo(() => {
    if (apiJob) {
      return transformApiToJobDetail(apiJob); 
    }
    return undefined;
  }, [apiJob]);

  const [activeTab, setActiveTab] = useState("Overview");

  // 4. Handle states
  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <p className="text-[18px] font-medium text-[#4B4B56]">Loading job details...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <p className="text-red-600 text-[18px] font-medium">Error loading job: {error?.message}</p>
      </div>
    );
  }

  if (!job) {
    return <div className="text-center py-12 text-[18px] font-medium text-[#4B4B56]">Job not found or failed to load data.</div>;
  }

  // Calculate tab counts
  const completedCount = job.completedJobs.length;
  const ongoingCount = job.ongoingJobs.length;
  const awaitingCount = job.awaitingJobs.length;

  const overviewTabs = [
    "Overview",
  ];

  const getStatusClass = (status: JobCard['status']) => {
    switch (status) {
      case "Ongoing":
        return "bg-[#FFF6E9] text-[#FF9500]";
      case "Completed":
        return "bg-[#EFFFF3] text-[#34C759]";
      case "Awaiting":
        return "bg-[#FFEAE9] text-[#FF2929]";
      default:
        return "";
    }
  };

  const renderContent = () => {
     switch (activeTab) {
      case "Overview":
        return (
          <div className="grid grid-cols-1 md:grid-cols-[60%_38%] gap-6">
            {/* Left Side - Overview */}
            <div className="bg-white dark:bg-white border border-[#DBDBE3] rounded-[12px] p-4 shadow-sm">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Use optional chaining on images array */}
                {job.images?.map((img, index) => (
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
            <div className="bg-white dark:bg-white border border-[#DBDBE3] rounded-[12px] p-4 shadow-sm space-y-4">
              <h3 className="text-[18px] font-semibold text-[#32323E]">Details</h3>
              {/* Status */}
              <div className="flex items-center space-x-2">
                <Image src="/assets/icons/watch-status.png" alt="" width={12} height={12} />
                <div className="flex flex-row gap-2 pl-2 items-center">
                  <p className="text-[14px] font-medium text-[#4B4B56]">Status:</p>
                  <p
                    className={`px-3 py-1 rounded-full text-[12px] font-medium ${
                      job.details.status.includes("Open")
                        ? "bg-[#EFFFF3] text-[#34C759] border border-[#34C759]"
                        : ""
                    }`}
                  >
                    {job.details.status}
                  </p>
                </div>
              </div>
              {/* Location */}
              <div className="flex items-start space-x-2">
                <Image src="/assets/icons/location.png" alt="" width={12} height={12} className="mt-1" />
                <div>
                  <p className="text-[14px] font-medium text-[#4B4B56]">Location</p>
                  <p className="text-[14px] text-[#4B4B56]">{job.details.location}</p>
                </div>
              </div>
              {/* Budget */}
              <div className="flex items-center space-x-2">
                <Image src="/assets/icons/budget.png" alt="" width={12} height={12} />
                <p className="text-[14px] font-medium text-[#4B4B56]">Budget: {job.details.budget}</p>
              </div>
              {/* Timeline */}
              <div className="flex items-center space-x-2">
                <Image src="/assets/icons/timer.png" alt="" width={12} height={12} />
                <p className="text-[14px] font-medium text-[#4B4B56]">Timeline:</p>
              </div>
              <ul className="list-disc pl-6 space-y-1 text-[14px] text-[#4B4B56]">
                <li>{job.details.timeline.start}</li>
                <li>{job.details.timeline.end}</li>
              </ul>
              {/* Client Badge */}
              <div className="flex items-center space-x-2">
                <Image src="/assets/icons/check-badge.png" alt="" width={12} height={12} />
                <p className="text-[14px] font-medium text-[#4B4B56]">Client Badge:</p>
              </div>
              <ul className="list-disc pl-6 space-y-1 text-[14px] text-[#4B4B56]">
                {job.details.clientBadge.map((badge, index) => (
                  <li key={index}>{badge}</li>
                ))}
              </ul>
              {/* Category */}
              <div className="flex items-center space-x-2">
                <Image src="/assets/icons/category.png" alt="" width={12} height={12} />
                <p className="text-[14px] font-medium text-[#4B4B56]">Category:</p>
              </div>
              <p className="text-[14px] text-[#4B4B56]">{job.details.category}</p>

              {/* Submit Work Section - Only show if Hired and not Completed */}
              {/* --- SUBMIT WORK SECTION --- */}
              {job.details.status.includes("Completed") && (
                <div className="mt-8 pt-6 border-t border-[#DBDBE3] col-span-full">
                  <div className="bg-white border border-[#DBDBE3] rounded-2xl p-6 shadow-sm max-w-xl mx-auto">
                    <h3 className="text-[24px] font-semibold text-[#32323E] mb-6">Submit work</h3>
                    
                    <div className="space-y-4">
                      {/* Upload Box */}
                      <div className="relative flex flex-col items-center justify-center w-full min-h-[220px] border-2 border-dashed border-[#E5E5E9] rounded-2xl bg-white hover:bg-[#F9F9FB] transition-colors cursor-pointer">
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          className="absolute inset-0 opacity-0 cursor-pointer z-10"
                          onChange={(e) => {
                            if (e.target.files) {
                              const filesArray = Array.from(e.target.files);
                              const newPreviews = filesArray.map(file => URL.createObjectURL(file));
                              setPreviews(prev => [...prev, ...newPreviews]);
                              setSelectedFiles(prev => [...prev, ...filesArray]);
                            }
                          }}
                        />
                        
                        <div className="flex flex-col items-center text-center p-4">
                          <div className="w-16 h-16 rounded-full bg-[#F1F1F5] flex items-center justify-center text-[#95959F] text-3xl mb-4">
                            +
                          </div>
                          <p className="text-[18px] font-medium text-[#4B4B56]">Browse existing media,</p>
                          <p className="text-[14px] text-[#95959F] mt-1 max-w-[220px]">
                            A picture can help pros understand the task better.
                          </p>
                        </div>
                      </div>

                      {/* Selected Files List (Matching your image) */}
                      {/* Selected Images Gallery */}
                      {previews.length > 0 && (
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 mt-6">
                          {previews.map((url, index) => (
                            <div key={index} className="relative group aspect-square">
                              {/* The Image */}
                              <img 
                                src={url} 
                                alt="preview" 
                                className="w-full h-full object-cover rounded-xl border border-[#E5E5E9]" 
                              />
                              
                              {/* Remove Button (Appears on Hover) */}
                              <button 
                                onClick={() => {
                                  setPreviews(prev => prev.filter((_, i) => i !== index));
                                  setSelectedFiles(prev => prev.filter((_, i) => i !== index));
                                }}
                                className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-20"
                              >
                                ✕
                              </button>

                              {/* Optional: Simple filename label below image if you still want it, 
                                  but based on your request, I've left it out for a pure image view */}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Action Button */}
                      <button
                        onClick={handleSubmitWork}
                        disabled={isSubmittingWork || previews.length === 0}
                        className="w-full mt-4 bg-[#3900DC] text-white py-4 rounded-full font-semibold text-[18px] shadow-md hover:bg-[#2a00b3] disabled:opacity-50 transition-all"
                      >
                        {isSubmittingWork ? "Submitting..." : "Submit work"}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      // Remaining tabs will show "No jobs found" until API provides data for them
      case "Completed":
        return (
          <div className="space-y-6">
            {job.completedJobs.length > 0 ? job.completedJobs.map((jobCard, index) => (
               // ... your existing job card rendering logic
               <p key={index}>Completed Job Card...</p>
            )) : <p className="py-4 text-[#95959F]">No completed jobs found.</p>}
          </div>
        );
        
      case "Ongoing":
         return (
          <div className="space-y-6">
            {job.ongoingJobs.length > 0 ? job.ongoingJobs.map((jobCard, index) => (
               // ... your existing job card rendering logic
               <p key={index}>Ongoing Job Card...</p>
            )) : <p className="py-4 text-[#95959F]">No ongoing jobs found.</p>}
          </div>
        );

      case "Awaiting":
        return (
          <div className="space-y-6">
            {job.awaitingJobs.length > 0 ? job.awaitingJobs.map((jobCard, index) => (
               // ... your existing job card rendering logic
               <p key={index}>Awaiting Job Card...</p>
            )) : <p className="py-4 text-[#95959F]">No awaiting jobs found.</p>}
          </div>
        );

      default:
        return null;
    }
  };

  //========= Apply for this job ===========
  const handleSubmit = async () => {
    if (!id) return;

    setIsSubmitting(true);

    try {
      const response = await fetch(`${apiUrl}/api/v1/applications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          jobId: id,
        }),
      });

      const data = await response.json();
      console.log("Application successful:", data);

      if (!response.ok) {
        toast.error(data?.message || "Something went wrong");
        return;
      }

      // ====== Success message =======
      toast.success("Application submitted successfully");
      router.push("/dashboard");
    } catch (error) {
      console.error("Application error:", error);
      // optional: show error toast
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitWork = async () => {
  if (selectedFiles.length === 0) {
    toast.error("Please upload at least one image of the finished work");
    return;
  }

  setIsSubmittingWork(true);
  const formData = new FormData();
  
  // Attach the jobId
  formData.append("jobId", id);
  
  // Attach all files
  selectedFiles.forEach((file) => {
    formData.append("workImages", file); // Ensure "workImages" matches your backend field name
  });

  try {
    const response = await fetch(`${apiUrl}/api/v1/jobs/submit-work`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        // Note: Do NOT set Content-Type header when using FormData; 
        // the browser sets it automatically with the boundary.
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to submit work");
    }

    toast.success("Work submitted successfully!");
    router.push("/dashboard"); // or refresh data
  } catch (err: any) {
    toast.error(err.message);
  } finally {
    setIsSubmittingWork(false);
  }
};

  return (
    <div className="min-h-screen w-full bg-white dark:bg-white text-gray-900 dark:text-gray-900">
      {/* Header */}
      <Header title="Job Application Detail" />

      {/* Main Content */}
      <main className="px-6 py-4 mb-16 md:mb-0">
        <h2 className="text-[#4B4B56] text-[24px] md:text-[32px] font-medium mb-5">{job.title}</h2>
        {/* Overview Tabs */}
        <div className="flex space-x-4 mb-6 overflow-x-auto">
          {overviewTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.split(" (")[0])}
              className={`text-[14px] font-medium whitespace-nowrap px-4 py-2 bg-[#FAFAFA] rounded-full cursor-pointer ${
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
        {renderContent()}


        {/* Confirmation modal before applying */}
        {showConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-xl p-6 w-full max-w-sm">
              <h3 className="text-lg font-semibold mb-2">Confirm Application</h3>
              <p className="text-sm text-gray-600 mb-6">
                Are you sure you want to apply for this job?
              </p>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="px-4 py-2 text-sm rounded-lg border"
                >
                  Cancel
                </button>

                <button
                  onClick={() => {
                    setShowConfirm(false);
                    handleSubmit();
                  }}
                  className="px-4 py-2 text-sm rounded-lg bg-[#3900DC] text-white"
                >
                  Yes, Apply
                </button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default MyJobDetail;

