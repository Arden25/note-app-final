"use client";
import { Menu, X, Home, Info, FileText, Plus, LogOut, LogIn, UserPlus, BookOpen } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/login");
    closeSidebar();
  };

  const isActive = (href) => {
    if (href === "/") {
      return pathname === "/";
    }
    const regex = new RegExp(`^${href}(/)?$`);
    return regex.test(pathname);
  };

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  return (
    <>
      {/* Custom CSS untuk animasi */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out forwards;
        }

        @keyframes shimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }
        .animate-shimmer {
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }

        .nav-blur {
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
      `}</style>

      <div className="w-full sticky top-0 z-50 nav-blur border-b border-white/10">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600/95 via-blue-600/95 to-teal-600/95"></div>

        <nav className="relative px-6 py-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            {/* Logo/Brand */}
            <div className="flex items-center gap-3 animate-fadeIn">
              <div className="p-2 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
                <BookOpen className="text-white" size={24} />
              </div>
              <div className="text-white font-extrabold text-2xl md:text-3xl tracking-tight">
                Notes<span className="text-teal-200">App</span>
              </div>
            </div>

            {/* Hamburger untuk mobile */}
            <div className="flex items-center space-x-4 md:hidden">
              <button
                aria-label="Toggle menu"
                onClick={toggleSidebar}
                className="p-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300"
              >
                <Menu className="text-white" size={24} />
              </button>
            </div>

            {/* Menu desktop */}
            <div className="hidden md:flex space-x-2 items-center animate-fadeIn">
              <Link
                href="/"
                className={`relative px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center gap-2
                  ${isActive("/") ? "bg-white/20 text-white shadow-lg backdrop-blur-sm border border-white/30" : "text-white/80 hover:bg-white/10 hover:text-white"}`}
              >
                <Home size={18} />
                Home
                {isActive("/") && <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-white rounded-full opacity-60" />}
              </Link>

              <Link
                href="/about"
                className={`relative px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center gap-2
                  ${isActive("/about") ? "bg-white/20 text-white shadow-lg backdrop-blur-sm border border-white/30" : "text-white/80 hover:bg-white/10 hover:text-white"}`}
              >
                <Info size={18} />
                About Us
                {isActive("/about") && <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-white rounded-full opacity-60" />}
              </Link>

              <Link
                href="/notes"
                className={`relative px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center gap-2
                  ${isActive("/notes") ? "bg-white/20 text-white shadow-lg backdrop-blur-sm border border-white/30" : "text-white/80 hover:bg-white/10 hover:text-white"}`}
              >
                <FileText size={18} />
                List Notes
                {isActive("/notes") && <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-white rounded-full opacity-60" />}
              </Link>

              {isLoggedIn && (
                <Link
                  href="/notes/create"
                  className={`relative px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center gap-2
                    ${isActive("/notes/create") ? "bg-white/20 text-white shadow-lg backdrop-blur-sm border border-white/30" : "text-white/80 hover:bg-white/10 hover:text-white"}`}
                >
                  <Plus size={18} />
                  Create Notes
                  {isActive("/notes/create") && <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-white rounded-full opacity-60" />}
                </Link>
              )}

              <div className="w-px h-6 bg-white/20 mx-2"></div>

              {isLoggedIn ? (
                <Button size="sm" onClick={handleLogout} className="bg-red-500/90 hover:bg-red-600 text-white border border-red-400/30 backdrop-blur-sm transition-all duration-300 hover:scale-105 shadow-lg flex items-center gap-2">
                  <LogOut size={16} />
                  Logout
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Link href="/login" passHref>
                    <Button size="sm" className="bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-sm transition-all duration-300 hover:scale-105 shadow-lg flex items-center gap-2">
                      <LogIn size={16} />
                      Login
                    </Button>
                  </Link>
                  <Link href="/register" passHref>
                    <Button size="sm" className="bg-white text-teal-600 hover:bg-gray-100 border border-white/50 transition-all duration-300 hover:scale-105 shadow-lg flex items-center gap-2 font-semibold">
                      <UserPlus size={16} />
                      Register
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ease-in-out
          ${isOpen ? "visible bg-black/50 backdrop-blur-sm opacity-100" : "invisible opacity-0"}`}
        onClick={closeSidebar}
      >
        {/* Mobile Sidebar */}
        <div
          className={`w-80 bg-gradient-to-br from-teal-600 to-blue-600 p-6 space-y-6 transform transition-all duration-300 ease-in-out h-full shadow-2xl border-r border-white/10
            ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Mobile Header */}
          <div className="flex items-center justify-between animate-slideDown">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
                <BookOpen className="text-white" size={20} />
              </div>
              <div className="text-white font-extrabold text-xl tracking-tight">
                Notes<span className="text-teal-200">App</span>
              </div>
            </div>
            <button
              aria-label="Close menu"
              onClick={closeSidebar}
              className="p-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300"
            >
              <X className="text-white" size={20} />
            </button>
          </div>

          {/* Mobile Navigation */}
          <nav className="flex flex-col space-y-2 mt-8">
            <Link
              href="/"
              onClick={closeSidebar}
              className={`relative px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-3
                ${isActive("/") ? "bg-white/20 text-white shadow-lg backdrop-blur-sm border border-white/30" : "text-white/90 hover:bg-white/10 hover:text-white"}`}
            >
              <Home size={20} />
              Home
              {isActive("/") && <div className="absolute right-4 w-2 h-2 bg-white rounded-full opacity-80" />}
            </Link>

            <Link
              href="/about"
              onClick={closeSidebar}
              className={`relative px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-3
                ${isActive("/about") ? "bg-white/20 text-white shadow-lg backdrop-blur-sm border border-white/30" : "text-white/90 hover:bg-white/10 hover:text-white"}`}
            >
              <Info size={20} />
              About Us
              {isActive("/about") && <div className="absolute right-4 w-2 h-2 bg-white rounded-full opacity-80" />}
            </Link>

            <Link
              href="/notes"
              onClick={closeSidebar}
              className={`relative px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-3
                ${isActive("/notes") ? "bg-white/20 text-white shadow-lg backdrop-blur-sm border border-white/30" : "text-white/90 hover:bg-white/10 hover:text-white"}`}
            >
              <FileText size={20} />
              List Notes
              {isActive("/notes") && <div className="absolute right-4 w-2 h-2 bg-white rounded-full opacity-80" />}
            </Link>

            {isLoggedIn && (
              <Link
                href="/notes/create"
                onClick={closeSidebar}
                className={`relative px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-3
                  ${isActive("/notes/create") ? "bg-white/20 text-white shadow-lg backdrop-blur-sm border border-white/30" : "text-white/90 hover:bg-white/10 hover:text-white"}`}
              >
                <Plus size={20} />
                Create Notes
                {isActive("/notes/create") && <div className="absolute right-4 w-2 h-2 bg-white rounded-full opacity-80" />}
              </Link>
            )}

            <div className="my-4 h-px bg-white/20"></div>

            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="text-white font-medium px-4 py-3 rounded-xl hover:bg-red-500/20 hover:text-red-100 transition-all duration-300 flex items-center gap-3 border border-transparent hover:border-red-400/30"
              >
                <LogOut size={20} />
                Logout
              </button>
            ) : (
              <div className="space-y-2">
                <Link href="/login" onClick={closeSidebar} className="text-white font-medium px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-300 flex items-center gap-3 border border-white/20">
                  <LogIn size={20} />
                  Login
                </Link>
                <Link href="/register" onClick={closeSidebar} className="text-teal-600 bg-white font-semibold px-4 py-3 rounded-xl hover:bg-gray-100 transition-all duration-300 flex items-center gap-3 shadow-lg">
                  <UserPlus size={20} />
                  Register
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </>
  );
}
