"use client";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import useDashboard from "@/lib/hooks/useDashboard";

export default function DashboardLayout({ children }) {
  const {
    user,
    notifications,
    sidebarOpen,
    dropdownOpen,
    toggleSidebar,
    toggleDropdown,
    dropdownRef,
    handleLogout,
    links,
    pathname,
    notifOpen,
    toggleNotifications,
    notifRef,
  } = useDashboard();

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={toggleSidebar}
        onLogout={handleLogout}
        links={links}
        pathname={pathname}
      />
      <div className="flex-1 flex flex-col">
        <Header
          user={user}
          notifications={notifications}
          onToggleSidebar={toggleSidebar}
          handleLogout={handleLogout}
          dropdownOpen={dropdownOpen}
          toggleDropdown={toggleDropdown}
          dropdownRef={dropdownRef}
          notifOpen={notifOpen} // kirim ke Header
          toggleNotifications={toggleNotifications} // kirim ke Header
          notifRef={notifRef} // kirim ke Header
        />

        <main className="p-4 md:p-6 md:pl-64">{children}</main>
      </div>
    </div>
  );
}
