/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMutation, useQuery, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {  createOnlineCourse, createPhysicalCourse, createWorkmanOnboarding, fetchConversationMessages, fetchConversations, fetchCourseById, fetchCourses, fetchJobById, fetchJobs, fetchMyCourses, fetchServices, fetchUser, sendMessage, signIn, signUp } from "./api";
import {   CourseDetail, CoursesResponse, createUser, Job_Query_Keys, JobFromAPI, JobsResponse, LoginCredentials, LoginResponse, SendMessageRequest, Service, userProfile, WorkmanOnboardingPayload, WorkmanOnboardingResponse, } from "./type";
import { useAuth } from "../context/AuthContext";


//======== sign up call=========
export const useCreateAccount = () => {
  return useMutation({
    mutationFn: async (data: createUser) => signUp(data),
    onSuccess: () => {
      // Show success toast notification
      toast.success(`Account created successfully`);
    },
    onError: (error: any) => {
      // Show error toast notification
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        // If the server returned a specific message, display it
        toast.error(`Error: ${error.response.data.message}`);
      } else {
        // If the error does not have a response message, display the generic error message
        toast.error(`Error occurred: ${error.message}`);
      }
    },
  });
};

// ======= Signin call ========
export const useSigninAccount = () => {
  return useMutation<LoginResponse, Error, LoginCredentials>({
    mutationFn: signIn,
    onSuccess: (data) => {
      toast.success(data.message || "Login successful!");
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || "Invalid email or password";
      toast.error(message);
    },
  });
};

//====== fetch user details ================
export const useUser = () => {
  const { token } = useAuth();

  return useQuery<userProfile, Error>({
    queryKey: ["user-profile"],
    queryFn: () => fetchUser(token as string),
    enabled: !!token,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

//======== workers onboarding ===========
export const useWorkmanOnboarding = () => {
  return useMutation<WorkmanOnboardingResponse, Error, WorkmanOnboardingPayload>({
    mutationFn: createWorkmanOnboarding,
    onSuccess: (data) => {
      toast.success(data.message || "Onboarding completed!");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Onboarding failed");
    },
  });
};


// ============ fetch all job ===========
export const useJobs = (
  filters: {
    serviceId?: string;
    customServiceName?: string;
    keyword?: string;
  } = {}
) => {
  const { token } = useAuth();

  return useQuery<JobsResponse["data"], Error>({
    queryKey: ["jobs", filters],
    queryFn: () => fetchJobs(token as string, filters),
    enabled: !!token,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// ======= fetch available service ========
export const useServices = () => {
  const { token } = useAuth();

  return useQuery<Service[], Error>({
    queryKey: ["services"],
    queryFn: () => fetchServices(token as string),
    enabled: !!token,
    staleTime: 1000 * 60 * 30, // 30 minutes (services rarely change)
  });
};


//========= Fetch job by Id =========
export const useJobId = (id: string, token: string) => {
  return useQuery<JobFromAPI, Error>({ // Added type for useQuery
    queryKey: [Job_Query_Keys.Job_ID, id],
    queryFn: () => fetchJobById(id, token),
    enabled: !!id && !!token, // Ensure it only runs if both are available
  });
};



// Inside app/actions/chat.ts or reactQuery.ts
export const useSendMessage = () => {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  return useMutation({
    mutationFn: (data: SendMessageRequest) => sendMessage(data, token as string),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
  });
};

export const useConversations = () => {
  const { token } = useAuth();
  return useQuery({
    queryKey: ["conversations"],
    queryFn: () => fetchConversations(token as string),
    enabled: !!token,
  });
};

export const useConversationMessages = (receiverId: string | null) => {
  const { token } = useAuth();
  return useQuery({
    queryKey: ["messages", receiverId],
    queryFn: () => fetchConversationMessages(receiverId!, token as string),
    enabled: !!token && !!receiverId,
  });
};



//====== create online course ======
export const useCreateOnlineCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOnlineCourse,
    onSuccess: (data) => {
      toast.success("Online course created successfully!");
      // Optionally invalidate/refetch courses list
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      queryClient.invalidateQueries({ queryKey: ["instructor-courses"] });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to create online course";
      toast.error(message);
    },
  });
};



//====== create physical course ======
export const useCreatePhysicalCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPhysicalCourse,
    onSuccess: (data) => {
      toast.success("Online course created successfully!");
      // Optionally invalidate/refetch courses list
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      queryClient.invalidateQueries({ queryKey: ["instructor-courses"] });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to create online course";
      toast.error(message);
    },
  });
};



// =========Get all courses ========
export const useCourses = (
  filters: {
    category?: string;
    level?: string;
    classType?: string;
    workmanId?: string;
    keyword?: string;
    minPrice?: number;
    maxPrice?: number;
    isActive?: boolean;
  } = {}
) => {
  const { token } = useAuth();

  return useQuery<CoursesResponse["data"], Error>({
    queryKey: ["courses", filters],
    queryFn: () => fetchCourses(token as string, filters),
    enabled: !!token,
    staleTime: 1000 * 60 * 5,
  });
};


// =========Get courses details ========
export const useCourseById = (courseId: string) => {
  const { token } = useAuth();

  return useQuery<CourseDetail, Error>({
    queryKey: ["course", courseId],
    queryFn: () => fetchCourseById(token as string, courseId),
    enabled: !!token && !!courseId,
    staleTime: 1000 * 60 * 5,
  });
};


// =========Get my courses ========
export const useMyCourses = (
  filters: {
    category?: string;
    level?: string;
    classType?: string;
    workmanId?: string;
    keyword?: string;
    minPrice?: number;
    maxPrice?: number;
    isActive?: boolean;
  } = {}
) => {
  const { token } = useAuth();

  return useQuery<CoursesResponse["data"], Error>({
    queryKey: ["my-courses", filters],
    queryFn: () => fetchMyCourses(token as string, filters),
    enabled: !!token,
    staleTime: 1000 * 60 * 5,
  });
};