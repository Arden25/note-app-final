"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Github, Instagram, Mail, MapPin, Palette, Music, Code, Layers } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-secondary p-4">
      {/* Custom CSS untuk animasi */}
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

        @keyframes progressBar {
          from {
            width: 0%;
          }
          to {
            width: var(--progress);
          }
        }
        .animate-progress {
          animation: progressBar 1.5s ease-out forwards;
        }
      `}</style>

      {/* Landing Page Section */}
      <div className="flex flex-col lg:flex-row pt-20 animate-fadeInUp">
        {/* Bagian Gambar */}
        <div className="flex-1 flex justify-center items-center p-8 lg:p-0">
          <div className="relative group">
            {/* Glow effect background */}
            <div className="absolute -inset-2 bg-gradient-to-r from-teal-400 via-blue-400 to-purple-400 rounded-full blur-md opacity-30 group-hover:opacity-50 transition-opacity duration-300 animate-float"></div>

            <div className="relative w-72 h-[28rem] md:w-80 md:h-[30rem] lg:w-96 lg:h-[32rem] rounded-full overflow-hidden border-4 border-white shadow-2xl transform transition-transform duration-300 group-hover:scale-105">
              <Image src="/images/denny2.jpg" alt="Foto Aria Denny A" fill style={{ objectFit: "cover" }} priority />
            </div>
          </div>
        </div>

        {/* Bagian Teks dan Tombol */}
        <div className="flex-1 flex flex-col justify-center items-center lg:items-start p-8 relative">
          <div className="text-center lg:text-left px-4">
            {/* Nama dengan gradient text */}
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-teal-700 via-blue-600 to-teal-600 bg-clip-text text-transparent mb-6 leading-tight">Aria Denny A</h1>

            {/* Underline decoration */}
            <div className="w-24 h-1 bg-gradient-to-r from-teal-500 to-blue-500 mx-auto lg:mx-0 rounded-full mb-6"></div>

            <p className="text-gray-700 text-lg mb-4 leading-relaxed">
              Hello! Saya <span className="font-semibold text-teal-700">Denny</span>, mahasiswa
              <span className="font-semibold text-blue-700"> Teknik Informatika Semester 2</span> di
              <span className="font-semibold text-teal-700"> Universitas Dr. Soetomo Surabaya</span>.
            </p>

            {/* Social Media Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-8">
              <a href="https://instagram.com/dnnyardnsyh__" target="_blank" rel="noopener noreferrer" aria-label="Instagram Denny" className="transform transition-transform hover:scale-105">
                <Button className="flex items-center gap-2 px-6 py-2 text-lg rounded-full text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-lg">
                  <Instagram size={20} />
                  Instagram
                </Button>
              </a>

              <a href="https://github.com/Arden25" target="_blank" rel="noopener noreferrer" aria-label="GitHub Denny" className="transform transition-transform hover:scale-105">
                <Button variant="outline" className="flex items-center gap-2 px-6 py-2 text-lg rounded-full border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white shadow-lg transition-all duration-200">
                  <Github size={20} />
                  GitHub
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Riwayat Pendidikan Section */}
      <section className="mt-20 lg:mt-32 max-w-4xl mx-auto px-4 animate-fadeInUp">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-teal-700 to-blue-600 bg-clip-text text-transparent mb-3">Riwayat Pendidikan</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-teal-500 to-blue-500 mx-auto rounded-full"></div>
        </div>

        {/* Education Cards - Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {[
            {
              title: "Universitas Dr. Soetomo Surabaya",
              desc: "Teknik Informatika (2024 - Sekarang)",
              status: "current",
              gradient: "from-teal-50 to-blue-50",
              borderColor: "border-teal-500",
              year: "2024",
            },
            {
              title: "SMK Sunan Drajat Lamongan",
              desc: "Jurusan Multimedia (2021 - 2024)",
              status: "completed",
              gradient: "from-blue-50 to-indigo-50",
              borderColor: "border-blue-500",
              year: "2021",
            },
          ].map((item, index) => (
            <div
              key={index}
              className={`relative bg-gradient-to-br ${item.gradient} p-4 rounded-xl shadow-md border-l-4 ${item.borderColor} 
                transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group overflow-hidden`}
            >
              {/* Background Year */}
              <div className="absolute top-3 right-3 text-4xl font-black text-teal-100 opacity-20 pointer-events-none">{item.year}</div>

              {/* Status Badge */}
              {item.status === "current" && (
                <div className="absolute top-3 right-3 z-10">
                  <span className="bg-teal-500 text-white text-xs font-semibold px-2 py-1 rounded-full animate-pulse">Sedang Berlangsung</span>
                </div>
              )}

              <div className="relative z-10 space-y-2">
                <h3 className="text-lg lg:text-xl font-bold text-gray-800 group-hover:text-teal-700 transition-colors duration-200 leading-tight">{item.title}</h3>
                <p className="text-gray-600 font-medium text-base">{item.desc}</p>
              </div>

              {/* Decorative Corner */}
              <div className="absolute bottom-0 right-0 w-12 h-12 bg-gradient-to-tl from-teal-200 to-transparent rounded-tl-full opacity-30"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills & Keahlian Section */}
      <section className="mt-16 lg:mt-20 max-w-4xl mx-auto px-4 animate-fadeInUp">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-teal-700 to-blue-600 bg-clip-text text-transparent mb-3">Skills & Keahlian</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-teal-500 to-blue-500 mx-auto rounded-full"></div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Design & Multimedia */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 rounded-xl shadow-md border-l-4 border-purple-500 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <Palette className="text-purple-600 mr-3" size={24} />
              <h3 className="text-xl font-bold text-gray-800">Design & Multimedia</h3>
            </div>
            <div className="space-y-3">
              {[
                { name: "Adobe Photoshop", level: 85 },
                { name: "Canva", level: 90 },
                { name: "CorelDraw", level: 80 },
              ].map((skill, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-700">{skill.name}</span>
                    <span className="text-purple-600 font-semibold">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full animate-progress" style={{ "--progress": `${skill.level}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Programming & Development */}
          <div className="bg-gradient-to-br from-blue-50 to-teal-50 p-5 rounded-xl shadow-md border-l-4 border-blue-500 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <Code className="text-blue-600 mr-3" size={24} />
              <h3 className="text-xl font-bold text-gray-800">Programming & Development</h3>
            </div>
            <div className="space-y-3">
              {[
                { name: "HTML & CSS", level: 75 },
                { name: "JavaScript", level: 60 },
                { name: "Next.js", level: 50 },
              ].map((skill, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-700">{skill.name}</span>
                    <span className="text-blue-600 font-semibold">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-500 to-teal-500 h-2 rounded-full animate-progress" style={{ "--progress": `${skill.level}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Hobbies Section */}
      <section className="mt-16 lg:mt-20 max-w-4xl mx-auto px-4 animate-fadeInUp">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-teal-700 to-blue-600 bg-clip-text text-transparent mb-3">Hobbies & Interests</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-teal-500 to-blue-500 mx-auto rounded-full"></div>
        </div>

        {/* Hobbies Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          <div className="bg-gradient-to-br from-orange-50 to-red-50 p-5 rounded-xl shadow-md border-l-4 border-orange-500 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group">
            <div className="flex items-center mb-3">
              <Palette className="text-orange-600 mr-3 group-hover:rotate-12 transition-transform duration-300" size={28} />
              <h3 className="text-xl font-bold text-gray-800">Desain</h3>
            </div>
            <p className="text-gray-600">Passionate about creating visual designs, logos, and digital art. Suka eksperimen dengan berbagai style dan teknik desain.</p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-blue-50 p-5 rounded-xl shadow-md border-l-4 border-green-500 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group">
            <div className="flex items-center mb-3">
              <Music className="text-green-600 mr-3 group-hover:rotate-12 transition-transform duration-300" size={28} />
              <h3 className="text-xl font-bold text-gray-800">Music</h3>
            </div>
            <p className="text-gray-600">Love listening to various genres of music. Music helps me stay focused while coding and inspires my creative process.</p>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="mt-16 lg:mt-20 max-w-4xl mx-auto px-4 animate-fadeInUp">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-teal-700 to-blue-600 bg-clip-text text-transparent mb-3">Contact Information</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-teal-500 to-blue-500 mx-auto rounded-full"></div>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group text-center">
            <div className="flex justify-center mb-3">
              <Mail className="text-blue-600 group-hover:scale-110 transition-transform duration-300" size={32} />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Email</h3>
            <a href="mailto:ariadennya2503@gmail.com" className="text-blue-600 hover:text-blue-800 font-medium break-all">
              ariadennya2503@gmail.com
            </a>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-teal-50 p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group text-center">
            <div className="flex justify-center mb-3">
              <MapPin className="text-green-600 group-hover:scale-110 transition-transform duration-300" size={32} />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Location</h3>
            <a href="https://maps.app.goo.gl/bCaGpieEe7VJ4VAo9" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800 font-medium">
              Surabaya, Jawa Timur
            </a>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-slate-50 p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group text-center">
            <div className="flex justify-center mb-3">
              <Github className="text-gray-700 group-hover:scale-110 transition-transform duration-300" size={32} />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">GitHub</h3>
            <a href="https://github.com/Arden25" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900 font-medium">
              github.com/Arden25
            </a>
          </div>
        </div>
      </section>

      {/* Footer spacing */}
      <div className="mt-16 lg:mt-20"></div>
    </div>
  );
}
