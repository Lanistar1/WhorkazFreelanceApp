'use client';
import React from 'react';
import Image from 'next/image';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  coursePrice: string; // e.g., "₦25,000"
}

const PaymentModal = ({ isOpen, onClose, coursePrice }: PaymentModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 shadow-lg">
        {/* Title */}
        <h2 className="text-2xl font-bold text-[#32323E] mb-4">Payment method</h2>

        {/* Payment Logos */}
        <div className="flex space-x-10 mb-6">
          <Image src="/assets/icons/mastercard.png" alt="Mastercard" width={40} height={20} className="rounded" /> {/* Assume asset paths */}
          <Image src="/assets/icons/flutterwave.png" alt="Flutterwave" width={40} height={20} className="rounded" />
          <Image src="/assets/icons/paystack.png" alt="Paystack" width={40} height={20} className="rounded" />
          <Image src="/assets/icons/visa.png" alt="Visa" width={40} height={20} className="rounded" />
        </div>

        {/* Form Fields */}
        <form className="space-y-4">
          <div>
            <label className="block text-sm text-gray-500 mb-1">Cardholder name</label>
            <input
              type="text"
              placeholder="John Dortmund"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">Card number</label>
            <input
              type="text"
              placeholder="0000 0000 0000"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-sm text-gray-500 mb-1">Expiry date</label>
              <input
                type="text"
                placeholder="MM/YY"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm text-gray-500 mb-1">CVV</label>
              <input
                type="text"
                placeholder="000"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Checkbox */}
          <div className="flex items-center">
            <input type="checkbox" id="save-payment" className="mr-2" />
            <label htmlFor="save-payment" className="text-sm text-gray-500">
              Save my payment for future purchases
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-6 py-3 bg-[#3900DC] text-white rounded-full font-bold hover:bg-purple-700 transition-colors"
          >
            Submit Info
          </button>
        </form>

        {/* Close Button (Optional) */}
        <button onClick={onClose} className="absolute text-[50px] top-2 right-2 text-black hover:text-gray-700">
          ×
        </button>
      </div>
    </div>
  );
};

export default PaymentModal;