// 'use client'
// import React, { useState, useRef, useEffect } from "react";
// import { Send, Phone, Video, MoreHorizontal, Search, Smile, Paperclip, MessageCircle } from "lucide-react";
// import Header from "@/components/Header";
// import Image from "next/image";

// interface User {
//   id: string;
//   name: string;
//   avatar: string;
//   lastMessage: string;
//   time: string;
//   unreadCount?: number;
//   isOnline?: boolean;
// }

// interface Message {
//   id: string;
//   sender: {
//     id: string;
//     name: string;
//     avatar: string;
//   };
//   content: string;
//   type: 'text' | 'file';
//   fileName?: string;
//   fileId?: string;
//   timestamp: string;
//   isOwn: boolean;
// }

// const MessagePage = () => {
//   const [selectedUser, setSelectedUser] = useState<User | null>(null);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [newMessage, setNewMessage] = useState('');
//   const [searchQuery, setSearchQuery] = useState('');
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const inputRef = useRef<HTMLInputElement>(null);

//   // Sample users
//   const users: User[] = [
//     {
//       id: '1',
//       name: 'Muyiwa Andela',
//       avatar: '/assets/images/person3.png',
//       lastMessage: 'Yes, I\'ll be there by 9am.',
//       time: '2:26 PM',
//       unreadCount: 4,
//       isOnline: true,
//     },
//     {
//       id: '2',
//       name: 'Sarah Johnson',
//       avatar: '/assets/images/person3.png',
//       lastMessage: 'Thanks for the update!',
//       time: 'Yesterday',
//       unreadCount: 0,
//       isOnline: false,
//     },
//     {
//       id: '3',
//       name: 'David Okon',
//       avatar: '/assets/images/person3.png',
//       lastMessage: 'Please send the invoice',
//       time: 'Today',
//       unreadCount: 2,
//       isOnline: true,
//     },
//     {
//       id: '4',
//       name: 'Aisha Bello',
//       avatar: '/assets/images/person3.png',
//       lastMessage: 'Looking forward to the meeting',
//       time: 'Yesterday',
//       unreadCount: 1,
//       isOnline: false,
//     },
//   ];

//   // Sample messages for selected user
//   const sampleMessages: Message[] = [
//     {
//       id: '1',
//       sender: { id: 'muyiwa', name: 'Muyiwa Andela', avatar: '/assets/images/person3.png' },
//       content: 'Can we schedule the work for Saturday morning?',
//       type: 'text',
//       timestamp: '2:26 PM',
//       isOwn: false,
//     },
//     {
//       id: '2',
//       sender: { id: 'user', name: 'You', avatar: '/assets/images/person3.png' },
//       content: 'Yes, I\'ll be there by 9am.',
//       type: 'text',
//       timestamp: '2:26 PM',
//       isOwn: true,
//     },
//     {
//       id: '3',
//       sender: { id: 'muyiwa', name: 'Muyiwa Andela', avatar: '/assets/images/person3.png' },
//       content: 'Great! Looking forward to it.',
//       type: 'text',
//       timestamp: '2:27 PM',
//       isOwn: false,
//     },
//     {
//       id: '4',
//       sender: { id: 'user', name: 'You', avatar: '/assets/images/person3.png' },
//       content: 'Me too! See you then.',
//       type: 'text',
//       timestamp: '2:28 PM',
//       isOwn: true,
//     },
//   ];

//   // Load messages when user is selected
//   useEffect(() => {
//     if (selectedUser) {
//       setMessages(sampleMessages);
//     } else {
//       setMessages([]);
//     }
//     setNewMessage('');
//   }, [selectedUser]);

