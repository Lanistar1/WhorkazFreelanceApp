/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMutation, useQuery, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {  cancelSubcription, createOnlineCourse, createPhysicalCourse, createWorkmanOnboarding, deleteNotificationById, fetchApplicationById, fetchBankList, fetchCategory, fetchConversationMessages, fetchConversations, fetchCourseById, fetchCourses, fetchJobById, fetchJobs, fetchMyApplication, fetchMyCourses, fetchMyEnrolledCourses, fetchMyJob, fetchMyubscriptionList, fetchNotificationDetail, fetchNotificationPreferences, fetchNotifications, fetchPaymentList, fetchServices, fetchSubscriptionList, fetchUser, initiatePayment, initiateSubscription, markNotificationAsRead, planSubcription, resetNotificationPreferences, sendMessage, signIn, signUp, updateNotificationPreferences, updateUserProfile, verifyBank, verifyKyc, verifyPayment } from "./api";
import {   Application_Query_Keys, CourseDetail, CoursesResponse, createUser, EnrolledCoursesResponse, initiatePaymentPayload, Job_Query_Keys, JobApplication, JobFromAPI, JobsResponse, LoginCredentials, LoginResponse, NotificationPreferencesType, NotificationType, SendMessageRequest, Service, subscribePayload, SubscriptionPaymentPayload, UserResponse, verifyBankFlutterwaveType, VerifyKycType, verifyPaymentType, WorkmanOnboardingPayload, WorkmanOnboardingResponse, } from "./type";
import { useAuth } from "../context/AuthContext";
import axios from "axios";


const apiUrl = process.env.NEXT_PUBLIC_API_URL;
console.log(apiUrl);

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
  return useQuery<UserResponse, Error>({
    queryKey: ["user-profile"],
    queryFn: () => fetchUser(token as string),
    enabled: !!token,
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

// =========Get my enrolled courses ========
export const useMyEnrolledCourses = (
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

  return useQuery<EnrolledCoursesResponse["data"], Error>({
    queryKey: ["enrolled-courses", filters],
    queryFn: () => fetchMyEnrolledCourses(token as string, filters),
    enabled: !!token,
    staleTime: 1000 * 60 * 5,
  });
};



//=====fetching payment list ========
// export const useGetPaymentList = (
//     filters: {
//     status?: string;
//     period?: string;
//     groupBy?: string;
//   } = {}
// ) => {
//   const { token } = useAuth();

//   return useQuery<any, Error>({
//     queryKey: ["user-profile", filters],
//     queryFn: () => fetchPaymentList(token as string),
//     enabled: !!token,
//     staleTime: 5 * 60 * 1000, // 5 minutes
//   });
// };

export const useGetPaymentList = (
  filters: {
    status?: string;
    contextType?: string;
    reference?: string;
    payerId?: string;
    from?: string;
    to?: string;
    groupBy?: string;
  } = {}
) => {
  const { token } = useAuth();

  return useQuery<any, Error>({
    queryKey: ["payments", filters],
    queryFn: () => fetchPaymentList(token as string, filters),
    enabled: !!token,
    staleTime: 5 * 60 * 1000,
  });
};

//=====fetching bank list ========
export const useGetBankList = (
    filters: {
    status?: string;
    period?: string;
    groupBy?: string;
  } = {}
) => {
  const { token } = useAuth();

  return useQuery<any, Error>({
    queryKey: ["user-profile", filters],
    queryFn: () => fetchBankList(token as string),
    enabled: !!token,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};


//======== initiate payment ================
export const useInitiatePayment= () => {
  const { token } = useAuth();
  return useMutation({
    mutationFn: async ({ data }: { data: initiatePaymentPayload }) =>
      initiatePayment(data, token),
    onSuccess: () => {
      toast.success("Payment Initiated successfully");
      // Optional: invalidate courses list query to refresh
      // queryClient.invalidateQueries({ queryKey: ["courses", "list"] });
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Error initiating payment"
      );
    },
  });
};


//======== verify payment ================
export const useVerifyPayment= () => {
  const { token } = useAuth();
  return useMutation({
    mutationFn: async ({ data }: { data: verifyPaymentType }) =>
      verifyPayment(data, token),
    onSuccess: () => {
      toast.success("Payment verified successfully");
      // Optional: invalidate courses list query to refresh
      // queryClient.invalidateQueries({ queryKey: ["courses", "list"] });
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Error verifying payment"
      );
    },
  });
};


//======== verify payment ================
export const useVerifyBank= () => {
  const { token } = useAuth();
  return useMutation({
    mutationFn: async ({ data }: { data: verifyBankFlutterwaveType }) =>
      verifyBank(data, token),
    onSuccess: () => {
      toast.success("Payment verified successfully");
      // Optional: invalidate courses list query to refresh
      // queryClient.invalidateQueries({ queryKey: ["courses", "list"] });
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Error verifying payment"
      );
    },
  });
};


//======== verify payment ================
export const useInitiateSubscription= () => {
  const { token } = useAuth();
  return useMutation({
    mutationFn: async ({ data }: { data: SubscriptionPaymentPayload }) =>
      initiateSubscription(data, token),
    onSuccess: (res) => {
      toast.success("Redirecting to payment...");

      const paymentUrl = res?.data?.authorizationUrl;

      if (paymentUrl) {
        window.location.href = paymentUrl;
      } else {
        toast.error("Payment link not received");
      }
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Error initiating subscription"
      );
    },
  });
};

