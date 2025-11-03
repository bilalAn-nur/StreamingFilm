"use client";

import NotificationDropdown from "./NotificationDropdown.jsx";
import ProfileDropdown from "./ProfileDropdown.jsx";
import { BarIcon } from "../icons/index.js";

export default function Header({
  onToggleSidebar,
  user,
  notifications,
  dropdownOpen,
  toggleDropdown,
  dropdownRef,
  handleLogout,
  toggleNotifications,
  notifRef,
  notifOpen,
}) {
  return (
    <header className="sticky top-0 z-20 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 flex justify-between items-center p-4">
      <div className="flex items-center gap-3">
        <button
          className="md:hidden p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition"
          onClick={onToggleSidebar}
        >
          <BarIcon />
        </button>
      </div>

      <div className="flex items-center gap-3">
        <NotificationDropdown
          notifRef={notifRef} // gunakan prop, bukan ref
          open={notifOpen}
          toggle={toggleNotifications} // pastikan toggle diterima
          notifications={notifications}
        />
        <ProfileDropdown
          user={user}
          open={dropdownOpen}
          toggle={toggleDropdown}
          dropdownRef={dropdownRef}
          onLogout={handleLogout}
        />
      </div>
    </header>
  );
}
