import axios from "axios";
import {  ConversationMessagesResponse, ConversationsResponse, CourseDetail, CourseDetailResponse, CoursesResponse, CreateOnlineCoursePayload, CreatePhysicalCoursePayload, createUser,  EnrolledCoursesResponse,  initiatePaymentPayload,  JobApplication,  JobFromAPI,  JobsResponse,  LoginCredentials, LoginResponse, NotificationPreferencesType, SendMessageRequest, SendMessageResponse, Service, subscribePayload, SubscriptionPaymentPayload, UserResponse, verifyBankFlutterwaveType, VerifyKycType, verifyPaymentType, WorkmanOnboardingPayload, WorkmanOnboardingResponse, } from "./type";


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
export const fetchUser = async (token: string): Promise<UserResponse> => {
  const response = await axios.get(`${apiUrl}/api/v1/users/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  // IMPORTANT: We return the WHOLE body so userData.data.user works in your page
  return response.data; 
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

// =========Get my enrolled courses ========
export const fetchMyEnrolledCourses = async (
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
): Promise<EnrolledCoursesResponse["data"]> => {
  if (!token) throw new Error("Authentication required");

  const response = await axios.get(`${apiUrl}/api/v1/courses/enrollments/my-enrollments`, {
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data;
};




//=====fetching payment list ========
export const fetchPaymentList = async (token: string): Promise<any> => {
  const response = await axios.get(`${apiUrl}/api/v1/payments/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data; 
};

//=====fetching bank list ========
export const fetchBankList = async (token: string): Promise<any> => {
  const response = await axios.get(`${apiUrl}/api/v1/payments/banks?`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data; 
};

//======== initiate payment ================
export const initiatePayment = async (data: initiatePaymentPayload, token: string | null) => {
  const res = await axios.post(`${apiUrl}/api/v1/payments/initialize`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return res.data;
};

//======== verify payment ================
export const verifyPayment = async (data: verifyPaymentType, token: string | null) => {
  const res = await axios.post(`${apiUrl}/api/v1/payments/initialize`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return res.data;
};

//======== verify bank ================
export const verifyBank = async (data: verifyBankFlutterwaveType, token: string | null) => {
  const res = await axios.post(`${apiUrl}/api/v1/payments/initialize`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return res.data;
};

//======== initiate sucscription ================
export const initiateSubscription = async (data: SubscriptionPaymentPayload, token: string | null) => {
  const res = await axios.post(`${apiUrl}/api/v1/payments/initialize`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return res.data;
};


//=====fetching subscription list ========
export const fetchSubscriptionList = async (token: string): Promise<any> => {
  const response = await axios.get(`${apiUrl}/api/v1/subscriptions/plans/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data; 
};

//=====fetching my subscription list ========
export const fetchMyubscriptionList = async (token: string) => {
  const response = await axios.get(`${apiUrl}/api/v1/subscriptions/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = response.data.data;

  if (!data) return [];

  return [
    {
      ...data.plan,          // normalize into same shape as plans list
      subscription: {
        id: data.id,
        status: data.status,
        startDate: data.startDate,
        endDate: data.endDate,
        nextBillingDate: data.nextBillingDate,
        autoRenew: data.autoRenew,
      },
    },
  ];
};

//======== Subscribing to plan ================
export const planSubcription = async (data: subscribePayload, token: string | null) => {
  const res = await axios.post(`${apiUrl}/api/v1/payments/initialize`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return res.data;
};

//======== cancel subscription ================
export const cancelSubcription = async (token: string | null) => {
  const res = await axios.post(`${apiUrl}/api/v1/subscriptions/cancel`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return res.data;
};

// ======== Verify KYC ==========
export const verifyKyc = async (
  data: VerifyKycType,
  token: string | null
) => {
  const res = await axios.post(
    `${apiUrl}/api/v1/users/verify/kyc`,
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

export const updateUserProfile = async (
  data: any,
  token: string | null
) => {
  if (!token) throw new Error("Authentication token not found");

  const res = await axios.put(
    `${apiUrl}/api/v1/users/profile`,
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

//=====fetching categoty ========
export const fetchCategory = async (token: string): Promise<any> => {
  const response = await axios.get(`${apiUrl}/api/v1/admin/lookups/categories`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data; 
};


// ======== Update Notification call =========
export const updateNotificationPreferences = async (
  preferences: Partial<NotificationPreferencesType>, // Partial allows sending only changed fields
  token: string | null
) => {
  if (!token) {
    throw new Error('Authentication token is required');
  }

  const response = await axios.patch(
    `${apiUrl}/api/v1/notifications/preferences`,
    preferences,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data;
};


// ========Fetch Notification preference =========
export const fetchNotificationPreferences = async (
  token: string
): Promise<NotificationPreferencesType> => {
  if (!token) {
    throw new Error('Authentication required');
  }

  const response = await axios.get(
    `${apiUrl}/api/v1/notifications/preferences`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data as NotificationPreferencesType;
};

// =========== reset Notification ===========
export const resetNotificationPreferences = async (token: string | null) => {
  if (!token) {
    throw new Error("Authentication required");
  }

  const response = await axios.post(
    `${apiUrl}/api/v1/notifications/preferences/reset`,
    {}, // ← no request body needed
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

//===========fetching my job list ==============
export const fetchMyJob = async (token: string): Promise<JobFromAPI[]> => {
  if (!token) throw new Error("Authentication required");

  const response = await axios.get(`${apiUrl}//api/v1/applications/my-applications`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data.jobs as JobFromAPI[];
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


//===========fetching my job list ==============
export const fetchMyApplication = async (token: string): Promise<JobApplication[]> => {
  if (!token) throw new Error("Authentication required");

  const response = await axios.get(`${apiUrl}/api/v1/applications/my-applications`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data.applications as JobApplication[];
};

//===========fetching job by id ==============
export const fetchApplicationById = async (id: string, token: string) => {
  if (!token) throw new Error("Authentication token missing");

  const response = await axios.get(`${apiUrl}/api/v1/jobs/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data.job as JobFromAPI;
};
