'use client'
import React, { useState } from "react";
import { User, Bell, CreditCard, Headphones, BadgeCheck, Trash2, Pencil, X, Save } from "lucide-react";
import Header from "@/components/Header";

interface Field {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

const SettingPage = () => {
  const [activeTab, setActiveTab] = useState('account');
  const [editingField, setEditingField] = useState<string | null>(null);
  const [fields, setFields] = useState<Field[]>([
    { label: 'Email address', value: 'jasonalexander45@gmail.com' },
    { label: 'Phone number', value: '+234 904 8390 2839' },
    { label: 'Location', value: '678 Agric Street, Opebi, Lagos' },
  ]);
  const [tempValues, setTempValues] = useState<{ [key: string]: string }>({});

  const tabs = [
    { id: 'account', name: 'Account', icon: <User className="h-5 w-5" /> },
    { id: 'preferences', name: 'Preferences', icon: <Bell className="h-5 w-5" /> },
    { id: 'payments', name: 'Payments', icon: <CreditCard className="h-5 w-5" /> },
    { id: 'help', name: 'Help Center', icon: <Headphones className="h-5 w-5" /> },
    { id: 'verification', name: 'ID Verification', icon: <BadgeCheck className="h-5 w-5" /> },
  ];

  const startEditing = (label: string) => {
    setEditingField(label);
    setTempValues({ ...tempValues, [label]: fields.find(f => f.label === label)?.value || '' });
  };

  const cancelEditing = () => {
    setEditingField(null);
    setTempValues({});
  };

  const saveField = (label: string) => {
    const newValue = tempValues[label];
    setFields(prev => prev.map(f => f.label === label ? { ...f, value: newValue } : f));
    setEditingField(null);
    setTempValues({});
  };

  const handleInputChange = (label: string, value: string) => {
    setTempValues({ ...tempValues, [label]: value });
  };

  const renderContent = () => {
    if (activeTab !== 'account') {
      return (
        <div className="flex-1 flex items-center justify-center h-full">
          <div className="text-[18px] font-semibold text-[#32323E]">Coming Soon</div>
        </div>
      );
    }

    return (
      <div className="p-6 md:ml-10 space-y-6 bg-gray-50 p-5 mt-5 md:mt-0">
        {fields.map((field) => (
          <div key={field.label} className="space-y-2">
            <label className="text-[14px] font-medium text-[#95959F]">{field.label}</label>
            <div className="flex items-center space-x-2">
              {editingField === field.label ? (
                <div className="flex flex-col w-full">
                    <input
                        type="text"
                        value={tempValues[field.label]}
                        onChange={(e) => handleInputChange(field.label, e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-[16px] text-[#4B4B56] focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <div className="flex justify-end gap-2 mt-3">
                        <button
                        onClick={cancelEditing}
                        className="px-4 py-2 bg-gray-100 text-[#4B4B56] rounded-lg text-[14px] font-medium hover:bg-gray-200 transition-colors"
                        >
                        Cancel
                        </button>
                        <button
                        onClick={() => saveField(field.label)}
                        className="px-4 py-2 bg-[#3900DC] text-white rounded-lg text-[14px] font-medium hover:bg-purple-700 transition-colors"
                        >
                        Save
                        </button>
                    </div>
                </div>
              ) : (
                <>
                  <div className=" w-full flex justify-between items-center px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-[16px] text-[#4B4B56]">
                    <span>{field.value}</span>
                    <button
                        onClick={() => startEditing(field.label)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <Pencil className="h-4 w-4 text-gray-500" />
                    </button>
                </div>

                  
                </>
              )}
            </div>
          </div>
        ))}

        <div className="pt-6 border-t border-gray-200">
          <button className="flex items-center space-x-2 text-red-500 hover:text-red-600 transition-colors">
            <Trash2 className="h-5 w-5" />
            <span className="text-[16px] font-medium">Delete account</span>
          </button>
        </div>

        <div className="flex justify-end mt-8">
          <button className="px-6 py-3 bg-[#3900DC] text-white rounded-full text-[16px] font-medium hover:bg-[#3900DC] transition-colors">
            Save changes
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full bg-white dark:bg-white text-gray-900 dark:text-gray-900">
        <Header title="Settings" />
<div className=" px-5 md:px-20 py-10 w-full bg-white mr-10 dark:bg-white text-gray-900 dark:text-gray-900 flex flex-col md:flex-row">
        
      {/* Sidebar */}
      <div className="w-full md:w-[300px]  bg-white dark:bg-white">
        <nav className="flex md:flex-col overflow-x-auto md:overflow-x-visible">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-3 px-6 py-4 text-left transition-colors whitespace-nowrap
                ${activeTab === tab.id 
                  ? 'bg-purple-100 border-l-4 border-purple-600 text-purple-700 font-semibold' 
                  : 'text-[#4B4B56] hover:bg-gray-50'}`}
            >
              {tab.icon}
              <span className="text-[16px]">{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      {renderContent()}
    </div>
    </div>
    
  );
};

export default SettingPage;