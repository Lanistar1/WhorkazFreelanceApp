import axios from "axios";
import {  ConversationMessagesResponse, ConversationsResponse, CourseDetail, CourseDetailResponse, CoursesResponse, CreateOnlineCoursePayload, CreatePhysicalCoursePayload, createUser,  JobFromAPI,  JobsResponse,  LoginCredentials, LoginResponse, SendMessageRequest, SendMessageResponse, Service, userProfile, WorkmanOnboardingPayload, WorkmanOnboardingResponse, } from "./type";


const apiUrl = process.env.NEXT_PUBLIC_API_URL;
console.log(apiUrl);

//======== sign up call=========
export const signUp = async (data: createUser) => {
  const res = await axios.post(`${apiUrl}/api/v1/auth/signup`, data);
  return res.data;
};

// ======= Signin call ========
export const signIn = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const res = await axios.post(`${apiUrl}/api/v1/auth/login`, credentials);
  return res.data;
};


//=====fetching user details ========
export const fetchUser = async (token: string): Promise<userProfile> => {
  const response = await axios.get(`${apiUrl}/api/v1/users/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data; // { user: { ... } }
};

// ========== onboard workers ========
export const createWorkmanOnboarding = async (data: WorkmanOnboardingPayload) => {
  const token = localStorage.getItem("authToken");
  if (!token) throw new Error("Authentication required");

  const res = await axios.post(`${apiUrl}/api/v1/workman/onboarding`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return res.data as WorkmanOnboardingResponse;
};

//=========== upload file for profile ==============
export const uploadSingleFile = async (file: File): Promise<string> => {
  const token = localStorage.getItem("authToken");

  const formData = new FormData();
  formData.append("file", file);

  const res = await axios.post(`${apiUrl}/api/v1/upload/single`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // This matches your actual response
  return res.data.data.url;   // ← This is the correct path
};


// ========== fetchJobs ==========
export const fetchJobs = async (
  token: string,
  params?: {
    serviceId?: string;
    customServiceName?: string;
    keyword?: string;
  }
): Promise<JobsResponse["data"]> => {
  if (!token) throw new Error("Authentication required");

  const response = await axios.get(`${apiUrl}/api/v1/jobs`, {
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data; // { jobs: [...], count: 8 }
};


// fetch available service==========
export const fetchServices = async (token: string): Promise<Service[]> => {
  if (!token) throw new Error("Authentication required");

  const response = await axios.get(`${apiUrl}/api/v1/workman/services`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data.services as Service[];
};


//===========fetching job by id ==============
export const fetchJobById = async (id: string, token: string) => {
  if (!token) throw new Error("Authentication token missing");

  const response = await axios.get(`${apiUrl}/api/v1/jobs/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data.job as JobFromAPI;
};



//========= Send message =======
export const sendMessage = async (data: SendMessageRequest, token: string) => {
  const res = await axios.post(`${apiUrl}/api/v1/chat/text`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data as SendMessageResponse;
};

//======== Get all conversations =========
export const fetchConversations = async (token: string) => {
  const res = await axios.get(`${apiUrl}/api/v1/chat/conversations`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data as ConversationsResponse;
};

// ========== Get messages with one user ========
export const fetchConversationMessages = async (receiverId: string, token: string) => {
  const res = await axios.get(`${apiUrl}/api/v1/chat/conversation/${receiverId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data as ConversationMessagesResponse;
};



//====== create online course ======
export const createOnlineCourse = async (data: CreateOnlineCoursePayload) => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    throw new Error("Authentication required");
  }

  const res = await axios.post(
    `${apiUrl}/api/v1/courses`, 
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return res.data;
};



//====== create physical course ======
export const createPhysicalCourse = async (data: CreatePhysicalCoursePayload) => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    throw new Error("Authentication required");
  }

  const res = await axios.post(
    `${apiUrl}/api/v1/courses`, 
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return res.data;
};


// =========Get all courses ========
export const fetchCourses = async (
  token: string,
  params?: {
    category?: string;
    level?: string;
    classType?: string;
    workmanId?: string;
    keyword?: string;
    minPrice?: number;
    maxPrice?: number;
    isActive?: boolean;
  }
): Promise<CoursesResponse["data"]> => {
  if (!token) throw new Error("Authentication required");

  const response = await axios.get(`${apiUrl}/api/v1/courses`, {
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data;
};


// =========Get courses details ========
export const fetchCourseById = async (
  token: string,
  courseId: string
): Promise<CourseDetail> => {
  if (!token) throw new Error("Authentication required");
  if (!courseId) throw new Error("Course ID is required");

  const response = await axios.get<CourseDetailResponse>(
    `${apiUrl}/api/v1/courses/${courseId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return response.data.data.course; // ← .course, not .data
};


// =========Get my courses ========
export const fetchMyCourses = async (
  token: string,
  params?: {
    category?: string;
    level?: string;
    classType?: string;
    workmanId?: string;
    keyword?: string;
    minPrice?: number;
    maxPrice?: number;
    isActive?: boolean;
  }
): Promise<CoursesResponse["data"]> => {
  if (!token) throw new Error("Authentication required");

  const response = await axios.get(`${apiUrl}/api/v1/courses/my-courses`, {
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data;
};