//=====fetching subscription list ========
export const useGetSubscriptionList = (
    filters: {
    status?: string;
    period?: string;
    groupBy?: string;
  } = {}
) => {
  const { token } = useAuth();

  return useQuery<any, Error>({
    queryKey: ["subscription-plans", filters],
    queryFn: () => fetchSubscriptionList(token as string),
    enabled: !!token,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};


//=====fetching My subscription list ========
export const useGetMySubscriptionList = (
    filters: {
    status?: string;
    period?: string;
    groupBy?: string;
  } = {}
) => {
  const { token } = useAuth();

  return useQuery<any, Error>({
    queryKey: ["my-subscriptions", filters],
    queryFn: () => fetchMyubscriptionList(token as string),
    enabled: !!token,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

//======== Subscribing to plan ================
export const useSubscribeToPlan= () => {
  const { token } = useAuth();
  return useMutation({
    mutationFn: async ({ data }: { data: subscribePayload }) =>
      planSubcription(data, token),
    onSuccess: () => {
      toast.success("Subscription successfully");
      // Optional: invalidate courses list query to refresh
      // queryClient.invalidateQueries({ queryKey: ["courses", "list"] });
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Error Subcribong to a plan"
      );
    },
  });
};


//======== Subscribing to plan ================
export const useCanSubscription= () => {
  const { token } = useAuth();
  return useMutation({
    mutationFn: async ({ data }: { data: verifyBankFlutterwaveType }) =>
      cancelSubcription( token),
    onSuccess: () => {
      toast.success("Subscription cancelled successfully");
      // Optional: invalidate courses list query to refresh
      // queryClient.invalidateQueries({ queryKey: ["courses", "list"] });
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Error cancelling plan"
      );
    },
  });
};

//======== verify KYC ==========
export const useVerifyKyc = () => {
  const { token } = useAuth();

  return useMutation({
    mutationFn: (data: VerifyKycType) =>
      verifyKyc(data, token),

    onSuccess: () => {
      toast.success("KYC submitted successfully");
    },

    onError: (error: any) => {
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message || "KYC verification failed");
      }
    },
  });
};


export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => {
      // Getting token directly inside the function ensures it's fresh
      const token = localStorage.getItem("authToken");
      return updateUserProfile(data, token);
    },

    onSuccess: () => {
      // Invalidate the profile query so the UI updates globally
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      toast.success("Profile updated successfully");
    },

    onError: (error: any) => {
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message || "Failed to update profile");
      }
    },
  });
};

