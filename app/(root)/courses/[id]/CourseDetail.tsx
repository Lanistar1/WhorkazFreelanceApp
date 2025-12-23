'use client'
import React from "react";
import Header from "@/components/Header";
import Image from "next/image";
import { useCourseById } from "@/app/actions/reactQuery"; 
import PaymentModal from '@/components/PaymentModal';

const DEFAULT_COURSE_IMAGE = "/assets/images/default-course-placeholder.png";

interface CourseDetailProps {
  id: string;
}

const CourseDetail = ({ id }: CourseDetailProps) => {
  const { data: course, isLoading, isError } = useCourseById(id);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl text-[#4B4B56]">Loading course details...</div>
      </div>
    );
  }

  if (isError || !course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-[#32323E]">
          <h2 className="text-2xl font-semibold mb-4">Course not found</h2>
          <p className="text-[#95959F]">The course may have been removed or is unavailable.</p>
        </div>
      </div>
    );
  }

  // Split whatYouWillLearn into array of trimmed items
  const learnItems = course.whatYouWillLearn
    ? course.whatYouWillLearn
        .split(',')
        .map(item => item.trim())
        .filter(item => item.length > 0)
    : [];

  return (
    <div className="min-h-screen w-full bg-white dark:bg-white text-gray-900 dark:text-gray-900">
      <Header title={course.title} />

      <main className="px-6 md:px-32 py-4 mb-16 md:mb-0">
        <h1 className="text-[24px] md:text-[32px] font-semibold text-[#000000] mb-2">
          {course.title}
        </h1>

        {/* Meta Info */}

        <div className="flex flex-row gap-4 mb-2 space-x-20">
           <div className="flex flex-col items-start gap-4 mb-6">
            <p className="text-[16px] font-semibold text-[#95959F]">
              Instructor: <span className="text-[#4B4B56]">
              {course.workman?.firstName && course.workman?.lastName 
                ? `${course.workman.firstName} ${course.workman.lastName}` 
                : course.workman?.email.split('@')[0] || "Unknown Instructor"}
              </span>
            </p>
            <p className="text-[16px] font-semibold text-[#95959F]">
              Duration: <span className="text-[#4B4B56]">{course.estimatedDuration}</span>
            </p>
            <p className="text-[16px] font-semibold text-[#95959F]">
              Level: <span className="text-[#4B4B56]">{course.level}</span>
            </p>
            
          </div>

          <div className="flex flex-col items-start gap-4 mb-6">
            <p className="text-[16px] font-semibold text-[#95959F]">
              Rating: <span className="text-[#4B4B56]">
                ★ {(Number(course.averageRating) || 0).toFixed(1)} ({course.totalRatings || 0} reviews)
              </span>
            </p>
            <p className="text-[16px] font-semibold text-[#95959F]">Course Type: <span className="text-[16px] text-[#4B4B56]">
              {course.classType === "online" ? "Online" : "Physical"}
            </span></p>
          </div>
        </div>

        {/* Price & Enroll Button */}
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => setIsModalOpen(true)}
             className="px-6 py-3 bg-[#3900DC] cursor-pointer text-white rounded-full text-[16px] md:text-[18px] font-bold hover:bg-purple-700 transition-colors">
            Enroll course for ₦{Number(course.price).toLocaleString()} only →
          </button>
        </div>

        {/* Course Image */}
        <div className="mb-8">
          <Image
            src={course.image && !course.image.includes("example.com") ? course.image : DEFAULT_COURSE_IMAGE}
            alt={course.title}
            width={800}
            height={300}
            className="w-full h-auto max-h-[400px] object-cover rounded-[12px] shadow-md"
            priority
          />
        </div>

        <div className="bg-white dark:bg-white border border-[#DBDBE3] rounded-[12px] p-6 md:p-8 shadow-sm">
          {/* Course Overview */}
          <div className="mb-8">
            <h2 className="text-[20px] font-semibold text-[#32323E] mb-3">Course Overview</h2>
            <p className="text-[14px] md:text-[16px] text-[#4B4B56] leading-relaxed">
              {course.description || "No description available yet."}
            </p>
          </div>

          {/* What You'll Learn – Bullet Points */}
          {learnItems.length > 0 && (
            <div className="mb-8">
              <h2 className="text-[20px] font-semibold text-[#32323E] mb-3">What You'll Learn</h2>
              <ul className="space-y-3 text-[14px] md:text-[16px] text-[#4B4B56]">
                {learnItems.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-3 w-2 h-2 bg-[#3900DC] rounded-full mt-[6px]"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Class Details – Online or Physical */}
          <div className="mb-8">
            <h2 className="text-[20px] font-semibold text-[#32323E] mb-3">Class Details</h2>
            {course.classType === "online" ? (
              <div className="space-y-2 text-[14px] md:text-[16px] text-[#4B4B56]">
                {course.coursePlatform && (
                  <p>
                    <strong>Platform:</strong> {course.coursePlatform}
                  </p>
                )}
                {course.courseLink && (
                  <p>
                    <strong>Link:</strong>{" "}
                    <a
                      href={course.courseLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#3900DC] underline hover:text-purple-700"
                    >
                      {course.courseLink}
                    </a>
                  </p>
                )}
                {!course.coursePlatform && !course.courseLink && (
                  <p>No online details available.</p>
                )}
              </div>
            ) : (
              <div className="space-y-2 text-[14px] md:text-[16px] text-[#4B4B56]">
                {course.classPlace && (
                  <p>
                    <strong>Place:</strong> {course.classPlace}
                  </p>
                )}
                {course.locationDescription && (
                  <p>
                    <strong>Location Description:</strong> {course.locationDescription}
                  </p>
                )}
                {!course.classPlace && !course.locationDescription && (
                  <p>No physical location details available.</p>
                )}
              </div>
            )}
          </div>

          {/* Optional: Placeholder for Modules (still not in API) */}
          <div className="mb-8">
            <h2 className="text-[20px] font-semibold text-[#32323E] mb-3">Modules Breakdown</h2>
            <p className="text-[14px] md:text-[16px] text-[#95959F]">Modules coming soon...</p>
          </div>

          {/* Reviews Placeholder */}
          <div>
            <h2 className="text-[20px] font-semibold text-[#32323E] mb-4">
              Reviews ({course.totalRatings})
            </h2>
            <p className="text-[14px] md:text-[16px] text-[#95959F]">No reviews yet.</p>
          </div>
        </div>
      </main>

      {/* Payment modal */}
    <PaymentModal 
      isOpen={isModalOpen} 
      onClose={() => setIsModalOpen(false)} 
      coursePrice={`₦${Number(course.price).toLocaleString()}`}
    />
    </div>
  );
};

export default CourseDetail;