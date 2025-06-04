"use client";
import { BookOpen, Mail, Phone, MapPin, Github, Twitter, Linkedin, Heart } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      {/* Custom CSS untuk animasi */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        @keyframes pulse-heart {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }
        .animate-pulse-heart {
          animation: pulse-heart 1.5s ease-in-out infinite;
        }

        .footer-blur {
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
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
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          background-size: 200% 100%;
          animation: shimmer 3s infinite;
        }
      `}</style>

      <footer className="relative mt-auto footer-blur border-t border-white/10">
        {/* Background gradient overlay - sama seperti navbar */}
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600/95 via-blue-600/95 to-teal-600/95"></div>

        <div className="relative">
          {/* Main Footer Content */}
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              {/* Brand Section */}
              <div className="flex flex-col md:items-start items-center">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20 animate-float">
                    <BookOpen className="text-white" size={24} />
                  </div>
                  <div className="text-white font-extrabold text-2xl tracking-tight">
                    Notes<span className="text-teal-200">App</span>
                  </div>
                </div>
                <p className="text-white/80 text-center md:text-left max-w-sm">Platform terbaik untuk mencatat dan mengorganisir ide-ide kreatif Anda.</p>
              </div>

              {/* Quick Links */}
              <div className="flex flex-col items-center">
                <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                  <div className="w-2 h-6 bg-teal-200 rounded-full"></div>
                  Quick Links
                </h3>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link href="/" className="text-white/80 hover:text-white transition-all duration-300 hover:scale-105 px-3 py-1 rounded-lg hover:bg-white/10">
                    Home
                  </Link>
                  <Link href="/about" className="text-white/80 hover:text-white transition-all duration-300 hover:scale-105 px-3 py-1 rounded-lg hover:bg-white/10">
                    About
                  </Link>
                  <Link href="/notes" className="text-white/80 hover:text-white transition-all duration-300 hover:scale-105 px-3 py-1 rounded-lg hover:bg-white/10">
                    Notes
                  </Link>
                </div>
              </div>

              {/* Contact */}
              <div className="flex flex-col items-center md:items-end">
                <div className="text-white/70 text-center md:text-right text-sm">
                  <p className="flex items-center gap-1 justify-center md:justify-end">
                    <Mail size={14} className="text-teal-200" />
                    ariadennya2503@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section dengan shimmer effect */}
          <div className="border-t border-white/10 animate-shimmer">
            <div className="max-w-7xl mx-auto px-6 py-4">
              <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-white/70 text-sm">
                <p>© {currentYear} NotesApp. All rights reserved.</p>
                <p className="flex items-center gap-1">
                  Made with
                  <Heart size={14} className="text-red-400 animate-pulse-heart" fill="currentColor" />
                  by <span className="text-teal-200 font-semibold">KasDoel</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
