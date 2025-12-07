import axios from "axios";
import {  createUser,  LoginCredentials, LoginResponse, userProfile, WorkmanOnboardingPayload, WorkmanOnboardingResponse, } from "./type";


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