//=====fetching category ========
export const useGetCategory = () => {
  const { token } = useAuth();

  return useQuery<any, Error>({
    queryKey: ["user-category"],
    queryFn: () => fetchCategory(token as string),
    enabled: !!token,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};


// ======== Update Notification call =========
export const useUpdateNotificationPreferences = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (preferences: Partial<NotificationPreferencesType>) =>
      updateNotificationPreferences(preferences, token),

    onSuccess: (data) => {
      // Optional: invalidate queries that might depend on this data
      queryClient.invalidateQueries({ queryKey: ['notification-preferences'] });

      toast.success('Notification preferences updated successfully');
    },

    onError: (error: any) => {
      let errorMessage = 'Failed to update notification preferences';

      if (axios.isAxiosError(error) && error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast.error(`Error: ${errorMessage}`);
    },

    onMutate: async (newPreferences) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ['notification-preferences'] });

      // Snapshot the previous value
      const previousPreferences = queryClient.getQueryData<NotificationPreferencesType>([
        'notification-preferences',
      ]);

      // Optimistically update
      queryClient.setQueryData(['notification-preferences'], (old: any) => ({
        ...old,
        ...newPreferences,
      }));

      // Return context with previous value for rollback on error
      return { previousPreferences };
    },

    // If the mutation fails, roll back to the previous value
    onSettled: (data, error, newPreferences, context) => {
      if (error && context?.previousPreferences) {
        queryClient.setQueryData(
          ['notification-preferences'],
          context.previousPreferences
        );
      }
    },
  });
};

// ========Fetch Notification preference =========
export const useNotificationPreferences = () => {
  const { token } = useAuth();

  return useQuery<NotificationPreferencesType, Error>({
    queryKey: ['notification-preferences'],
    queryFn: () => fetchNotificationPreferences(token as string),
    enabled: !!token, // only run when we have a token
    staleTime: 1000 * 60 * 5, // 5 minutes - preferences don't change very often
    gcTime: 1000 * 60 * 30,   // 30 minutes cache
    retry: 1,                 // less aggressive retry than default
  });
};


// =========== reset Notification ===========
export const useResetNotificationPreferences = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => resetNotificationPreferences(token),

    onSuccess: () => {
      // Invalidate the preferences query so it refetches fresh (reset) values
      queryClient.invalidateQueries({ queryKey: ['notification-preferences'] });

      toast.success("Notification preferences reset to default successfully");
    },

    onError: (error: any) => {
      let errorMessage = "Failed to reset notification preferences";

      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast.error(`Error: ${errorMessage}`);
    },
  });
};

//========= Fetch my jobs =========
export const useMyJob = () => {
  const { token } = useAuth();
  console.log(token);

  return useQuery<JobFromAPI[], Error>({
    queryKey: ["my-jobs"],
    queryFn: () => fetchMyJob(token as string),
    placeholderData: keepPreviousData,
    enabled: !!token,
    staleTime: 60_000, // 1 minute
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

//========= Fetch my jobs =========
export const useMyApplication = () => {
  const { token } = useAuth();
  console.log(token);

  return useQuery<JobApplication[], Error>({
    queryKey: ["my-jobs"],
    queryFn: () => fetchMyApplication(token as string),
    placeholderData: keepPreviousData,
    enabled: !!token,
    staleTime: 60_000, // 1 minute
  });
};


//========= Fetch job by Id =========
export const useApplicationId = (id: string, token: string) => {
  return useQuery<JobFromAPI, Error>({ // Added type for useQuery
    queryKey: [Application_Query_Keys.Application_ID, id],
    queryFn: () => fetchApplicationById(id, token),
    enabled: !!id && !!token, // Ensure it only runs if both are available
  });
};


// ================= HOOK: GET NOTIFICATIONS =================
export const useNotifications = () => {
  const { token } = useAuth();

  return useQuery<NotificationType[], Error>({
    queryKey: ["notifications"],
    queryFn: () => fetchNotifications(token as string),
    enabled: !!token,
    staleTime: 1000 * 30,
  });
};

// ================= HOOK: GET NOTIFICATION DETAIL =================
export const useNotificationDetail = (id: string | null) => {
  const { token } = useAuth();

  return useQuery<NotificationType, Error>({
    queryKey: ["notification-detail", id],
    queryFn: () => fetchNotificationDetail(id as string, token as string),
    enabled: !!token && !!id,
  });
};

// ================= HOOK: MARK AS READ =================
export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  return useMutation({
    mutationFn: (id: string) => markNotificationAsRead(id, token as string),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["notification-detail"] });
    },

    onError: (error: any) => {
      toast.error(error?.message || "Failed to mark notification as read");
    },
  });
};

// ================= HOOK: DELETE NOTIFICATION =================
export const useDeleteNotification = () => {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  return useMutation<void, Error, string>({
    mutationFn: (id: string) => deleteNotificationById(id, token as string),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      toast.success("Notification deleted.");
    },

    onError: (error) => {
      toast.error(`Error deleting notification: ${error.message}`);
    },
  });
};