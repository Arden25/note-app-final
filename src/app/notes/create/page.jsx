"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import jwt from "jsonwebtoken";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { PlusCircle, ArrowLeft, Save, Loader } from "lucide-react";

export default function CreateNotePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const savedToken = localStorage.getItem("token");

    if (!savedToken) {
      router.push("/");
    } else {
      try {
        const decodedToken = jwt.decode(savedToken);
        setUser(decodedToken.userId);
        setToken(savedToken);
      } catch (error) {
        console.error("Error decoding token", error);
        router.push("/");
      }
    }
  }, [router]);

  const handleCreate = async () => {
    if (!title.trim() || !content.trim()) {
      toast({
        variant: "destructive",
        title: "Gagal menyimpan",
        description: "Judul dan isi tidak boleh kosong.",
      });
      return;
    }

    if (!token || !user) {
      toast({
        variant: "destructive",
        title: "Gagal menyimpan",
        description: "Token atau data pengguna tidak valid.",
      });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id_user: user,
          title,
          content,
        }),
      });

      if (!res.ok) throw new Error("Gagal menambahkan catatan");

      toast({
        className: cn("bg-green-500", "text-white"),
        title: "Catatan dibuat",
        description: "Catatan berhasil ditambahkan.",
      });

      router.push("/notes");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Gagal menyimpan",
        description: "Terjadi kesalahan saat menambahkan catatan.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary p-4">
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

      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center py-12 animate-fadeInUp">
          {/* Background Glow Effect */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-teal-400/20 via-blue-400/20 to-purple-400/20 rounded-3xl blur-2xl opacity-50 animate-float"></div>

            <div className="relative z-10">
              {/* Icon Header */}
              <div className="flex justify-center mb-6 animate-fadeInUp stagger-1">
                <div className="p-4 bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl shadow-md border border-teal-100">
                  <PlusCircle className="text-teal-600" size={48} />
                </div>
              </div>

              {/* Main Title */}
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-teal-700 via-blue-600 to-teal-600 bg-clip-text text-transparent mb-4 animate-fadeInUp stagger-2">Create New Note</h1>

              {/* Underline decoration */}
              <div className="w-24 h-1 bg-gradient-to-r from-teal-500 to-blue-500 mx-auto rounded-full mb-6 animate-fadeInUp stagger-3"></div>

              {/* Subtitle */}
              <p className="text-gray-600 text-lg max-w-2xl mx-auto animate-fadeInUp stagger-4">Share your thoughts and ideas with the world</p>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="animate-fadeInUp" style={{ animationDelay: "0.5s" }}>
          <Card className="bg-gradient-to-br from-gray-50 to-white border-0 shadow-2xl rounded-3xl overflow-hidden">
            <div className="p-8 space-y-8">
              {/* Title Input */}
              <div className="space-y-3 animate-fadeInUp stagger-1">
                <Label htmlFor="title" className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                  <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                  Judul Catatan
                </Label>
                <div className="relative">
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Masukkan judul catatan..."
                    className="h-14 text-lg border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-500/10 to-blue-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>

              {/* Content Input */}
              <div className="space-y-3 animate-fadeInUp stagger-2">
                <Label htmlFor="content" className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Isi Catatan
                </Label>
                <div className="relative">
                  <Textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Tulis isi catatan di sini..."
                    rows={12}
                    className="text-lg border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-300 resize-none bg-white/80 backdrop-blur-sm"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-500/10 to-blue-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6 animate-fadeInUp stagger-3">
                <Button
                  variant="outline"
                  onClick={() => router.back()}
                  className="h-12 px-8 text-lg font-medium border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 rounded-xl transition-all duration-300 flex items-center gap-2 group"
                >
                  <ArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" size={20} />
                  Batal
                </Button>

                <Button
                  onClick={handleCreate}
                  disabled={loading}
                  className="h-12 px-8 text-lg font-medium bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-[1.02] flex items-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? (
                    <>
                      <Loader className="animate-spin" size={20} />
                      Menyimpan...
                    </>
                  ) : (
                    <>
                      <Save className="group-hover:scale-110 transition-transform duration-300" size={20} />
                      Simpan Catatan
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Bottom Gradient */}
            <div className="h-2 bg-gradient-to-r from-teal-500 via-blue-500 to-teal-500"></div>
          </Card>
        </div>

        {/* Stats Info */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fadeInUp" style={{ animationDelay: "0.7s" }}>
          <div className="bg-gradient-to-br from-teal-50 to-blue-50 p-4 rounded-xl shadow-md border border-teal-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 font-medium">Karakter Judul</p>
                <p className="text-2xl font-bold text-teal-700">{title.length}</p>
              </div>
              <div className="text-teal-600 text-sm">{title.length > 50 && <span className="text-orange-500">Judul terlalu panjang!</span>}</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl shadow-md border border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 font-medium">Karakter Isi</p>
                <p className="text-2xl font-bold text-blue-700">{content.length}</p>
              </div>
              <div className="text-blue-600 text-sm">{content.length < 10 && content.length > 0 && <span className="text-orange-500">Terlalu pendek!</span>}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer spacing */}
      <div className="mt-16"></div>
    </div>
  );
}
