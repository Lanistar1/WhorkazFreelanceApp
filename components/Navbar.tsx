'use client'
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import { usePathname } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import LogoutModal from './LogoutModal';
import { useRouter } from "next/navigation";
import Link from 'next/link';


// Using inline SVG for icons to keep the component self-contained.
const DashboardIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="9"></rect>
        <rect x="14" y="3" width="7" height="5"></rect>
        <rect x="14" y="12" width="7" height="9"></rect>
        <rect x="3" y="16" width="7" height="5"></rect>
    </svg>
);

const JobsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
        <rect x="8" y="2" width="8" height="2" rx="1" ry="1"></rect>
    </svg>
);

const DiscoverIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
);

const CoursesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
        <path d="M6.5 2H20v20h-4"></path>
        <path d="M12 12V6"></path>
    </svg>
);

const MessagesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
);

const PaymentsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
        <line x1="1" y1="10" x2="23" y2="10"></line>
    </svg>
);

const SettingsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0-.33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09a1.65 1.65 0 0 0 1.51-1c-.02-.27-.03-.54-.03-.81a1.65 1.65 0 0 0 .33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1.51 1 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.09a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
    </svg>
);

const LogoutIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
    <polyline points="10 17 15 12 10 7" />
    <line x1="15" y1="12" x2="3" y2="12" />
  </svg>
);

