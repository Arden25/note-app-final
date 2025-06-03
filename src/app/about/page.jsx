"use client";
import { Button } from "@/components/ui/button";
import { Github, Instagram } from "lucide-react";

// import { BadgeCheck } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-gray-50 px-4 py-10 flex flex-col items-center">
      {/* Landing Page: full height viewport */}
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center min-h-screen">
        {/* Gambar profil */}
        <div className="relative flex justify-center">
          <div className="rounded-full overflow-hidden w-80 h-80 shadow-xl obje">
            <img src="/images/denny.jpg" alt="ssssss" />
          </div>
        </div>

        {/* Konten teks */}
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-teal-700 mb-6">
            Aria Denny A
            <br />
            Designer & Developer.
          </h1>
          <p className="text-gray-600 text-lg mb-8">Hello! I’m Julia, a freelance user interface designer & developer based in London. I’m very passionate about the work that I do.</p>
          {/* <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full text-lg">See My Works</Button>
            <Button variant="outline" className="border-pink-500 text-pink-500 hover:bg-pink-50 px-6 py-2 rounded-full text-lg">
              Contact Me
            </Button>
          </div> */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a href="https://instagram.com/dnnyardnsyh__" target="_blank" rel="noopener noreferrer">
              <Button className="bg-teal-700 hover:bg-teal-500 text-white px-6 py-2 rounded-full text-lg flex items-center gap-2">
                <Instagram size={20} />
                Instagram
              </Button>
            </a>
            <a href="https://github.com/Arden25" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="border-teal-700 text-teal-700 hover:bg-teal-50 px-6 py-2 rounded-full text-lg flex items-center gap-2">
                <Github size={20} />
                GitHub
              </Button>
            </a>
          </div>

          {/* <a href="https://github.com/Arden25" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="border-pink-500 text-pink-500 hover:bg-pink-50 px-6 py-2 rounded-full text-lg flex items-center gap-2">
                <GitHub size={20} />
                GitHub
              </Button>
            </a> */}
        </div>
      </div>
      <section className="max-w-6xl w-full mt-16 px-4 pb-20">
        <h2 className="text-3xl font-semibold mb-6 text-center md:text-left">Pendidikan</h2>
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-xl font-bold mb-1">Universitas Dr. Soetomo Surabaya</h3>
            <p className="text-gray-600">Teknik Informatika</p>
            <p className="text-gray-500 text-sm">2024 – Sekarang</p>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-xl font-bold mb-1">SMK Sunan Drajat Lamongan</h3>
            <p className="text-gray-600">Multimedia</p>
            <p className="text-gray-500 text-sm">2021 – 2024</p>
          </div>
        </div>
      </section>
    </div>
  );
}
