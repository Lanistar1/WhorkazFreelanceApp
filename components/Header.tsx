
import React from "react";
import { Bell, MessageSquare, Wallet } from "lucide-react";
import Link from "next/link";

interface HeaderProps {
  title: string; // dynamic prop for the heading text
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-[#FEFEFF] border-b border-[#DBDBE3] shadow-sm">
      <h1 className="text-2xl text-[#4B4B56] font-bold">{title}</h1>

      <div className="flex items-center space-x-4">
        <Link href="/notifications">
            <Bell className="h-5 w-5 text-gray-500 dark:text-gray-500" />
        </Link>
        <Link href="/messages">
          <MessageSquare className="hidden md:flex h-5 w-5 text-gray-500 dark:text-gray-500" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
