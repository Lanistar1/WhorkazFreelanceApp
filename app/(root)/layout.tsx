import { Navbar } from "@/components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-screen w-screen overflow-hidden">
      {/* Sidebar / Navbar */}
      <div className="hidden lg:fixed lg:top-0 lg:left-0 lg:h-screen lg:w-[305px] lg:z-50 lg:block">
        <Navbar />
      </div>

      {/* Content Area */}
      <div className="h-screen overflow-auto lg:ml-[305px]">
        <div className="w-full min-h-screen overflow-x-hidden">
          {children}
        </div>
      </div>

      {/* Mobile Navbar (Bottom Tab) */}
      <div className="fixed bottom-0 left-0 w-full z-50 lg:hidden">
        <Navbar />
      </div>
    </main>
  );
}







// import { Navbar } from "@/components/Navbar";

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <main className="h-screen w-screen overflow-hidden">
//       {/* Fixed Navbar */}
//       <div className="fixed top-0 left-0 h-full z-50 overflow-auto">
//         <Navbar />
//       </div>

//       {/* Content area */}
//       <div className="ml-[305px] h-full overflow-auto">
//         <div className="w-full h-full overflow-x-hidden">
//           {children}
//         </div>
//       </div>
//     </main>
//   );
// }