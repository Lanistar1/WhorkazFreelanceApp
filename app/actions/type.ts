/* eslint-disable @typescript-eslint/no-explicit-any */
// types/auth.ts or anywhere you keep types

export type LoginCredentials = {
  email: string;
  password: string;
};

export type UserFromAPI = {
  email: string;
  userType: "workman";
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  kycVerificationStatus: string | null;
  status?: string;
};

export type LoginResponse = {
  success: boolean;
  message: string;
  data: {
    user: UserFromAPI;
    token: string;
  };
};

export type createUser = {
  email: string;
  password: string;
  userType: string;
};


//====== user profile type =============
// types/user.ts
export interface NotificationPreferences {
  payments: { push: boolean; email: boolean };
  newMessages: { push: boolean; email: boolean };
  announcements: { push: boolean; email: boolean };
  accountActivity: { push: boolean; email: boolean };
  jobStatusUpdates: { push: boolean; email: boolean };
}

export interface ClientProfile {
  id: string;
  clientType: "individual" | "business";
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string | null;
  companyName: string | null;
  industry: string | null;
  photo: string | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  id: string;
  email: string;
  phoneNumber: string | null;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  profilePic: string | null;
  userType: "client" | "workman";
  status: string;
  notificationPreferences: NotificationPreferences;
  createdAt: string;
  client: ClientProfile | null;
  workman: any | null;
}

export type userProfile = {
  user: UserProfile;
};


//==========start of workers onboarding requestBody type ============
export interface Service {
  serviceId: string | null;
  customServiceName: string;
}

export interface Certification {
  name: string;
  year: number;
}

export interface Experience {
  yearsOfExperience: number;
  certifications: Certification[];
  serviceDescription: string;
  languages: string[];
}

export interface PastWork {
  projectTitle: string;
  projectDescription: string;
  skillsUsed: string[];
  media: string[];
}

export interface WorkmanOnboardingPayload {
  services: Service[];
  experience: Experience;
  pastWorks: PastWork[];
}
//========== End of workers onboarding requestBody type ============


//==========start of workers onboarding response type ============

export interface NotificationPreferences {
  payments: { push: boolean; email: boolean };
  newMessages: { push: boolean; email: boolean };
  announcements: { push: boolean; email: boolean };
  accountActivity: { push: boolean; email: boolean };
  jobStatusUpdates: { push: boolean; email: boolean };
}

export interface User {
  id: string;
  email: string;
  password: string;
  phoneNumber: string | null;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  kycVerificationStatus: string | null;
  kycType: string | null;
  profilePic: string | null;
  address: string | null;
  emailVerificationOtp: string | null;
  emailVerificationOtpExpiresAt: string | null;
  phoneVerificationOtp: string | null;
  phoneVerificationOtpExpiresAt: string | null;
  userType: string;
  status: string;
  notificationPreferences: NotificationPreferences;
  createdAt: string;
  updatedAt: string;
  client: any | null;
  workman: any | null;
}

export interface WorkmanService {
  userId: string;
  serviceId: string | null;
  customServiceName: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface WorkmanExperience {
  userId: string;
  yearsOfExperience: number;
  certifications: Certification[];
  serviceDescription: string;
  languages: string[];
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface WorkmanPastWork {
  userId: string;
  projectTitle: string;
  projectDescription: string;
  skillsUsed: string[];
  media: string[];
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface WorkmanOnboardingResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    services: WorkmanService[];
    experience: WorkmanExperience;
    pastWorks: WorkmanPastWork[];
  };
}
//========== End of workers onboarding response type ============


//=======get all jobs type =======
export interface Client {
  id: string;
  email: string;
  password: string;
  phoneNumber: string | null;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  kycVerificationStatus: string | null;
  kycType: string | null;
  profilePic: string | null;
  address: string | null;
  emailVerificationOtp: string | null;
  emailVerificationOtpExpiresAt: string | null;
  phoneVerificationOtp: string | null;
  phoneVerificationOtpExpiresAt: string | null;
  userType: string;
  status: string;
  notificationPreferences: {
    payments: { push: boolean; email: boolean };
    newMessages: { push: boolean; email: boolean };
    announcements: { push: boolean; email: boolean };
    accountActivity: { push: boolean; email: boolean };
    jobStatusUpdates: { push: boolean; email: boolean };
  };
  createdAt: string;
  updatedAt: string;
}

export interface Milestone {
  id: string;
  location: string;
  workTitle: string;
  description: string;
  skills: string[];
  hireNumber: number;
  photos: string[];
  startOfProject: string;
  time: string;
  numberOfDuration: number;
  durationUnit: string;
  endDate: string | null;
  minimumBudget: string;
  maximumBudget: string;
  markAsEmergency: boolean;
  jobId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Job {
  id: string;
  jobType: string;
  status: string;
  clientId: string;
  createdAt: string;
  updatedAt: string;
  client: Client;
  milestones: Milestone[];
  applications: any[];
}

export interface JobsResponse {
  success: boolean;
  message: string;
  data: {
    jobs: Job[];
    count: number;
  };
}


//======= get available service type=======
export interface Service {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ServicesResponse {
  success: boolean;
  message: string;
  data: {
    services: Service[];
  };
}


//======= get job by Id ============
// types/job.ts
export interface Milestone {
  id: string;
  location: string;
  workTitle: string;
  description: string;
  skills: string[];
  hireNumber: number;
  photos: string[];
  startOfProject: string;
  time: string;
  numberOfDuration: number;
  durationUnit: string;
  endDate: string | null;
  minimumBudget: string;
  maximumBudget: string;
  markAsEmergency: boolean;
}

export interface JobFromAPI {
  id: string;
  jobType: "milestone";
  status: "open" | "in_progress" | "completed";
  createdAt: string;
  milestones: Milestone[];
  applications: any[];
};

//========== job query for get job by id =====================
export enum Job_Query_Keys {
  Job_ID = "id",
  My_Jobs = "My_Jobs",
}




//======== messaging type ========
// Send Text Message
export interface SendMessageRequest {
  receiverId: string;
  text: string;
  jobId?: string; // optional
}

export interface SendMessageResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    senderId: string;
    receiverId: string;
    text: string;
    jobId: string | null;
    createdAt: string;
  };
}

// Message from API
export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  jobId: string | null;
  createdAt: string;
  sender?: {
    id: string;
    email: string;
    profilePic: string | null;
  };
}

