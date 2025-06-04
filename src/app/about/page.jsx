"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Github, Instagram } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-blue-100 p-4">
      {/* Left Section - Image */}
      <div className="flex-1 flex justify-center items-center bg-green-500 p-8 lg:p-0">
        <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-white shadow-lg">
          <img src="/images/denny.jpg" alt="Foto Aria Denny A" fill className="object-cover rounded-full" priority />
        </div>
      </div>

      {/* Right Section - Text and Buttons */}
      <div className="flex-1 flex flex-col justify-center items-center lg:items-start bg-yellow-100 p-8 relative">
        {/* Pink bar (aesthetic accent) */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 md:w-6 lg:w-8 bg-pink-300 h-2/3 hidden lg:block"></div>

        <div className="text-center lg:text-left lg:pl-16">
          <p className="text-gray-600 text-lg mb-4">Hello! Saya Denny, mahasiswa Teknik Informatika di Universitas Dr. Soetomo Surabaya.</p>
          <h1 className="text-5xl md:text-6xl font-bold text-teal-700 mb-6 leading-tight">Aria Denny A</h1>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-8">
            <a href="https://instagram.com/dnnyardnsyh__" target="_blank" rel="noopener noreferrer" aria-label="Instagram Denny">
              <Button className="flex items-center gap-2 px-6 py-2 text-lg rounded-full text-white bg-teal-700 hover:bg-teal-500">
                <Instagram size={20} />
                Instagram
              </Button>
            </a>
            <a href="https://github.com/Arden25" target="_blank" rel="noopener noreferrer" aria-label="GitHub Denny">
              <Button variant="outline" className="flex items-center gap-2 px-6 py-2 text-lg rounded-full border-teal-700 text-teal-700 hover:bg-teal-50">
                <Github size={20} />
                GitHub
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
