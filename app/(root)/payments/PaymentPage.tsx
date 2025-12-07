'use client'
import React, { useEffect, useRef, useState } from "react";
import { MoreHorizontal } from "lucide-react";
import Header from "@/components/Header";
import Image from "next/image";
import { useRouter } from "next/router";

interface Payment {
  posted: string;
  title: string;
  client: {
    name: string;
    avatar: string;
    role: string;
  };
  status: 'Completed' | 'In Escrow' | 'Failed';
  amount: string;
}

const getStatusClass = (status: Payment['status']) => {
  switch (status) {
    case 'Completed':
      return 'bg-green-100 dark:bg-green-100 text-green-800 dark:text-green-800';
    case 'In Escrow':
      return 'bg-orange-100 dark:bg-orange-100 text-orange-800 dark:text-orange-800';
    case 'Failed':
      return 'bg-red-100 dark:bg-red-100 text-red-800 dark:text-red-800';
    default:
      return '';
  }
};

const PaymentPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, right: 0 });
  const [selectedJob, setSelectedJob] = useState<Payment | null>(null);
  const iconRef = useRef<HTMLSpanElement>(null);
  //const router = useRouter();

  const handleIconClick = (event: React.MouseEvent, payments: Payment) => {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    setModalPosition({
      top: rect.bottom + window.scrollY, // Position below the icon
      right: rect.left + window.scrollX - 120, // Adjust left to center the modal relative to the icon
    });
    setSelectedJob(payments);
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
    
  const payments: Payment[] = [
    {
      posted: 'Posted: May 25, 2025',
      title: 'Kitchen Cabinet Fix',
      client: {
        name: 'Jason Alexander',
        avatar: '/assets/images/person3.png',
        role: 'Bricklayer',
      },
      status: 'Completed',
      amount: '₦35,000',
    },
    {
      posted: 'Posted: May 25, 2025',
      title: 'Kitchen Cabinet Fix',
      client: {
        name: 'Jason Alexander',
        avatar: '/assets/images/person3.png',
        role: 'Bricklayer',
      },
      status: 'In Escrow',
      amount: '₦35,000',
    },
    {
      posted: 'Posted: May 25, 2025',
      title: 'Kitchen Cabinet Fix',
      client: {
        name: 'Jason Alexander',
        avatar: '/assets/images/person3.png',
        role: 'Bricklayer',
      },
      status: 'Failed',
      amount: '₦35,000',
    },
  ];

  return (
    <div className="min-h-screen w-full bg-white dark:bg-white text-gray-900 dark:text-gray-900">
      {/* Header */}
      <Header title="Payments" />

      {/* Main Content */}
      <main className="px-6 py-4">
        {/* Search and Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 space-y-4 sm:space-y-0">
          <div className="relative flex-1 w-full md:max-w-md">
            <input
              type="text"
              placeholder="Search payments"
              className="w-full pl-5 pr-4 py-3 border border-gray-300 dark:border-gray-300 rounded-[12px] text-[16px] font-medium text-[#4B4B56] dark:text-[#4B4B56] focus:outline-none focus:ring-2 focus:ring-[#220084]"
            />
            <Image
              src="/assets/icons/filterIcon.png"
              alt="Filter"
              width={18}
              height={18}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 object-contain"
            />
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-4 py-2 bg-white dark:bg-white border border-gray-300 dark:border-gray-300 rounded-full text-[14px] font-medium text-[#4B4B56] dark:text-[#4B4B56] hover:bg-gray-100 dark:hover:bg-gray-100 transition-colors whitespace-nowrap">
              Connect wallet
            </button>
            <button className="px-4 py-2 bg-white dark:bg-white border border-gray-300 dark:border-gray-300 rounded-full text-[14px] font-medium text-[#4B4B56] dark:text-[#4B4B56] hover:bg-gray-100 dark:hover:bg-gray-100 transition-colors whitespace-nowrap">
              Payment method
            </button>
            <button className="px-4 py-2 bg-white dark:bg-white border border-gray-300 dark:border-gray-300 rounded-full text-[14px] font-medium text-[#4B4B56] dark:text-[#4B4B56] hover:bg-gray-100 dark:hover:bg-gray-100 transition-colors whitespace-nowrap">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export
            </button>
          </div>
        </div>

        {/* Payments Table */}
        <div className="overflow-x-auto border border-[#C7C7CF] p-4 rounded-[12px] mb-20 md:mb-0 shadow-sm">
          <table className="w-full bg-white dark:bg-white shadow-none">
            <thead className="hidden sm:table-header-group">
              <tr className="text-left text-gray-500 dark:text-gray-500 text-sm">
                <th className="p-4 text-[16px] font-semibold text-[#95959F]">Job title</th>
                <th className="p-4 text-[16px] font-semibold text-[#95959F]">Client</th>
                <th className="p-4 text-[16px] font-semibold text-[#95959F]">Payment</th>
                <th className="p-4 text-[16px] font-semibold text-[#95959F]">Amount</th>
                <th className="p-4 text-[16px] font-semibold text-[#95959F]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.length > 0 ? (
                payments.map((payment, index) => (
                  <tr
                    key={index}
                    className="border-t border-gray-200 dark:border-gray-200 flex flex-col sm:table-row mb-4 sm:mb-0"
                  >
                    <td className="p-4 w-full sm:w-auto">
                      <p className="text-[14px] font-semibold text-[#C7C7CF] dark:text-[#C7C7CF]">{payment.posted}</p>
                      <p className="text-[16px] font-semibold text-[#4B4B56]">{payment.title}</p>
                    </td>
                    <td className="p-4 w-full sm:w-auto">
                      <span className="sm:hidden font-medium text-[#4B4B56]">Client: </span>
                      <div className="flex items-center space-x-3">
                        <Image
                          src={payment.client.avatar}
                          alt={payment.client.name}
                          width={40}
                          height={40}
                          className="rounded-full object-cover"
                        />
                        <div>
                          <p className="text-[14px] font-medium text-[#32323E]">{payment.client.name}</p>
                          <p className="text-[12px] text-[#95959F]">{payment.client.role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 w-full sm:w-auto">
                      <span className="sm:hidden font-medium text-[#4B4B56]">Payment: </span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(payment.status)}`}
                      >
                        {payment.status}
                      </span>
                    </td>
                    <td className="p-4 w-full sm:w-auto">
                      <span className="sm:hidden font-medium text-[#4B4B56]">Amount: </span>
                      <p className="text-[16px] font-semibold text-[#4B4B56]">{payment.amount}</p>
                    </td>
                    <td className="p-4 w-full sm:w-auto">
                      <span className="sm:hidden font-medium text-[#4B4B56]">Actions: </span>
                      <MoreHorizontal className="h-5 w-5 text-gray-500 dark:text-gray-500 cursor-pointer" 
                      onClick={(e) => handleIconClick(e, payments)}/>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-12">
                    <div className="flex flex-col items-center space-y-4">
                      <Image
                        src="/assets/images/paymentcard.png" // Replace with your actual empty state image path
                        alt="No payments"
                        width={150}
                        height={150}
                        className="object-contain"
                      />
                      <h3 className="text-[18px] font-semibold text-[#32323E]">No payments found</h3>
                      <p className="text-[14px] text-[#95959F]">
                        It looks like you haven’t made any payments yet. Start by creating a job or connecting your wallet.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

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
              onClick={closeModal}
            >
                View work
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
      </main>
    </div>
  );
};

export default PaymentPage;