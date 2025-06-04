"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { UserPlus, User, Mail, Lock, Loader, Eye, EyeOff, BookOpen, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    nm_lengkap: "",
    email: "",
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Registration failed");
      }

      router.push("/login"); // Redirect ke login setelah berhasil daftar
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
        .stagger-5 {
          animation-delay: 0.5s;
        }
      `}</style>

      <div className="w-full max-w-md">
        {/* Back to Login Link */}
        <div className="mb-4 animate-fadeInUp">
          <Link href="/login" className="inline-flex items-center gap-2 text-gray-600 hover:text-teal-600 transition-colors duration-200">
            <ArrowLeft size={20} />
            <span>Back to Login</span>
          </Link>
        </div>

        {/* Header Section */}
        <div className="text-center mb-8 animate-fadeInUp">
          {/* Background Glow Effect */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-teal-400/20 via-blue-400/20 to-purple-400/20 rounded-3xl blur-2xl opacity-50 animate-float"></div>

            <div className="relative z-10">
              {/* Icon Header */}
              <div className="flex justify-center mb-6 animate-fadeInUp stagger-1">
                <div className="p-4 bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl shadow-md border border-teal-100">
                  <UserPlus className="text-teal-600" size={48} />
                </div>
              </div>

              {/* Main Title */}
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-700 via-blue-600 to-teal-600 bg-clip-text text-transparent mb-4 animate-fadeInUp stagger-2">Join Us</h1>

              {/* Underline decoration */}
              <div className="w-16 h-1 bg-gradient-to-r from-teal-500 to-blue-500 mx-auto rounded-full mb-4 animate-fadeInUp stagger-3"></div>

              {/* Subtitle */}
              <p className="text-gray-600 text-lg animate-fadeInUp stagger-4">Create your account to start organizing your notes</p>
            </div>
          </div>
        </div>

        {/* Register Form */}
        <div className="animate-fadeInUp" style={{ animationDelay: "0.5s" }}>
          <Card className="bg-gradient-to-br from-white to-gray-50 border-0 shadow-2xl rounded-3xl overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-center text-2xl font-bold text-gray-800">Create Account</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleRegister} className="space-y-6">
                {/* Full Name Input */}
                <div className="space-y-2 animate-fadeInUp stagger-1">
                  <Label htmlFor="nm_lengkap" className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                    <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                    Full Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <Input
                      id="nm_lengkap"
                      name="nm_lengkap"
                      value={form.nm_lengkap}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                      className="h-12 pl-10 pr-4 text-lg border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div className="space-y-2 animate-fadeInUp stagger-2">
                  <Label htmlFor="email" className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="you@example.com"
                      className="h-12 pl-10 pr-4 text-lg border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Username Input */}
                <div className="space-y-2 animate-fadeInUp stagger-3">
                  <Label htmlFor="username" className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                    Username
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <Input
                      id="username"
                      name="username"
                      value={form.username}
                      onChange={handleChange}
                      required
                      placeholder="Choose a unique username"
                      className="h-12 pl-10 pr-4 text-lg border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-2 animate-fadeInUp stagger-4">
                  <Label htmlFor="password" className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={form.password}
                      onChange={handleChange}
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

                {/* Register Button */}
                <div className="animate-fadeInUp stagger-5">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <Loader className="animate-spin" size={20} />
                        Creating Account...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <UserPlus size={20} />
                        Create Account
                      </div>
                    )}
                  </Button>
                </div>
              </form>

              {/* Login Link */}
              <div className="mt-6 text-center animate-fadeInUp" style={{ animationDelay: "0.8s" }}>
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <Link href="/login" className="text-teal-600 hover:text-teal-700 font-semibold transition-colors duration-200">
                    Sign in here
                  </Link>
                </p>
              </div>
            </CardContent>

            {/* Bottom Gradient */}
            <div className="h-2 bg-gradient-to-r from-teal-500 via-blue-500 to-teal-500"></div>
          </Card>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center animate-fadeInUp" style={{ animationDelay: "0.9s" }}>
          <p className="text-gray-500 text-sm">By creating an account, you agree to our terms and privacy policy</p>
        </div>

        {/* Decorative Elements */}
        <div className="fixed top-10 left-10 w-20 h-20 bg-gradient-to-br from-teal-200 to-blue-200 rounded-full blur-xl opacity-30 animate-float"></div>
        <div className="fixed bottom-10 right-10 w-16 h-16 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full blur-xl opacity-30 animate-float" style={{ animationDelay: "1s" }}></div>
        <div className="fixed top-1/2 left-5 w-12 h-12 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-xl opacity-20 animate-float" style={{ animationDelay: "2s" }}></div>
      </div>
    </div>
  );
}
