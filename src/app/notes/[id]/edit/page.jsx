"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

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
    return <div className="mt-20 text-center">Loading catatan...</div>;
  }

  return (
    <div className="mt-20">
      <Card className="w-[400px] mx-auto p-6 space-y-4">
        <h1 className="text-3xl text-center font-bold">Edit Catatan</h1>

        <div>
          <Label htmlFor="title" className="ml-2 block text-lg font-medium mb-1">
            Judul
          </Label>
          <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Masukkan judul" />
        </div>

        <div>
          <Label htmlFor="content" className="ml-2 block text-lg font-medium mb-1">
            Isi
          </Label>
          <Textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} rows={6} placeholder="Masukkan isi catatan" />
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={() => router.back()} disabled={loading}>
            Batal
          </Button>
          <Button onClick={handleUpdate} disabled={loading}>
            {loading ? "Menyimpan..." : "Simpan"}
          </Button>
        </div>
      </Card>
    </div>
  );
}
