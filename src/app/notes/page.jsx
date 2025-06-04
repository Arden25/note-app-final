"use client";

import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { Loader, BookOpen, Search, Filter, Plus } from "lucide-react";
import CardNotes from "@/components/my-components/cardNotes";
import Link from "next/link";

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOwner, setFilterOwner] = useState("all"); // all, mine, others

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notes`);
        const data = await response.json();
        if (data.code === 200) {
          setNotes(data.data.notes);
          setFilteredNotes(data.data.notes);
        }
      } catch (error) {
        console.error("Error fetching notes:", error);
      } finally {
        setLoading(false);
      }
    };

    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwt.decode(token);
        setUserId(decoded.userId);
      } catch (error) {
        console.error("Token tidak valid:", error);
      }
    }

    fetchNotes();
  }, []);

  // Filter dan search logic
  useEffect(() => {
    let filtered = notes;

    // Filter berdasarkan search term
    if (searchTerm) {
      filtered = filtered.filter((note) => note.title?.toLowerCase().includes(searchTerm.toLowerCase()) || note.content?.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    // Filter berdasarkan ownership
    if (filterOwner === "mine") {
      filtered = filtered.filter((note) => note.id_user === userId);
    } else if (filterOwner === "others") {
      filtered = filtered.filter((note) => note.id_user !== userId);
    }

    setFilteredNotes(filtered);
  }, [notes, searchTerm, filterOwner, userId]);

  const myNotesCount = notes.filter((note) => note.id_user === userId).length;
  const othersNotesCount = notes.length - myNotesCount;

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

        @keyframes shimmer {
          0% {
            background-position: -200px 0;
          }
          100% {
            background-position: calc(200px + 100%) 0;
          }
        }
        .animate-shimmer {
          background: linear-gradient(90deg, #f0f0f0 0px, #e0e0e0 40px, #f0f0f0 80px);
          background-size: 200px;
          animation: shimmer 1.5s infinite linear;
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

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center py-12 animate-fadeInUp">
          {/* Background Glow Effect */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-teal-400/20 via-blue-400/20 to-purple-400/20 rounded-3xl blur-2xl opacity-50 animate-float"></div>

            <div className="relative z-10">
              {/* Icon Header */}
              <div className="flex justify-center mb-6 animate-fadeInUp stagger-1">
                <div className="p-4 bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl shadow-md border border-teal-100">
                  <BookOpen className="text-teal-600" size={48} />
                </div>
              </div>

              {/* Main Title */}
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-teal-700 via-blue-600 to-teal-600 bg-clip-text text-transparent mb-4 animate-fadeInUp stagger-2">All Notes</h1>

              {/* Underline decoration */}
              <div className="w-24 h-1 bg-gradient-to-r from-teal-500 to-blue-500 mx-auto rounded-full mb-6 animate-fadeInUp stagger-3"></div>

              {/* Subtitle */}
              <p className="text-gray-600 text-lg max-w-2xl mx-auto animate-fadeInUp stagger-4">Discover and explore all notes in your collection</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-fadeInUp stagger-4">
          <div className="bg-gradient-to-br from-teal-50 to-blue-50 p-6 rounded-xl shadow-md border-l-4 border-teal-500 transform transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 font-medium">Total Notes</p>
                <p className="text-3xl font-bold text-teal-700">{notes.length}</p>
              </div>
              <BookOpen className="text-teal-600" size={32} />
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl shadow-md border-l-4 border-blue-500 transform transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 font-medium">My Notes</p>
                <p className="text-3xl font-bold text-blue-700">{myNotesCount}</p>
              </div>
              <Plus className="text-blue-600" size={32} />
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl shadow-md border-l-4 border-indigo-500 transform transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 font-medium">Others' Notes</p>
                <p className="text-3xl font-bold text-indigo-700">{othersNotesCount}</p>
              </div>
              <BookOpen className="text-indigo-600" size={32} />
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl shadow-md mb-8 animate-fadeInUp" style={{ animationDelay: "0.5s" }}>
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search notes by title or content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Filter Options */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="text-gray-600" size={20} />
                <select value={filterOwner} onChange={(e) => setFilterOwner(e.target.value)} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                  <option value="all">All Notes</option>
                  <option value="mine">My Notes</option>
                  <option value="others">Others' Notes</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Info */}
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredNotes.length} of {notes.length} notes
            {searchTerm && <span className="ml-2 px-2 py-1 bg-teal-100 text-teal-700 rounded-full">"{searchTerm}"</span>}
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="py-20 animate-fadeInUp">
            <div className="flex flex-col justify-center items-center gap-6 text-center">
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-teal-400 to-blue-400 rounded-full blur opacity-30 animate-float"></div>
                <div className="relative p-6 bg-white rounded-2xl shadow-lg">
                  <Loader size={48} className="animate-spin text-teal-600" />
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-xl font-semibold text-gray-700">Loading Notes...</p>
                <p className="text-gray-500">Fetching your amazing notes</p>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Notes Grid - Fixed to always use grid layout */}
            {filteredNotes.length > 0 ? (
              <div className="animate-fadeInUp grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center" style={{ animationDelay: "0.6s" }}>
                {filteredNotes.map((note, index) => (
                  <div key={note.id_notes} className="animate-fadeInUp w-full" style={{ animationDelay: `${0.7 + index * 0.05}s` }}>
                    <CardNotes note={note} isOwner={userId === note.id_user} />
                  </div>
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="py-20 text-center animate-fadeInUp" style={{ animationDelay: "0.6s" }}>
                <div className="max-w-md mx-auto">
                  <div className="mb-6">
                    <div className="p-6 bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl inline-block">
                      <BookOpen className="text-teal-600" size={64} />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-700 mb-3">{searchTerm || filterOwner !== "all" ? "No Notes Found" : "No Notes Yet"}</h3>
                  <p className="text-gray-500 mb-8">{searchTerm || filterOwner !== "all" ? "Try adjusting your search or filter criteria" : "Start by creating your first note"}</p>
                  {!searchTerm && filterOwner === "all" && (
                    <Link href="/notes/create">
                      <button className="px-8 py-3 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white font-semibold rounded-full shadow-lg transform transition-all duration-300 hover:scale-105">
                        Create Your First Note
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            )}
          </>
        )}

        {/* Quick Action Button */}
        <div className="fixed bottom-8 right-8 animate-fadeInUp" style={{ animationDelay: "1s" }}>
          <Link href="/notes/create">
            <button className="group p-4 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white rounded-full shadow-2xl transform transition-all duration-300 hover:scale-110 animate-float">
              <div className="absolute -inset-2 bg-gradient-to-r from-teal-400 to-blue-400 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              <Plus className="relative z-10" size={24} />
            </button>
          </Link>
        </div>
      </div>

      {/* Footer spacing */}
      <div className="mt-16"></div>
    </div>
  );
};

export default NotesPage;