export const Navbar = () => {
    const router = useRouter();
    const [activeLink, setActiveLink] = useState('');
    const { logout, user } = useAuth();
    const pathname = usePathname();
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const [showMoreMenu, setShowMoreMenu] = useState(false);


    useEffect(() => {
        const currentPath = pathname || '/dashboard';
        const newActiveLink = navItems.find(item => item.link === currentPath)?.name.toLowerCase().replace(' ', '') ||
            exploreItems.find(item => item.link === currentPath)?.name.toLowerCase().replace(' ', '') ||
            'dashboard';
        setActiveLink(newActiveLink);
    }, [pathname]);

    const navItems = [
        { name: 'Dashboard', icon: <DashboardIcon />, link: '/dashboard' },
        { name: 'My jobs', icon: <JobsIcon />, link: '/my-job' },
        { name: 'Explore jobs', icon: <DiscoverIcon />, link: '/explore' },
    ];

    const exploreItems = [
        { name: 'Apprenticeship', icon: <CoursesIcon />, link: '/courses' },
        { name: 'Messages', icon: <MessagesIcon />, link: '/messages' },
        { name: 'Payments', icon: <PaymentsIcon />, link: '/payments' },
        { name: 'Subscription', icon: <PaymentsIcon />, link: '/plans' },
        { name: 'Settings', icon: <SettingsIcon />, link: '/settings' },
    ];

    const confirmLogout = async () => {
        try {
            // OPTIONAL: call API if you have one
            // await fetch('/api/logout', { method: 'POST' });

            logout(); // from useAuth
        } catch (error) {
            console.error(error);
        } finally {
            setShowLogoutModal(false);
        }
        };

    return (
        <>
            {/* Desktop Sidebar (visible on screens larger than 'sm') */}
            <aside className="hidden sm:flex h-full flex-col w-[308px] p-4 space-y-4 bg-[#FEFEFF] border-r-1 border-solid border-[#DBDBE3] text-zinc-900">
                <div className="flex items-center space-x-2 mb-6">
                    <Image
                        src="/assets/icons/AppLogo.png"
                        alt="Whorkaz Logo"
                        width={150}
                        height={14}
                        className="object-contain"
                    />
                </div>

                {/* Workmen Card */}
                <div 
                    onClick={() => router.replace("/settings")}
                    className="p-2 rounded-xl flex items-center border border-[#95959F] justify-between shadow-sm cursor-pointer">
                    <div className="flex items-center space-x-2">
                         {user?.profilePic ? (
                    <Image
                        src={user.profilePic}
                        alt="User Profile"
                        width={64}
                        height={64}
                        className="w-16 h-16 object-cover rounded-full"
                    />
                    ) : (
                    <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-white font-semibold uppercase">
                        {user
                        ? `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`
                        : "?"}
                    </div>
                    )}
                      {/* <Image
                        src="/assets/images/person3.png"
                        alt="Whorkaz Logo"
                        width={48}
                        height={48}
                        className="object-contain"
                    /> */}
                         <div>
                        <div className="text-[14px] font-medium text-[#32323E]">
                            {/* Dynamically show the workspace type based on userType from API */}
                            {user?.userType?.toUpperCase() || 'FREELANCER'} WORKSPACE
                        </div>
                        <div className="text-[16px] font-semibold text-[#95959F]">
                            {/* Combine First and Last Name */}
                            {/* {user ? `${user.firstName} ${user.lastName}` : "Loading..."} */}
                            {!user
                                ? "Loading..."
                                : (user.firstName || user.lastName)
                                    ? `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim()
                                    : ""}
                        </div>
                    </div>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </div>

                {/* Navigation Links */}
                <nav className="flex-grow space-y-1">
                    {navItems.map((item) => (
                        <a 
                            key={item.name} 
                            href={item.link} 
                            onClick={() => setActiveLink(item.name.toLowerCase().replace(' ', ''))}
                            className={`flex items-center space-x-3 p-3 rounded-lg font-medium transition-colors
                                ${activeLink === item.name.toLowerCase().replace(' ', '') 
                                    ? 'bg-purple-100 border border-[#AA5FBD] text-purple-700' 
                                    : 'hover:bg-gray-200'}`}
                        >
                            <div className={`
                                ${activeLink === item.name.toLowerCase().replace(' ', '') 
                                    ? 'text-purple-700 text-[18px] font-semibold' 
                                    : 'text-[#32323E] text-[18px] font-semibold'}`}
                            >
                                {item.icon}
                            </div>
                            <span>{item.name}</span>
                        </a>
                    ))}
                </nav>

                {/* Explore Section */}
                <div className="mt-3">
                    <div className="text-xs text-gray-500 font-medium tracking-wider uppercase mb-2">Explore</div>
                    <nav className="space-y-1">
                        {exploreItems.map((item) => (
                            <a 
                                key={item.name} 
                                href={item.link}
                                onClick={() => setActiveLink(item.name.toLowerCase().replace(' ', ''))}
                                className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-200 transition-colors
                                    ${activeLink === item.name.toLowerCase().replace(' ', '') 
                                        ? 'bg-purple-100 border border-[#AA5FBD] text-purple-700' 
                                        : ''}`}
                            >
                                <div className={`${activeLink === item.name.toLowerCase().replace(' ', '') ? 'text-purple-700 text-[18px] font-semibold' : 'text-[#32323E] text-[18px] font-semibold'}`}>
                                    {item.icon}
                                </div>
                                <span>{item.name}</span>
                            </a>
                        ))}
                    </nav>
                </div>

                {/* Invite Card */}
                <div className="bg-purple-50 border border-[#AA5FBD] p-3 rounded-xl mt-8">
                    <div className="text-[15px] text-[#0B002C] font-semibold mb-1">Invite Your Friends & Earn Rewards</div>
                    <div className="text-[14px] text-[#95959F] font-medium mb-4">Share your referral link and earn credits when your friends hire or work on jobs.</div>
                    <Link href="/referral">
                        <button className="w-[178px] bg-[#3900DC] cursor-pointer hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-full flex items-center justify-center space-x-2 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5l6 6m0 0l-6 6m6-6h-12" />
                            </svg>
                            <span>Invite workmen</span>
                        </button>
                    </Link>
                    
                </div>
                <button
                    onClick={() => setShowLogoutModal(true)}
                    className="flex items-center gap-2 text-gray-700 hover:text-red-500 mt-6 p-3 w-full text-left cursor-pointer"
                    >
                    <LogoutIcon />
                    Logout
                </button>
            </aside>

            {/* Mobile Bottom Tab Bar (visible on screens smaller than 'sm') */}
            {/* <nav className="fixed bottom-0 left-0 w-full bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1),0_-2px_4px_-1px_rgba(0,0,0,0.06)] sm:hidden z-50">
                <div className="flex justify-around items-center h-16">
                    {[
                        { name: 'Dashboard', icon: <DashboardIcon />, link: '/dashboard' },
                        { name: 'My jobs', icon: <JobsIcon />, link: '/my-job' },
                        { name: 'Explore', icon: <DiscoverIcon />, link: '/explore' },
                        { name: 'Apprenticeship', icon: <CoursesIcon />, link: '/courses' },
                        { name: 'Messages', icon: <MessagesIcon />, link: '/messages' },
                        { name: 'Settings', icon: <MessagesIcon />, link: '/settings' },
                    ].map((item) => (
                        <a 
                            key={item.name} 
                            href={item.link} 
                            onClick={() => setActiveLink(item.name.toLowerCase().replace(' ', ''))}
                            className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors
                                ${activeLink === item.name.toLowerCase().replace(' ', '') 
                                    ? 'text-purple-700' 
                                    : 'text-zinc-900'}`}
                        >
                            <div className={`
                                ${activeLink === item.name.toLowerCase().replace(' ', '') 
                                    ? 'text-purple-700' 
                                    : 'text-gray-500'}`}
                            >
                                {item.icon}
                            </div>
                            <span className="text-xs mt-1">{item.name}</span>
                        </a>
                    ))}
                </div>
            </nav> */}

                        <nav className="fixed bottom-0 left-0 w-full bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1),0_-2px_4px_-1px_rgba(0,0,0,0.06)] sm:hidden z-50">
            <div className="flex justify-around items-center h-16 px-2">
                {[
                { name: "Dashboard", icon: <DashboardIcon />, link: "/dashboard" },
                { name: "My jobs", icon: <JobsIcon />, link: "/my-job" },
                { name: "Explore", icon: <DiscoverIcon />, link: "/explore" },
                { name: "Messages", icon: <MessagesIcon />, link: "/messages" },
                ].map((item) => (
                <a
                    key={item.name}
                    href={item.link}
                    onClick={() => setActiveLink(item.name.toLowerCase().replace(" ", ""))}
                    className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors
                    ${
                        activeLink === item.name.toLowerCase().replace(" ", "")
                        ? "text-purple-700"
                        : "text-zinc-900"
                    }`}
                >
                    <div
                    className={`${
                        activeLink === item.name.toLowerCase().replace(" ", "")
                        ? "text-purple-700"
                        : "text-gray-500"
                    }`}
                    >
                    {item.icon}
                    </div>
                    <span className="text-[11px] mt-1 font-medium">{item.name}</span>
                </a>
                ))}

                {/* More Button */}
                <button
                type="button"
                onClick={() => setShowMoreMenu(true)}
                className="flex flex-col items-center justify-center p-2 rounded-lg text-gray-500 hover:text-purple-700 transition"
                >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6h.01M12 12h.01M12 18h.01" />
                </svg>
                <span className="text-[11px] mt-1 font-medium">More</span>
                </button>
            </div>
            </nav>

            {/* More Menu Modal */}
            {showMoreMenu && (
            <div className="fixed inset-0 z-[999] sm:hidden">
                {/* Overlay */}
                <div
                onClick={() => setShowMoreMenu(false)}
                className="absolute inset-0 bg-black/40"
                />

                {/* Bottom Sheet */}
                <div className="absolute bottom-0 left-0 w-full bg-white rounded-t-2xl p-5 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-bold text-gray-900">More</h3>

                    <button
                    onClick={() => setShowMoreMenu(false)}
                    className="text-gray-500 text-sm font-semibold"
                    >
                    Close
                    </button>
                </div>

                <div className="space-y-2">
                    {[
                    { name: "Apprenticeship", icon: <CoursesIcon />, link: "/courses" },
                    { name: "Payments", icon: <PaymentsIcon />, link: "/payments" },
                    { name: "Subscription", icon: <PaymentsIcon />, link: "/plans" },
                    { name: "Settings", icon: <SettingsIcon />, link: "/settings" },
                    ].map((item) => (
                    <a
                        key={item.name}
                        href={item.link}
                        onClick={() => {
                        setActiveLink(item.name.toLowerCase().replace(" ", ""));
                        setShowMoreMenu(false);
                        }}
                        className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition"
                    >
                        <div className="text-gray-600">{item.icon}</div>
                        <span className="text-sm font-semibold text-gray-800">
                        {item.name}
                        </span>
                    </a>
                    ))}

                    {/* Logout */}
                    <button
                    onClick={() => {
                        setShowMoreMenu(false);
                        setShowLogoutModal(true);
                    }}
                    className="w-full flex items-center gap-3 p-3 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 transition"
                    >
                    <div className="text-red-600">
                        <LogoutIcon />
                    </div>
                    <span className="text-sm font-semibold text-red-700">Logout</span>
                    </button>
                </div>
                </div>
            </div>
            )}
            <LogoutModal
                isOpen={showLogoutModal}
                onClose={() => setShowLogoutModal(false)}
                onConfirm={confirmLogout}
            />
        </>
    );
};