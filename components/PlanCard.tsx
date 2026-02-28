// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useState } from "react";

// const PlanCard = ({
//   plan,
//   isActive,
//   onSubscribe,
// }: {
//   plan: any;
//   isActive?: boolean;
//   onSubscribe?: (plan: any) => void;
// }) => {
//   return (
//     <div className="border rounded-xl p-5 shadow-sm hover:shadow-md transition bg-white">
//       <div className="flex items-center justify-between mb-3">
//         <h3 className="font-semibold text-lg">{plan?.name}</h3>

//         {isActive && (
//           <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
//             Active
//           </span>
//         )}
//       </div>

//       <p className="text-sm text-gray-600 mb-4">
//         {plan?.description || "No description"}
//       </p>

//       <div className="flex items-center justify-between">
//         <span className="font-bold text-lg">
//           ₦{plan?.price || 0}
//         </span>

//         {!isActive && (
//           <button
//             onClick={() => onSubscribe?.(plan)}
//             className="bg-[#3900DC] text-white px-4 py-2 rounded-lg text-sm hover:opacity-90"
//           >
//             Subscribe
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PlanCard;





/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { CheckCircle2 } from "lucide-react"; // Nice icon for features

const PlanCard = ({
  plan,
  isActive,
  onSubscribe,
}: {
  plan: any;
  isActive?: boolean;
  onSubscribe?: (plan: any) => void;
}) => {
  return (
    <div className={`border rounded-2xl p-6 shadow-sm hover:shadow-lg transition bg-white flex flex-col h-full ${isActive ? 'ring-2 ring-green-500' : ''}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-xl text-gray-800">{plan?.name}</h3>
        {isActive && (
          <span className="text-[10px] font-bold uppercase tracking-wider bg-green-100 text-green-700 px-3 py-1 rounded-full">
            Current Plan
          </span>
        )}
      </div>

      <p className="text-sm text-gray-500 mb-6 min-h-[20px]">
        {plan?.description || "No description provided."}
      </p>

      {/* Pricing Section */}
      <div className="mb-3">
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-extrabold text-[#3900DC]">
            ₦{Number(plan?.price).toLocaleString()}
          </span>
          <span className="text-gray-400 text-sm font-medium">
            /{plan?.interval || 'period'}
          </span>
        </div>
      </div>

      {/* Features List */}
      <div className="flex-grow space-y-3 mb-6">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">What is included:</p>
        {plan?.features?.map((feature: string, index: number) => (
          <div key={index} className="flex items-start gap-3 text-sm text-gray-600">
            <CheckCircle2 size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
            <span>{feature}</span>
          </div>
        ))}
      </div>

      {/* Action Button */}
      {!isActive && (
        <button
          onClick={() => onSubscribe?.(plan)}
          className="w-full bg-[#3900DC] text-white py-3 rounded-xl font-semibold hover:bg-[#2E00B3] transition-all transform active:scale-95 shadow-md shadow-blue-200"
        >
          Subscribe Now
        </button>
      )}
    </div>
  );
};

export default PlanCard;