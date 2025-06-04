"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Edit3, FileText, Type, Save, X, ArrowLeft, Loader } from "lucide-react";
import Link from "next/link";

export default function EditNotePage({ params }) {
  const { id } = params;
  const router = useRouter();
  const { toast } = useToast();

  const [note, setNote] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      router.push("/");
      return;
    }
    setToken(storedToken);

    const fetchNote = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notes/${id}`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });
        if (!res.ok) throw new Error("Catatan tidak ditemukan");

        const { data } = await res.json();
        setNote(data);
        setTitle(data.title);
        setContent(data.content);
      } catch (error) {
        toast({
          title: "Gagal mengambil catatan",
          description: "Pastikan catatan tersedia.",
          variant: "destructive",
        });
      }
    };

    fetchNote();
  }, [id, toast, router]);

  const handleUpdate = async () => {
    if (!title.trim() || !content.trim()) {
      toast({
        variant: "destructive",
        title: "Gagal menyimpan",
        description: "Judul dan isi tidak boleh kosong.",
      });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notes`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id_notes: id,
          id_user: note.id_user,
          title,
          content,
        }),
      });

      if (!res.ok) throw new Error("Gagal memperbarui catatan");

      toast({
        className: cn("bg-green-500", "text-white"),
        title: "Catatan diperbarui",
        description: "Perubahan telah disimpan.",
      });

      router.push("/notes");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Gagal menyimpan",
        description: "Terjadi kesalahan saat memperbarui catatan.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!note) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <div className="flex items-center gap-3 text-teal-600">
          <Loader className="animate-spin" size={24} />
          <span className="text-lg font-medium">Loading catatan...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center p-4">
      {/* Custom CSS untuk animasi - sama dengan register */}
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

      <div className="w-full max-w-2xl">
        {/* Back to Notes Link */}
        <div className="mb-4 animate-fadeInUp">
          <Link href="/notes" className="inline-flex items-center gap-2 text-gray-600 hover:text-teal-600 transition-colors duration-200">
            <ArrowLeft size={20} />
            <span>Back to Notes</span>
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
                  <Edit3 className="text-teal-600" size={48} />
                </div>
              </div>

              {/* Main Title */}
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-700 via-blue-600 to-teal-600 bg-clip-text text-transparent mb-4 animate-fadeInUp stagger-2">Edit Note</h1>

              {/* Underline decoration */}
              <div className="w-16 h-1 bg-gradient-to-r from-teal-500 to-blue-500 mx-auto rounded-full mb-4 animate-fadeInUp stagger-3"></div>

              {/* Subtitle */}
              <p className="text-gray-600 text-lg animate-fadeInUp stagger-4">Update your note content</p>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <div className="animate-fadeInUp" style={{ animationDelay: "0.5s" }}>
          <Card className="bg-gradient-to-br from-white to-gray-50 border-0 shadow-2xl rounded-3xl overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-center text-2xl font-bold text-gray-800">Update Note</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-6">
                {/* Title Input */}
                <div className="space-y-2 animate-fadeInUp stagger-1">
                  <Label htmlFor="title" className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                    <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                    Judul
                  </Label>
                  <div className="relative">
                    <Type className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Masukkan judul catatan"
                      className="h-12 pl-10 pr-4 text-lg border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Content Input */}
                <div className="space-y-2 animate-fadeInUp stagger-2">
                  <Label htmlFor="content" className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Isi Catatan
                  </Label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-4 text-gray-400" size={20} />
                    <Textarea
                      id="content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      rows={8}
                      placeholder="Masukkan isi catatan..."
                      className="pl-10 pr-4 text-lg border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-300 resize-none"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4 animate-fadeInUp stagger-3">
                  {/* Cancel Button */}
                  <Button
                    variant="secondary"
                    onClick={() => router.back()}
                    disabled={loading}
                    className="flex-1 h-12 text-lg font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl shadow-md hover:shadow-lg transform transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    <div className="flex items-center gap-2">
                      <X size={20} />
                      Batal
                    </div>
                  </Button>

                  {/* Save Button */}
                  <Button
                    onClick={handleUpdate}
                    disabled={loading}
                    className="flex-1 h-12 text-lg font-semibold bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <Loader className="animate-spin" size={20} />
                        Menyimpan...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Save size={20} />
                        Simpan
                      </div>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>

            {/* Bottom Gradient */}
            <div className="h-2 bg-gradient-to-r from-teal-500 via-blue-500 to-teal-500"></div>
          </Card>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center animate-fadeInUp" style={{ animationDelay: "0.8s" }}>
          <p className="text-gray-500 text-sm">Changes will be saved automatically to your account</p>
        </div>

        {/* Decorative Elements - sama dengan register */}
        <div className="fixed top-10 left-10 w-20 h-20 bg-gradient-to-br from-teal-200 to-blue-200 rounded-full blur-xl opacity-30 animate-float"></div>
        <div className="fixed bottom-10 right-10 w-16 h-16 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full blur-xl opacity-30 animate-float" style={{ animationDelay: "1s" }}></div>
        <div className="fixed top-1/2 left-5 w-12 h-12 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-xl opacity-20 animate-float" style={{ animationDelay: "2s" }}></div>
      </div>
    </div>
  );
}
