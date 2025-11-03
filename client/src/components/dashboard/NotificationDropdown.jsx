"use client";

import { BellIcon } from "../icons";

export default function NotificationDropdown({
  toggle,
  open,
  notifications = [],
  notifRef, // gunakan prop biasa
}) {
  return (
    <div className="relative" ref={notifRef}>
      <button
        className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition relative"
        onClick={toggle} // toggle sudah pasti diterima
      >
        <BellIcon />
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-60 bg-gray-800 border border-gray-700 rounded-lg shadow-lg text-sm z-50">
          <ul className="flex flex-col divide-y divide-gray-700 max-h-64 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((notif, i) => (
                <li key={i} className="p-2 hover:bg-gray-700 cursor-pointer">
                  {notif.message}
                </li>
              ))
            ) : (
              <li className="p-2 text-gray-400">No notifications</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
