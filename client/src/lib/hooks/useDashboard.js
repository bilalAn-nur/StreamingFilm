"use client";
import { useState, useRef, useEffect } from "react";
// import { getUser, refreshAndStoreAccessToken } from "@/lib/handlers/dashboard";
import CONFIG from "@/config";
import { signout as signoutAction } from "@/lib/actions/authAction.js";
import { usePathname } from "next/navigation";
import {
  DashboardIcon,
  MovieIcon,
  SettingsIcon,
  UploadIcon,
  UserIcon,
} from "@/components/icons";
import {
  getUser,
  refreshAndStoreAccessToken,
} from "../actions/dashboardAction";

export default function useDashboard() {
  const [user, setUser] = useState(null);

  // === Notifications ===
  const [notifications, setNotifications] = useState([
    { message: "New comment on your post", time: Date.now() },
    { message: "Server maintenance at 12:00", time: Date.now() - 60000 },
    { message: "Update available", time: Date.now() - 120000 },
  ]);
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef();

  // === Sidebar & Profile Dropdown ===
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const pathname = usePathname();

  // === Fetch user once ===
  useEffect(() => {
    async function fetchUser() {
      try {
        await refreshAndStoreAccessToken(CONFIG.BASE_URL);
        const data = await getUser();
        setUser(data?.user || null);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    }
    fetchUser();
  }, []);

  // === Outside click handling ===
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // === Toggles ===
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const toggleNotifications = () => setNotifOpen((prev) => !prev);

  // === Add notification ===
  const addNotification = (message) => {
    setNotifications((prev) => [{ message, time: Date.now() }, ...prev]);
  };

  // === Logout ===
  const handleLogout = async () => {
    try {
      await signoutAction();
      setUser(null);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  // === Sidebar links ===
  const links = [
    { name: "Dashboard", href: "/dashboard", icon: <DashboardIcon /> },
    { name: "Movies", href: "/movie", icon: <MovieIcon /> },
    { name: "Upload", href: "/upload", icon: <UploadIcon /> },
    { name: "Users", href: "/users", icon: <UserIcon /> },
    { name: "Settings", href: "/settings", icon: <SettingsIcon /> },
  ];

  return {
    user,
    pathname,
    links,
    sidebarOpen,
    toggleSidebar,
    dropdownOpen,
    toggleDropdown,
    dropdownRef,
    notifications,
    notifOpen,
    notifRef,
    toggleNotifications,
    addNotification,
    handleLogout,
  };
}
