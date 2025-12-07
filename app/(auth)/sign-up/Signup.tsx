/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { useState } from "react";
import CustomInputField from "@/components/CustomInputField";
import CustomButton from "@/components/CustomButton";
import Link from "next/link";
import { useCreateAccount } from "@/app/actions/reactQuery";
import { z } from "zod";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";


const signupSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmpassword: z.string(),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "Passwords do not match",
    path: ["confirmpassword"],
  });

const Signup = () => {
  const router = useRouter();
  const [confirmpassword, setConfirmPassword] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userType: "workman"
  });

 
  const [formErrors, setFormErrors] = useState<{
    email?: string[];
    password?: string[];
    confirmpassword?: string[];  // Add this
  }>({});  


  const { mutateAsync: createUserAccount, isPending: isCreatingAccount } = useCreateAccount();
  

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormErrors({});

    const result = signupSchema.safeParse({
      ...formData,
      confirmpassword,
    });

    if (!result.success) {
      setFormErrors(result.error.flatten().fieldErrors);
      return;
    }

    try {
      const response = await createUserAccount(formData);

      console.log("my response", response)

      // The API returns 201 + { success: true, data: { token } }
      if (response.success == true) {
        const token = response.data.token; // This is your JWT

        console.log("my token", token)

        // Save token to localStorage
        localStorage.setItem("authToken", token);

        toast.success("Signup successful!");
        router.push("/onboarding");
      } else {
        toast.error(response.data?.message || "Failed to create account");
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      {/* <ThemeMode /> */}
      <div className="flex flex-row lg:flex-row h-screen">
        {/* Left Section - Background and Testimonials */}
        <div
          className="hidden lg:flex relative w-full lg:w-1/2 bg-[#3900DC] flex justify-center items-center p-8"
        >
          
          {/* Content Overlay */}
          <div className="relative text-white  max-w-lg">
            <h1 className="text-[38px] -mt-24 text-center font-bold leading-tight">
              Start Your Journey — Hire or Get Hired with Confidence
            </h1>
            <p className="mt-2 text-[18px] font-semibold md:text-base text-center leading-tight ">
              Join a trusted network where service providers and customers
              connect seamlessly, securely, and stress-free.
            </p>
            {/* Testimonial Cards */}
            <div className="mt-32 -ml-32 relative flex justify-center">
                {/* First Card */}
                <Image
                    src="/assets/icons/card2.png"
                    alt="Testimonial from Bukayo O"
                    width={500}
                    height={200}
                    className="rounded-xl shadow-lg"
                />

                {/* Second Card (overlay) */}
                <Image
                    src="/assets/icons/card1.png"
                    alt="Testimonial from Aisha O"
                    width={500}
                    height={200}
                    className="absolute bottom-0 right-0 left-40 top-35 translate-x-6 translate-y-6 rounded-xl shadow-lg"
                />
            </div>

          </div>
        </div>

        {/* Right Section - Signup Form */}
        <div className="w-full max-w-[450px] lg:max-w-full lg:w-1/2 flex  lg:p-8 bg-[#FFFDFA]  transition-colors duration-300 mt-5">
            
          <div className="w-full mx-6 my-12 lg:p-8 rounded-2xl bg-white  ">
            {/* "Looking for work?" link at top right (Desktop) */}
          <div className="absolute top-8 right-8 text-sm hidden lg:block">
            <a  className="hover:underline text-[#4B4B56] font-semibold">
              Looking for work?
              <span className="font-semibold text-[#2E00B0] cursor-pointer"> Join as a freelancer</span>
            </a>
          </div>
            {/* Logo */}
            <div className="flex -mb-3 ml-20 md:-ml-2">
              <Image
                src="/assets/icons/AppLogo.png"
                alt="Whorkaz Logo"
                width={150}
                height={34}
                className="object-contain"
              />
            </div>
            {/* This will only appear on small screen */}
            <div className="text-sm lg:block ml-12 lg:hidden my-4">
              <a  className="hover:underline text-[#4B4B56] font-semibold">
                Looking for work?
                <span className="font-semibold text-[#2E00B0] cursor-pointer"> Join as a freelancer</span>
              </a>
            </div>
            <h2 className="text-[20px] ml-10 md:ml-0 md:text-[28px] font-semibold text-[#191926] dark:text-[[#191926]] mb-4 md:my-4">
              Sign up to find trusted experts
            </h2>

            {/* Social Login Buttons */}
            <div className="flex flex-col ml-15 md:ml-0 w-[250px] md:w-[450px] sm:flex-row gap-3 mb-6 mt-2">
              <button className="cursor-pointer flex-1 flex items-center text-[14px] font-semibold justify-center gap-2 bg-white dark:bg-white text-[#4B4B56] dark:text-[#4B4B56] border border-gray-100 dark:border-gray-700 rounded-[32px] py-3 transition-colors">
                <Image
                  src="/assets/icons/apple-icon.png"
                  alt="Apple"
                  width={20}
                  height={20}
                  className="object-contain"
                />
                Continue with Apple
              </button>
              <button className="cursor-pointer w-full flex-1 flex items-center text-[14px] font-semibold justify-center gap-2 bg-[#2167FF] dark:bg-[#2167FF] text-[#4B4B56] dark:text-white border border-gray-300 dark:border-gray-700 rounded-[32px] py-3  transition-colors">
                <Image
                  src="/assets/icons/google-icon.png"
                  alt="Google"
                  width={26}
                  height={26}
                  className="object-contain"
                />
                Continue with Google
              </button>
            </div>

            {/* Divider */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#C7C7CF] dark:border-[#C7C7CF]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 text-[16px] bg-[#FFFDFA]  text-gray-500 dark:text-gray-400">
                  or
                </span>
              </div>
            </div>

            {/* Email and Password Fields */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <CustomInputField
                label="Email address"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <CustomInputField
                label="Password"
                type="password"
                name="password"
                placeholder="Password should be 8 or more characters long"
                value={formData.password}  
                onChange={handleInputChange}
                required
              />
              <CustomInputField
                label="Re-write Password"
                type="password"
                name="confirmpassword"   
                value={confirmpassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  e.stopPropagation();   // ← prevents handleInputChange from running
                }}
                required
              />
              <div className="flex items-center">
                <input
                  type="radio"
                  id="terms"
                  className="h-4 w-4 text-[#3900DC] dark:text-[#4A00F4] border-gray-300 dark:border-gray-700 rounded focus:ring-[#3900DC] dark:focus:ring-[#4A00F4] transition-colors"
                />
                <label
                  htmlFor="terms"
                  className="ml-2 text-[14px] font-medium text-[#4B4B56] dark:text-[#4B4B56]"
                >
                  Yes, I understand and I agree to the Workaz 
                  <span className="font-semibold text-[#2E00B0] cursor-pointer"> Terms & Conditions
                  and Privacy Policy</span>
                </label>
              </div>
               <div className="flex justify-start items-center cursor-pointer ml-15 md:ml-0">
                <CustomButton title="Create account" type="submit" isLoading={isCreatingAccount}/>
              </div>
              {/* <Link href="/onboarding">
                <div className="flex justify-start items-center cursor-pointer ml-15 md:ml-0">
                  <CustomButton title="Create account" />
                </div>
              </Link> */}
            </form>

            {/* Login Link */}
            <div className="flex justify-start items-center mb-3 mt-2 gap-2 ml-20 md:ml-0">
              <p className=" text-start text-sm text-gray-600 dark:text-gray-400">Already have an account?</p>
              <Link href="/sign-in">
                <p className=" cursor-pointer text-[#3900DC] dark:text-[#4A00F4] hover:underline font-semibold">Login</p> 
              </Link>
            </div>
            
            {/* Freelancer Link */}
            {/* <p className="mt-2 text-center text-sm text-[#3900DC] dark:text-[#4A00F4] lg:hidden">
              Looking for work?{" "}
              <a href="/join-freelancer" className="hover:underline">
                Join as a freelancer
              </a>
            </p> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;




// "use client";

// import Image from "next/image";
// import { useState } from "react";
// import CustomInputField from "@/components/CustomInputField";
// import CustomButton from "@/components/CustomButton";
// import Link from "next/link";

// const Signup = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmpassword, setConfirmPassword] = useState("");

//   return (
//     <>
//       <div className="flex flex-col lg:flex-row h-screen overflow-x-hidden">
//         {/* Left Section - Background and Testimonials (hidden on mobile) */}
//         <div className="hidden lg:flex lg:w-1/2 bg-[#3900DC] flex justify-center items-center p-8">
//           {/* Content Overlay */}
//           <div className="relative text-white max-w-lg">
//             <h1 className="text-[38px] -mt-24 text-center font-bold leading-tight">
//               Start Your Journey — Hire or Get Hired with Confidence
//             </h1>
//             <p className="mt-2 text-[18px] font-semibold md:text-base text-center leading-tight ">
//               Join a trusted network where service providers and customers
//               connect seamlessly, securely, and stress-free.
//             </p>
//             {/* Testimonial Cards */}
//             <div className="mt-32 -ml-32 relative flex justify-center">
//               {/* First Card */}
//               <Image
//                 src="/assets/icons/card2.png"
//                 alt="Testimonial from Bukayo O"
//                 width={500}
//                 height={200}
//                 className="rounded-xl shadow-lg"
//               />

//               {/* Second Card (overlay) */}
//               <Image
//                 src="/assets/icons/card1.png"
//                 alt="Testimonial from Aisha O"
//                 width={500}
//                 height={200}
//                 className="absolute bottom-0 right-0 left-40 top-35 translate-x-6 translate-y-6 rounded-xl shadow-lg"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Right Section - Signup Form */}
//         <div className="w-full lg:w-1/2 flex justify-center p-4 lg:p-8 bg-[#FFFDFA] transition-colors duration-300">
//           <div className="w-full max-w-[450px] mx-auto my-6 p-8 rounded-2xl bg-white">
//             {/* "Looking for work?" link at top right (Desktop) */}
//             <div className="absolute top-8 right-8 text-sm hidden lg:block">
//               <a className="hover:underline text-[#4B4B56] font-semibold">
//                 Looking for work?
//                 <span className="font-semibold text-[#2E00B0] cursor-pointer"> Join as a freelancer</span>
//               </a>
//             </div>
//             {/* Logo */}
//             <div className="flex justify-center -mb-3 -ml-2">
//               <Image
//                 src="/assets/icons/AppLogo.png"
//                 alt="Whorkaz Logo"
//                 width={150}
//                 height={34}
//                 className="object-contain"
//               />
//             </div>
//             <h2 className="text-[28px] font-semibold text-[#191926] text-center my-4">
//               Sign up to find trusted experts
//             </h2>

//             {/* Social Login Buttons */}
//             <div className="flex flex-col gap-3 mb-6 mt-2">
//               <button className="flex-1 flex items-center justify-center gap-2 bg-white text-[#4B4B56] border border-gray-100 rounded-[32px] py-3">
//                 <Image
//                   src="/assets/icons/apple-icon.png"
//                   alt="Apple"
//                   width={20}
//                   height={20}
//                   className="object-contain"
//                 />
//                 Continue with Apple
//               </button>
//               <button className="flex-1 flex items-center justify-center gap-2 bg-[#2167FF] text-white border border-gray-300 rounded-[32px] py-3">
//                 <Image
//                   src="/assets/icons/google-icon.png"
//                   alt="Google"
//                   width={26}
//                   height={26}
//                   className="object-contain"
//                 />
//                 Continue with Google
//               </button>
//             </div>

//             {/* Divider */}
//             <div className="relative my-4">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-[#C7C7CF]"></div>
//               </div>
//               <div className="relative flex justify-center text-sm">
//                 <span className="px-2 text-[16px] bg-[#FFFDFA] text-gray-500">or</span>
//               </div>
//             </div>

//             {/* Email and Password Fields */}
//             <form className="space-y-4">
//               <CustomInputField
//                 label="Email address"
//                 type="email"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//               <CustomInputField
//                 label="Password"
//                 type="password"
//                 placeholder="Password should be 8 or more characters long"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//               <CustomInputField
//                 label="Re-write Password"
//                 type="password"
//                 placeholder="Password should be 8 or more characters long"
//                 value={confirmpassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 required
//               />
//               <div className="flex items-center">
//                 <input
//                   type="radio"
//                   id="terms"
//                   className="h-4 w-4 text-[#3900DC] border-gray-300 rounded focus:ring-[#3900DC]"
//                 />
//                 <label
//                   htmlFor="terms"
//                   className="ml-2 text-[14px] font-medium text-[#4B4B56]"
//                 >
//                   Yes, I understand and I agree to the Workaz{" "}
//                   <span className="font-semibold text-[#2E00B0] cursor-pointer">
//                     Terms & Conditions and Privacy Policy
//                   </span>
//                 </label>
//               </div>
//               <Link href="/onboarding">
//                 <div className="flex justify-center items-center">
//                   <CustomButton title="Create account" />
//                 </div>
//               </Link>
//             </form>

//             {/* Login Link */}
//             <div className="flex justify-center items-center mt-2 gap-2">
//               <p className="text-sm text-gray-600">Already have an account?</p>
//               <Link href="/sign-in">
//                 <p className="text-[#3900DC] hover:underline font-semibold">Login</p>
//               </Link>
//             </div>

//             {/* Freelancer Link (visible on mobile) */}
//             <p className="mt-4 text-center text-sm text-[#3900DC] lg:hidden">
//               Looking for work?{" "}
//               <a href="/join-freelancer" className="hover:underline">
//                 Join as a freelancer
//               </a>
//             </p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Signup;