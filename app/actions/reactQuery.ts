/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMutation, useQuery, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {  createWorkmanOnboarding, fetchUser, signIn, signUp } from "./api";
import {   createUser, LoginCredentials, LoginResponse, userProfile, WorkmanOnboardingPayload, WorkmanOnboardingResponse, } from "./type";
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


//======== onboard workers ========
// export const useWorkmanOnboarding = () => {
//   return useMutation<WorkmanOnboardingResponse, Error, WorkmanOnboardingPayload>({
//     mutationFn: createWorkmanOnboarding,
//     onSuccess: (data) => {
//       toast.success(data.message || "Onboarding completed!");
//     },
//     onError: (error: any) => {
//       toast.error(error?.response?.data?.message || "Onboarding failed");
//     },
//   });
// };


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