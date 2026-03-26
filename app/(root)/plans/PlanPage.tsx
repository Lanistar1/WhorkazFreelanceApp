/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import {
  useGetSubscriptionList,
  useGetMySubscriptionList,
  useInitiateSubscription,
} from "@/app/actions/reactQuery";
import PlanCard from "@/components/PlanCard";
import ConfirmSubscriptionModal from "@/components/ConfirmSubscriptionModal";
import { useAuth } from "@/app/context/AuthContext";
import Header from "@/components/Header";
import { toast } from "react-toastify";

const PlanPage = () => {
  const { user } = useAuth();

  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [openModal, setOpenModal] = useState(false);
   const [kycStatus, setKycStatus] = useState<string | null>(null);


  const {
    data: plansData,
    isLoading: isLoadingPlans,
  } = useGetSubscriptionList();

  const {
    data: myPlansData,
    isLoading: isLoadingMyPlans,
  } = useGetMySubscriptionList();

  const { mutate, isPending: isSubscribing } =
    useInitiateSubscription();

    useEffect(() => {
      // Get the status we saved from the dashboard
      const savedStatus = localStorage.getItem("userKycStatus");
      setKycStatus(savedStatus);
      console.log("this is my  kyc", savedStatus)
    }, []);

  const handleSubscribeClick = (plan: any) => {
    setSelectedPlan(plan);
    setOpenModal(true);
  };


  const handleConfirmSubscription = () => {
  if (!selectedPlan) return;

  if (user?.kycVerificationStatus !== "verified") {
    toast.error("Verification Required: Please complete your KYC Verification");
    return;
  }

  mutate({
    data: {
      email: user?.email,
      amount: selectedPlan.price,
      currency: "NGN",
      contextType: "subscription",
      contextId: selectedPlan.id,
      _callbackUrl: "/dashboard",
      metadata: {
        autoRenew: true,
      },
    },
  });

  setOpenModal(false);
};
  const workmanPlans = plansData?.filter((plan: any) => plan.planType === "workman") || [];
  
  return (
    <div className="min-h-screen bg-white text-gray-900">
        <Header title="Plans" />
        <div className="p-6 space-y-10">
            {/* ===== My Subscriptions ===== */}
            <div>
                <h2 className="text-xl font-semibold mb-4">
                My Subscriptions
                </h2>

                {isLoadingMyPlans ? (
                <p>Loading your subscriptions...</p>
                ) : myPlansData?.length ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {myPlansData.map((plan: any) => (
                    <PlanCard key={plan.id} plan={plan} isActive />
                    ))}
                </div>
                ) : (
                <p className="text-gray-500">
                    You have no active subscriptions.
                </p>
                )}
            </div>

            {/* ===== All Plans ===== */}
            <div>
                <h2 className="text-xl font-semibold mb-4">
                All Plans
                </h2>

                {/* {isLoadingPlans ? (
                <p>Loading plans...</p>
                ) : plansData?.length ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {plansData.map((plan: any) => (
                    <PlanCard
                        key={plan.id}
                        plan={plan}
                        onSubscribe={handleSubscribeClick}
                    />
                    ))}
                </div>
                ) : (
                <p className="text-gray-500">No plans available.</p>
                )} */}


                {isLoadingPlans ? (
                  <p>Loading plans...</p>
                ) : workmanPlans.length ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {workmanPlans.map((plan: any) => (
                      <PlanCard
                        key={plan.id}
                        plan={plan}
                        onSubscribe={handleSubscribeClick}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No workmen plans available.</p>
                )}
            </div>

            <ConfirmSubscriptionModal
                open={openModal}
                plan={selectedPlan}
                loading={isSubscribing}
                onClose={() => setOpenModal(false)}
                onConfirm={handleConfirmSubscription}
            />
        </div>
    </div>
    
  );
};

export default PlanPage;