//   // Scroll to bottom when messages change
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   const filteredUsers = users.filter(user =>
//     user.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const handleSendMessage = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (newMessage.trim() && selectedUser) {
//       const message: Message = {
//         id: Date.now().toString(),
//         sender: {
//           id: 'user',
//           name: 'You',
//           avatar: '/assets/images/person3.png',
//         },
//         content: newMessage.trim(),
//         type: 'text',
//         timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//         isOwn: true,
//       };
      
//       setMessages(prev => [...prev, message]);
//       setNewMessage('');
      
//       // Simulate reply after 2 seconds
//       setTimeout(() => {
//         const reply: Message = {
//           id: (Date.now() + 1).toString(),
//           sender: selectedUser,
//           content: selectedUser.name === 'Muyiwa Andela' 
//             ? 'Perfect! I\'ll prepare everything for Saturday.' 
//             : 'Thanks for the quick response!',
//           type: 'text',
//           timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//           isOwn: false,
//         };
//         setMessages(prev => [...prev, reply]);
//       }, 2000);
//     }
//   };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSendMessage(e);
//     }
//   };

//   const formatTimeAgo = (time: string) => {
//     const now = new Date();
//     const messageTime = new Date();
//     const [hours, minutes] = time.split(':').map(Number);
//     messageTime.setHours(hours, minutes);
    
//     const diffInMinutes = (now.getTime() - messageTime.getTime()) / (1000 * 60);
    
//     if (diffInMinutes < 1) return 'Just now';
//     if (diffInMinutes < 60) return `${Math.floor(diffInMinutes)}m ago`;
//     if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
//     return 'Yesterday';
//   };

//   return (
//     <div className="min-h-screen w-full bg-white dark:bg-white text-gray-900 dark:text-gray-900">
//         <Header title="Messages" />
//         <div className="h-screen w-full bg-white dark:bg-white text-gray-900 dark:text-gray-900 flex">
      
//             {/* Sidebar - Users List */}
//             <div className="w-full sm:w-[400px] border-r border-[#DBDBE3] flex flex-col bg-white dark:bg-white">
//                 {/* Search */}
//                 <div className="p-4 border-b border-[#DBDBE3]">
//                 <div className="relative">
//                     <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//                     <input
//                     type="text"
//                     placeholder="Search messages"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-300 rounded-full text-[14px] font-medium text-[#4B4B56] dark:text-[#4B4B56] focus:outline-none focus:ring-2 focus:ring-[#220084]"
//                     />
//                 </div>
//                 </div>

//                 {/* Users List */}
//                 <div className="flex-1 overflow-y-auto">
//                 {filteredUsers.map((user) => (
//                     <div
//                     key={user.id}
//                     onClick={() => setSelectedUser(user)}
//                     className={`p-4 border-b border-gray-100 dark:border-gray-100 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-50 transition-colors flex items-center space-x-3 ${
//                         selectedUser?.id === user.id ? 'bg-purple-50 border-r-2 border-[#220084]' : ''
//                     }`}
//                     >
//                     <div className="relative">
//                         <Image
//                         src={user.avatar}
//                         alt={user.name}
//                         width={48}
//                         height={48}
//                         className="rounded-full object-cover"
//                         />
//                         {user.isOnline && (
//                         <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
//                         )}
//                     </div>
//                     <div className="flex-1 min-w-0">
//                         <div className="flex items-center justify-between">
//                         <span className="text-[16px] font-semibold text-[#32323E] truncate">{user.name}</span>
//                         <span className="text-[12px] text-[#95959F]">{formatTimeAgo(user.time)}</span>
//                         </div>
//                         <p className="text-[14px] text-[#4B4B56] truncate mt-1">{user.lastMessage}</p>
//                         {user.unreadCount && user.unreadCount > 0 && (
//                         <div className="w-5 h-5 bg-[#220084] text-white text-[10px] rounded-full flex items-center justify-center mt-1">
//                             {user.unreadCount > 9 ? '9+' : user.unreadCount}
//                         </div>
//                         )}
//                     </div>
//                     </div>
//                 ))}
//                 </div>
//             </div>

//             {/* Chat Area */}
//             <div className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-50">
//                 {selectedUser ? (
//                 <>
//                     {/* Chat Header */}
//                     <div className="p-4 border-b border-[#DBDBE3] bg-white dark:bg-white flex items-center justify-between">
//                     <div className="flex items-center space-x-3">
//                         <Image
//                         src={selectedUser.avatar}
//                         alt={selectedUser.name}
//                         width={48}
//                         height={48}
//                         className="rounded-full object-cover"
//                         />
//                         <div>
//                         <div className="text-[16px] font-semibold text-[#32323E]">{selectedUser.name}</div>
//                         <div className="flex items-center space-x-2 text-[12px] text-[#95959F]">
//                             <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                             <span>Online</span>
//                         </div>
//                         </div>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                         <button className="px-4 py-2 bg-white border border-gray-200 text-black rounded-full text-[14px] font-medium whitespace-nowrap ml-2">
//                         View work details
//                         </button>
//                         <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
//                         <Phone className="h-4 w-4 text-gray-500" />
//                         </button>
//                         <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
//                         <Paperclip className="h-4 w-4 text-gray-500" />
//                         </button>
//                     </div>
//                     </div>

//                     {/* Messages Container */}
//                     <div className="flex-1 overflow-y-auto p-4 space-y-4">
//                     {messages.map((message) => (
//                         <div
//                         key={message.id}
//                         className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}
//                         >
//                         <div
//                             className={`max-w-[70%] p-3 rounded-2xl ${
//                             message.isOwn
//                                 ? 'bg-[#220084] text-white rounded-br-sm'
//                                 : 'bg-white border border-gray-200 dark:border-gray-700 rounded-bl-sm'
//                             }`}
//                         >
//                             {message.type === 'text' ? (
//                             <p className="text-[14px] leading-relaxed">{message.content}</p>
//                             ) : (
//                             <div className="flex items-center space-x-2">
//                                 <Paperclip className="h-4 w-4 text-[#220084]" />
//                                 <span className="text-[12px] text-[#220084]">{message.fileName}</span>
//                             </div>
//                             )}
//                             <div className="flex items-center justify-end mt-1 text-[11px] opacity-75">
//                             <span>{message.timestamp}</span>
//                             {message.isOwn && <div className="ml-1">✓✓</div>}
//                             </div>
//                         </div>
//                         </div>
//                     ))}
//                     <div ref={messagesEndRef} />
//                     </div>

//                     {/* Input Area */}
//                     <div className="p-4 border-t border-[#DBDBE3] bg-white dark:bg-white">
//                     <form onSubmit={handleSendMessage} className="flex items-end space-x-2">
//                         <div className="flex-1 relative">
//                         <input
//                             ref={inputRef}
//                             type="text"
//                             value={newMessage}
//                             onChange={(e) => setNewMessage(e.target.value)}
//                             onKeyPress={handleKeyPress}
//                             placeholder="Type a message..."
//                             className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-300 rounded-full text-[14px] font-medium text-[#4B4B56] dark:text-[#4B4B56] focus:outline-none focus:ring-2 focus:ring-[#220084] resize-none"
//                         />
//                         </div>
//                         <button
//                         type="submit"
//                         disabled={!newMessage.trim()}
//                         className={`p-3 rounded-full transition-all ${
//                             newMessage.trim()
//                             ? 'bg-[#220084] text-white hover:bg-purple-700'
//                             : 'bg-gray-200 text-gray-400 cursor-not-allowed'
//                         }`}
//                         >
//                         <Send className="h-5 w-5" />
//                         </button>
//                         <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
//                         <Paperclip className="h-4 w-4 text-gray-500" />
//                         </button>
//                     </form>
//                     </div>
//                 </>
//                 ) : (
//                 // Empty state
//                 <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
//                     <div className="w-16 h-16 bg-[#220084] rounded-full flex items-center justify-center mb-4">
//                     <MessageCircle className="h-8 w-8 text-gray-400" />
//                     </div>
//                     <h3 className="text-[18px] font-semibold text-[#32323E] mb-2">No chat selected</h3>
//                     <p className="text-[14px] text-[#95959F]">Select a conversation to start messaging</p>
//                 </div>
//                 )}
//             </div>
//         </div>
//     </div>
    
//   );
// };

// export default MessagePage;





'use client'
import React, { useState, useRef, useEffect } from "react";
import { Send, Phone, Video, MoreHorizontal, Search, Smile, Paperclip, MessageCircle } from "lucide-react";
// import Header from "@/components/Header"; // This component is not included in the provided code, so it's commented out to prevent errors.
import Image from "next/image";
import Header from "@/components/Header";

// NOTE: I've replaced your local image paths with valid placeholders
// to ensure the component renders correctly. You can swap these back.

interface User {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unreadCount?: number;
  isOnline?: boolean;
}

interface Message {
  id: string;
  sender: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  type: 'text' | 'file';
  fileName?: string;
  fileId?: string;
  timestamp: string;
  isOwn: boolean;
}

const MessagePage = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sample users
  const users: User[] = [
    {
      id: '1',
      name: 'Muyiwa Andela',
      avatar: '/assets/images/person3.png',
      lastMessage: 'Yes, I\'ll be there by 9am.',
      time: '2:26 PM',
      unreadCount: 4,
      isOnline: true,
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      avatar: '/assets/images/person3.png',
      lastMessage: 'Thanks for the update!',
      time: 'Yesterday',
      unreadCount: 0,
      isOnline: false,
    },
    {
      id: '3',
      name: 'David Okon',
      avatar: '/assets/images/person3.png',
      lastMessage: 'Please send the invoice',
      time: 'Today',
      unreadCount: 2,
      isOnline: true,
    },
    {
      id: '4',
      name: 'Aisha Bello',
      avatar: '/assets/images/person3.png',
      lastMessage: 'Looking forward to the meeting',
      time: 'Yesterday',
      unreadCount: 1,
      isOnline: false,
    },
  ];

  // Sample messages for selected user
  const sampleMessages: Message[] = [
    {
      id: '1',
      sender: { id: 'muyiwa', name: 'Muyiwa Andela', avatar: '/assets/images/person3.png' },
      content: 'Can we schedule the work for Saturday morning?',
      type: 'text',
      timestamp: '2:26 PM',
      isOwn: false,
    },
    {
      id: '2',
      sender: { id: 'user', name: 'You', avatar: '/assets/images/person3.png' },
      content: 'Yes, I\'ll be there by 9am.',
      type: 'text',
      timestamp: '2:26 PM',
      isOwn: true,
    },
    {
      id: '3',
      sender: { id: 'muyiwa', name: 'Muyiwa Andela', avatar: '/assets/images/person3.png' },
      content: 'Great! Looking forward to it.',
      type: 'text',
      timestamp: '2:27 PM',
      isOwn: false,
    },
    {
      id: '4',
      sender: { id: 'user', name: 'You', avatar: '/assets/images/person3.png' },
      content: 'Me too! See you then.',
      type: 'text',
      timestamp: '2:28 PM',
      isOwn: true,
    },
  ];

  // Load messages when user is selected
  useEffect(() => {
    if (selectedUser) {
      setMessages(sampleMessages);
    } else {
      setMessages([]);
    }
    setNewMessage('');
  }, [selectedUser]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() && selectedUser) {
      const message: Message = {
        id: Date.now().toString(),
        sender: {
          id: 'user',
          name: 'You',
          avatar: 'https://placehold.co/40x40/555555/FFFFFF?text=You',
        },
        content: newMessage.trim(),
        type: 'text',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwn: true,
      };
      
      setMessages(prev => [...prev, message]);
      setNewMessage('');
      
      // Simulate reply after 2 seconds
      setTimeout(() => {
        const reply: Message = {
          id: (Date.now() + 1).toString(),
          sender: selectedUser,
          content: selectedUser.name === 'Muyiwa Andela' 
            ? 'Perfect! I\'ll prepare everything for Saturday.' 
            : 'Thanks for the quick response!',
          type: 'text',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isOwn: false,
        };
        setMessages(prev => [...prev, reply]);
      }, 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  const formatTimeAgo = (time: string) => {
    const now = new Date();
    const messageTime = new Date();
    const [hours, minutes] = time.split(':').map(Number);
    messageTime.setHours(hours, minutes);
    
    const diffInMinutes = (now.getTime() - messageTime.getTime()) / (1000 * 60);
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${Math.floor(diffInMinutes)}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return 'Yesterday';
  };

  return (
    <div className="min-h-screen w-full bg-white dark:bg-white text-gray-900 dark:text-gray-900">
      <Header title="Messages" />
      <div className="h-screen w-full bg-white dark:bg-white text-gray-900 dark:text-gray-900 flex">
      
        {/* Sidebar - Users List */}
        <div className={`
          w-full sm:w-[400px] border-r border-[#DBDBE3] flex flex-col bg-white dark:bg-white
          ${selectedUser ? 'hidden sm:flex' : 'flex'}
        `}>
          {/* Search */}
          <div className="p-4 border-b border-[#DBDBE3]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search messages"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-300 rounded-full text-[14px] font-medium text-[#4B4B56] dark:text-[#4B4B56] focus:outline-none focus:ring-2 focus:ring-[#220084]"
              />
            </div>
          </div>

          {/* Users List */}
          <div className="flex-1 overflow-y-auto">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                onClick={() => setSelectedUser(user)}
                className={`p-4 border-b border-gray-100 dark:border-gray-100 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-50 transition-colors flex items-center space-x-3 ${
                  selectedUser?.id === user.id ? 'bg-purple-50 border-r-2 border-[#220084]' : ''
                }`}
              >
                <div className="relative">
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />
                  {user.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[16px] font-semibold text-[#32323E] truncate">{user.name}</span>
                    <span className="text-[12px] text-[#95959F]">{formatTimeAgo(user.time)}</span>
                  </div>
                  <p className="text-[14px] text-[#4B4B56] truncate mt-1">{user.lastMessage}</p>
                  {user.unreadCount && user.unreadCount > 0 && (
                    <div className="w-5 h-5 bg-[#220084] text-white text-[10px] rounded-full flex items-center justify-center mt-1">
                      {user.unreadCount > 9 ? '9+' : user.unreadCount}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className={`
          flex-1 flex-col bg-gray-50 dark:bg-gray-50
          ${!selectedUser ? 'hidden sm:flex' : 'flex'}
        `}>
          {selectedUser ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-[#DBDBE3] bg-white dark:bg-white flex items-center justify-between">
                {/* Back button for mobile */}
                <button
                  onClick={() => setSelectedUser(null)}
                  className="p-2 mr-2 sm:hidden hover:bg-gray-100 rounded-full transition-colors"
                >
                  <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <Image
                    src={selectedUser.avatar}
                    alt={selectedUser.name}
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />
                  <div className="min-w-0">
                    <div className="text-[16px] font-semibold text-[#32323E] truncate">{selectedUser.name}</div>
                    <div className="flex items-center space-x-2 text-[12px] text-[#95959F]">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Online</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="px-4 py-2 bg-white border border-gray-200 text-black rounded-full text-[14px] font-medium whitespace-nowrap ml-2 hidden sm:inline-flex">
                    View work details
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors hidden sm:block">
                    <Phone className="h-4 w-4 text-gray-500" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors hidden sm:block">
                    <Paperclip className="h-4 w-4 text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Messages Container */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}
                  >
                    <div
                      className={`max-w-[70%] p-3 rounded-2xl ${
                        message.isOwn
                          ? 'bg-[#220084] text-white rounded-br-sm'
                          : 'bg-white border border-gray-200 dark:border-gray-700 rounded-bl-sm'
                      }`}
                    >
                      {message.type === 'text' ? (
                        <p className="text-[14px] leading-relaxed">{message.content}</p>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <Paperclip className="h-4 w-4 text-[#220084]" />
                          <span className="text-[12px] text-[#220084]">{message.fileName}</span>
                        </div>
                      )}
                      <div className="flex items-center justify-end mt-1 text-[11px] opacity-75">
                        <span>{message.timestamp}</span>
                        {message.isOwn && <div className="ml-1">✓✓</div>}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-[#DBDBE3] bg-white dark:bg-white">
                <form onSubmit={handleSendMessage} className="flex items-end space-x-2">
                  <div className="flex-1 relative">
                    <input
                      ref={inputRef}
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type a message..."
                      className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-300 rounded-full text-[14px] font-medium text-[#4B4B56] dark:text-[#4B4B56] focus:outline-none focus:ring-2 focus:ring-[#220084] resize-none"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <Smile className="h-5 w-5 text-gray-400" />
                    </button>
                  </div>
                  <button
                    type="submit"
                    disabled={!newMessage.trim()}
                    className={`p-3 rounded-full transition-all ${
                      newMessage.trim()
                        ? 'bg-[#220084] text-white hover:bg-purple-700'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <Send className="h-5 w-5" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <Paperclip className="h-4 w-4 text-gray-500" />
                  </button>
                </form>
              </div>
            </>
          ) : (
            // Empty state for desktop view
            <div className="hidden sm:flex flex-1 flex-col items-center justify-center p-8 text-center">
              <div className="w-16 h-16 bg-[#220084] rounded-full flex items-center justify-center mb-4">
                <MessageCircle className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-[18px] font-semibold text-[#32323E] mb-2">No chat selected</h3>
              <p className="text-[14px] text-[#95959F]">Select a conversation to start messaging</p>
            </div>
          )}
        </div>
      </div>
    </div>
    
  );
};

export default MessagePage;
