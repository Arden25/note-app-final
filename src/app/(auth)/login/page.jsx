"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { LogIn, User, Lock, Loader, Eye, EyeOff, BookOpen } from "lucide-react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Login failed");
      }

      const data = await res.json();
      localStorage.setItem("token", data.token);

      window.location.href = "/notes";
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center p-4">
      {/* Custom CSS untuk animasi - konsisten dengan halaman lain */}
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

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        .animate-pulse-slow {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
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
      `}</style>

      <div className="w-full max-w-md">
        {/* Header Section */}
        <div className="text-center mb-8 animate-fadeInUp">
          {/* Background Glow Effect */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-teal-400/20 via-blue-400/20 to-purple-400/20 rounded-3xl blur-2xl opacity-50 animate-float"></div>

            <div className="relative z-10">
              {/* Icon Header - Changed from LogIn to BookOpen */}
              <div className="flex justify-center mb-6 animate-fadeInUp stagger-1">
                <div className="p-4 bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl shadow-md border border-teal-100">
                  <BookOpen className="text-teal-600" size={48} />
                </div>
              </div>

              {/* Main Title */}
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-700 via-blue-600 to-teal-600 bg-clip-text text-transparent mb-4 animate-fadeInUp stagger-2">Welcome Back</h1>

              {/* Underline decoration */}
              <div className="w-16 h-1 bg-gradient-to-r from-teal-500 to-blue-500 mx-auto rounded-full mb-4 animate-fadeInUp stagger-3"></div>

              {/* Subtitle */}
              <p className="text-gray-600 text-lg animate-fadeInUp stagger-4">Sign in to access your notes</p>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <div className="animate-fadeInUp" style={{ animationDelay: "0.5s" }}>
          <Card className="bg-gradient-to-br from-white to-gray-50 border-0 shadow-2xl rounded-3xl overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-center text-2xl font-bold text-gray-800">Login</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleLogin} className="space-y-6">
                {/* Username Input */}
                <div className="space-y-2 animate-fadeInUp stagger-1">
                  <Label htmlFor="username" className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                    <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                    Username
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <Input
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      placeholder="Masukan Username"
                      className="h-12 pl-10 pr-4 text-lg border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-2 animate-fadeInUp stagger-2">
                  <Label htmlFor="password" className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="••••••••"
                      className="h-12 pl-10 pr-12 text-lg border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-300"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200">
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="animate-fadeInUp bg-red-50 border border-red-200 rounded-xl p-3">
                    <p className="text-red-600 text-sm font-medium">{error}</p>
                  </div>
                )}

                {/* Login Button */}
                <div className="animate-fadeInUp stagger-3">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <Loader className="animate-spin" size={20} />
                        Logging in...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <LogIn size={20} />
                        Login
                      </div>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>

            {/* Bottom Gradient */}
            <div className="h-2 bg-gradient-to-r from-teal-500 via-blue-500 to-teal-500"></div>
          </Card>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center animate-fadeInUp" style={{ animationDelay: "0.7s" }}>
          <p className="text-gray-500 text-sm">Secure login with encrypted data protection</p>
        </div>

        {/* Decorative Elements */}
        <div className="fixed top-10 left-10 w-20 h-20 bg-gradient-to-br from-teal-200 to-blue-200 rounded-full blur-xl opacity-30 animate-float"></div>
        <div className="fixed bottom-10 right-10 w-16 h-16 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full blur-xl opacity-30 animate-float" style={{ animationDelay: "1s" }}></div>
      </div>
    </div>
  );
}