// Conversation with one user
export interface Conversation {
  id: string;
  participant: {
    id: string;
    email: string;
    profilePic: string | null;
  };
  lastMessage: {
    text: string;
    createdAt: string;
  };
  unreadCount: number;
}

// All conversations list
export interface ConversationsResponse {
  success: boolean;
  message: string;
  data: {
    conversations: Conversation[];
  };
}

// Single conversation messages
export interface ConversationMessagesResponse {
  success: boolean;
  message: string;
  data: {
    messages: Message[];
  };
}



// =======Online course request body type=======
export type CreateOnlineCoursePayload = {
  title: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  price: number;
  estimatedDuration: string;
  image: string;
  images?: string[];
  courseContent: string;
  description: string;
  whatYouWillLearn: string;
  overview: string;
  classType: 'online' | 'in-person' | 'hybrid';
  startDate: string; // ISO 8601 format, e.g., "2024-02-01T00:00:00Z"
  endDate?: string;  // optional for self-paced courses
  courseLink?: string;
  coursePlatform?: string;
};


// =======Physical course request body type=======
export type CreatePhysicalCoursePayload = {
  title: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  price: number;
  estimatedDuration: string;
  image: string;
  description: string;
  classType: 'physical';
  startDate: string; // ISO 8601 format, e.g., "2024-02-01T00:00:00Z"
  endDate?: string;  // optional for flexible scheduling
  classPlace: string; // name of the venue
  locationDescription: string; // full address and landmarks
};


// ========== fetch all course type ===============
export interface Course {
  id: string;
  title: string;
  category: string;
  level: string; // e.g., 'beginner', 'intermediate', 'advanced', 'expert'
  price: string; // e.g., '₦25,000' or number if preferred
  estimatedDuration: string; // e.g., '45mins'
  image: string;
  averageRating: number;
  totalRatings: number;
  totalEnrollments: number;
  classType: string; // e.g., 'online' or 'physical'
  isActive: boolean;
  createdAt: string;
  // Add more fields if discovered later, e.g., description, workman, etc.
}

export interface CoursesResponse {
  success: boolean;
  message: string;
  data: {
    courses: Course[];
    count: number;
  };
}



// ========= course details type =========
export interface Workman {
  id: string;
  email: string;
  // ... other fields as needed (you can omit password etc. if not used)
  firstName: string | null;
  lastName: string | null;
  profilePic: string | null;
  bio: string | null;
  // ... add more if you need them later
}

export interface CourseDetail {
  id: string;
  title: string;
  category: string;
  level: string;
  price: string;              // e.g. "86787.00"
  estimatedDuration: string;  // e.g. "3 months"
  image: string;
  images: string[] | null;
  courseContent: string | null;
  description: string | null;
  whatYouWillLearn: string | null;  // ← string, not array
  overview: string | null;
  classType: "online" | "physical";
  startDate: string;
  endDate: string;
  courseLink: string | null;
  coursePlatform: string | null;
  classPlace: string | null;
  locationDescription: string | null;
  workmanId: string;
  averageRating: string;      // ← string (e.g. "0.00")
  totalRatings: number;
  totalEnrollments: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  workman: Workman;
  ratings: any[];             // empty array in your response
  enrollments: any[];         // empty array in your response
}

export interface CourseDetailResponse {
  success: boolean;
  message: string;
  data: {
    course: CourseDetail;
  };
}