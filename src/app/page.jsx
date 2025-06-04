"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { Plus, Eye, Edit3, Sparkles, BookOpen, PenTool } from "lucide-react";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsLoggedIn(false);
    } else {
      try {
        const decodedToken = jwt.decode(token);
        setIsLoggedIn(decodedToken?.userId ? true : false);
      } catch {
        setIsLoggedIn(false);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-secondary p-4">
      {/* Custom CSS untuk animasi - mengikuti style About Me */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        @keyframes pulse-gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-pulse-gradient {
          background-size: 200% 200%;
          animation: pulse-gradient 3s ease-in-out infinite;
        }

        .stagger-1 {
          animation-delay: 0.1s;
        }
        .stagger-2 {
          animation-delay: 0.2s;
        }
        .stagger-3 {
          animation-delay: 0.3s;
        }
        .stagger-4 {
          animation-delay: 0.4s;
        }
        .stagger-5 {
          animation-delay: 0.5s;
        }
        .stagger-6 {
          animation-delay: 0.6s;
        }
      `}</style>

      {/* Hero Section */}
      <div className="flex flex-col justify-center items-center min-h-screen py-20 animate-fadeInUp">
        {/* Main Hero Content */}
        <div className="text-center max-w-6xl mx-auto px-4 relative">
          {/* Background Glow Effect */}
          <div className="absolute -inset-8 bg-gradient-to-r from-teal-400/20 via-blue-400/20 to-purple-400/20 rounded-3xl blur-3xl opacity-50 animate-float"></div>

          <div className="relative z-10 space-y-8">
            {/* Welcome Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-100 to-blue-100 rounded-full border border-teal-200 animate-fadeInUp stagger-1">
              <Sparkles className="text-teal-600" size={16} />
              <span className="text-teal-700 font-medium text-sm">Welcome to the Future of Note-Taking</span>
            </div>

            {/* Main Title */}
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-teal-700 via-blue-600 to-teal-600 bg-clip-text text-transparent mb-6 leading-tight animate-fadeInUp stagger-2">NotesApp</h1>

            {/* Underline decoration - mengikuti style About Me */}
            <div className="w-32 h-1 bg-gradient-to-r from-teal-500 to-blue-500 mx-auto rounded-full mb-8 animate-fadeInUp stagger-3"></div>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed animate-fadeInUp stagger-4">
              Capture your thoughts, organize your ideas, and turn inspiration into action with our
              <span className="font-semibold text-teal-700"> powerful</span> and
              <span className="font-semibold text-blue-700"> intuitive</span> note-taking platform.
            </p>

            {/* CTA Button */}
            <div className="animate-fadeInUp stagger-5">
              <Link href={isLoggedIn ? "/notes/create" : "/login"}>
                <button className="group relative px-12 py-4 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white text-xl font-semibold rounded-full shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-3xl animate-pulse-gradient">
                  <div className="absolute -inset-2 bg-gradient-to-r from-teal-400 to-blue-400 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                  <div className="relative flex items-center gap-3">
                    <Plus size={24} />
                    Create Your First Note
                  </div>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-4 py-20 animate-fadeInUp stagger-6">
        {/* Section Header - mengikuti style About Me */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-700 to-blue-600 bg-clip-text text-transparent mb-6">Powerful Features</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-500 to-blue-500 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">Everything you need to capture, organize, and manage your thoughts effectively</p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Create Notes",
              link: "/notes/create",
              description: "Transform your ideas into organized notes with our intuitive editor. Add rich content, format text, and structure your thoughts beautifully.",
              icon: <PenTool size={32} />,
              gradient: "from-teal-50 to-blue-50",
              borderColor: "border-teal-500",
              iconColor: "text-teal-600",
              hoverColor: "hover:text-teal-700",
            },
            {
              title: "Browse Notes",
              link: "/notes",
              description: "Access all your notes in one organized dashboard. Search, filter, and find exactly what you're looking for in seconds.",
              icon: <BookOpen size={32} />,
              gradient: "from-blue-50 to-indigo-50",
              borderColor: "border-blue-500",
              iconColor: "text-blue-600",
              hoverColor: "hover:text-blue-700",
            },
            {
              title: "Edit & Update",
              link: "/",
              description: "Seamlessly modify and update your notes. Keep your information current and refine your thoughts as they evolve.",
              icon: <Edit3 size={32} />,
              gradient: "from-indigo-50 to-purple-50",
              borderColor: "border-indigo-500",
              iconColor: "text-indigo-600",
              hoverColor: "hover:text-indigo-700",
            },
          ].map((feature, index) => (
            <Link href={feature.link} key={feature.title}>
              <div
                className={`relative bg-gradient-to-br ${feature.gradient} p-8 rounded-2xl shadow-md border-l-4 ${feature.borderColor} 
                  transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl group overflow-hidden cursor-pointer animate-fadeInUp`}
                style={{ animationDelay: `${0.7 + index * 0.1}s` }}
              >
                {/* Background Decoration */}
                <div className="absolute top-4 right-4 opacity-10 pointer-events-none">
                  <div className={`${feature.iconColor} opacity-20`}>{feature.icon}</div>
                </div>

                {/* Content */}
                <div className="relative z-10 space-y-4">
                  <div className={`${feature.iconColor} group-hover:scale-110 transition-transform duration-300 inline-block`}>{feature.icon}</div>

                  <h3 className={`text-2xl font-bold text-gray-800 ${feature.hoverColor} transition-colors duration-200`}>{feature.title}</h3>

                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>

                {/* Decorative Corner - mengikuti style About Me */}
                <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-teal-200/30 to-transparent rounded-tl-full"></div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="max-w-4xl mx-auto px-4 py-20 text-center animate-fadeInUp" style={{ animationDelay: "1s" }}>
        <div className="bg-gradient-to-br from-teal-50 to-blue-50 p-12 rounded-3xl shadow-lg border border-teal-100">
          <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-teal-700 to-blue-600 bg-clip-text text-transparent mb-6">Ready to Get Started?</h3>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">Join thousands of users who have already transformed their productivity with NotesApp.</p>
          <Link href={isLoggedIn ? "/notes" : "/login"}>
            <button className="px-10 py-4 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white text-lg font-semibold rounded-full shadow-lg transform transition-all duration-300 hover:scale-105">
              {isLoggedIn ? "View My Notes" : "Get Started Now"}
            </button>
          </Link>
        </div>
      </section>

      {/* Footer spacing */}
      <div className="mt-16"></div>
    </div>
  );
}
