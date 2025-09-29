'use client'
import React from "react";
import Header from "@/components/Header";
import Image from "next/image";

interface CourseDetailProps {
  params: { id: string };
}

interface Course {
  id: string;
  title: string;
  instructor: string;
  duration: string;
  level: string;
  rating: number;
  reviews: number;
  price: string;
  overview: string;
  learnItems: string[];
  modules: string[];
  reviewsData: {
    avatar: string;
    name: string;
    rating: number;
    text: string;
  }[];
}

const sampleCourses: Course[] = [
  {
    id: "1",
    title: "Tile Laying Mastery for Beginners",
    instructor: "Owale Ade",
    duration: "2 Weeks (Self-paced)",
    level: "Beginner",
    rating: 4.8,
    reviews: 137,
    price: "N25,000",
    overview: "Learn how to lay tiles like a pro, even if you've never picked up a trowel. This beginner-friendly course teaches you the fundamentals of tile laying - from preparing your surface to cutting tiles and mastering basic layouts.",
    learnItems: [
      "Understanding tile types & adhesives",
      "How to measure and plan tile layouts",
      "Cutting and laying tiles with precision",
      "Applying grout and finishing cleanly",
      "Safety practices for the job",
    ],
    modules: [
      "Module 1: Getting Started with Tools",
      "Module 2: Planning & Measuring Your Space",
      "Module 3: Cutting Techniques",
      "Module 4: Hands-On: Laying Wall & Floor Tiles",
      "Module 5: Grouting & Cleaning",
      "Module 6: Common Mistakes and How to Fix Them",
    ],
    reviewsData: [
      {
        avatar: "/assets/images/person3.png",
        name: "Felix O.",
        rating: 5,
        text: "Clear and Well-Structured. This course is incredibly well-organized. Each topic flows logically into the next, making the learning process smooth and enjoyable.",
      },
      {
        avatar: "/assets/images/person3.png",
        name: "Felix O.",
        rating: 5,
        text: "Clear and Well-Structured. This course is incredibly well-organized. Each topic flows logically into the next, making the learning process smooth and enjoyable.",
      },
    ],
  },
  // Add more courses as needed
];

const CourseDetail = ({ id }: { id: string }) => {
//   const { id } = params;
  const course = sampleCourses.find((c) => c.id === id);

  if (!course) {
    return <div className="text-center py-12 text-[#32323E]">Course not found</div>;
  }

  return (
    <div className="min-h-screen w-full bg-white dark:bg-white text-gray-900 dark:text-gray-900">
      {/* Header */}
      <Header title="Course Details" />

      {/* Main Content */}
      <main className="px-6 md:px-32 py-4 mb-16 md:mb-0">
        <h1 className="text-[24px] md:text-[32px] font-semibold text-[##000000] mb-2">{course.title}</h1>
        <p className="text-[16px] font-semibold text-[#95959F] mb-4">Instructor: <span className="text-[#4B4B56]">{course.instructor}</span></p>
        <p className="text-[16px] font-semibold text-[#95959F] mb-1">Duration: <span className="text-[#4B4B56]">{course.duration}</span></p>
        <p className="text-[16px] font-semibold font-semibold text-[#95959F] mb-1">Level: <span className="text-[#4B4B56]">{course.level}</span></p>
        <p className="text-[16px] font-semibold text-[#95959F] mb-4">
          Rating: <span className="text-[#4B4B56]">★ {course.rating} ({course.reviews} reviews)</span>
        </p>
        <button className="px-6 py-3 bg-[#3900DC] cursor-pointer text-white rounded-full text-[18px] text-[16px] font-bold hover:bg-purple-700 transition-colors mb-8">
          Enroll course for {course.price} only →
        </button>

        <Image
            src="/assets/images/courseImage2.png"
            alt="New person"
            width={800}
            height={300}
            className=" object-cover mb-8"
        />

        <div className="bg-white dark:bg-white border border-[#DBDBE3] rounded-[12px] p-4 mb-6 shadow-sm">
            {/* Course Overview */}
        <div className="mb-6">
          <h2 className="text-[18px] font-semibold text-[#32323E] mb-2">Course Overview</h2>
          <p className="text-[14px] text-[#95959F]">{course.overview}</p>
        </div>

        {/* What You'll Learn */}
        <div className="mb-6">
          <h2 className="text-[18px] font-semibold text-[#32323E] mb-2">What You ll Learn</h2>
          <ul className="space-y-2 text-[14px] text-[#95959F]">
            {course.learnItems.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2 w-1.5 h-1.5 bg-[#95959F] rounded-full mt-2"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Modules Breakdown */}
        <div className="mb-6">
          <h2 className="text-[18px] font-semibold text-[#32323E] mb-2">Modules Breakdown</h2>
          <ul className="space-y-2 text-[14px] text-[#95959F]">
            {course.modules.map((module, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2 w-1.5 h-1.5 bg-[#95959F] rounded-full mt-2"></span>
                {module}
              </li>
            ))}
          </ul>
        </div>

        {/* Reviews */}
        <div>
          <h2 className="text-[18px] font-semibold text-[#32323E] mb-4">Reviews ({course.reviews})</h2>
          <div className="space-y-4">
            {course.reviewsData.map((review, index) => (
              <div key={index} className="border-b border-[#DBDBE3] flex flex-col space-x-4 pb-3">
                <div className="flex flex-row space-x-4">
                    <Image
                        src={review.avatar}
                        alt={review.name}
                        width={48}
                        height={48}
                        className="rounded-full object-cover"
                    />
                    <div className="flex flex-col items-center space-x-2 mb-1">
                        <h3 className="text-[16px] font-semibold text-[#32323E]">{review.name}</h3>
                        <p className="text-[14px] text-[#95959F]">★★★★★</p>
                    </div>
                </div>
                
                <p className="text-[14px] text-[#95959F] mt-2 ml-17">{review.text}</p>

              </div>
            ))}
          </div>
        </div>
        </div>
        
      </main>
    </div>
  );
};

export default CourseDetail;