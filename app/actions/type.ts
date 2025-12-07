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
