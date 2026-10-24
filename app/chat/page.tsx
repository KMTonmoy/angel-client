"use client";

import { useState } from "react";
import { Sidebar, Chat } from "@/components/chat/Sidebar";
import { Sparkles, MessageSquarePlus, FileText, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DemoPage() {
  const [chats, setChats] = useState<Chat[]>([
    { _id: "1", title: "Summarize Q3 Financial Report" },
    { _id: "2", title: "Extract action items from Meeting Notes" },
    { _id: "3", title: "Review the new UI/UX guidelines" },
  ]);
  const [activeChat, setActiveChat] = useState<string | null>("1");

  const handleNewChat = () => {
    const newChat = { _id: Date.now().toString(), title: "New Chat" };
    setChats([newChat, ...chats]);
    setActiveChat(newChat._id);
  };

  const handleUpload = async (file: File) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    alert(`Uploaded: ${file.name}`);
  };

  return (
    <div className="flex h-screen bg-background relative overflow-hidden">
      
      {/* 🎨 BACKGROUND DECORATIONS (Peachy Blobs) */}
      <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[10%] w-[400px] h-[400px] bg-orange-300/20 rounded-full blur-[100px] pointer-events-none" />

      {/* 🎀 SIDEBAR */}
      <Sidebar
        chats={chats}
        activeChat={activeChat}
        onSelectChat={setActiveChat}
        onNewChat={handleNewChat}
        onUpload={handleUpload}
        userName="Angel User"
        userEmail="user@angel.ai"
      />

      {/* 🌟 MAIN CHAT AREA */}
      <main className="flex-1 flex flex-col items-center justify-center p-8 relative z-10">
        
        {/* Soft Glassmorphism Card */}
        <div className="max-w-xl w-full bg-white/60 backdrop-blur-xl border border-white/80 shadow-pink-lg rounded-3xl p-10 text-center flex flex-col items-center">
          
          {/* Animated Icon */}
          <div className="h-16 w-16 bg-gradient-to-tr from-primary to-orange-300 rounded-2xl flex items-center justify-center mb-6 shadow-pink-md transform hover:scale-105 transition-transform duration-300">
            <Sparkles className="h-8 w-8 text-white animate-pulse" />
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            How can I help you today?
          </h1>
          
          <p className="text-muted-foreground text-base mb-8 max-w-sm">
            Ask me anything about your uploaded PDFs, or start a new conversation to analyze a document.
          </p>

          {/* Quick Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <button 
              onClick={handleNewChat}
              className="flex flex-col items-start p-4 bg-white/50 border border-primary/10 rounded-2xl hover:bg-white hover:shadow-pink-sm transition-all text-left group"
            >
              <MessageSquarePlus className="h-5 w-5 text-primary mb-2 group-hover:scale-110 transition-transform" />
              <span className="font-semibold text-sm">Start New Chat</span>
              <span className="text-xs text-muted-foreground mt-1">Ask a general question</span>
            </button>

            <button 
              onClick={() => document.getElementById('pdf-upload')?.click()}
              className="flex flex-col items-start p-4 bg-white/50 border border-orange-300/20 rounded-2xl hover:bg-white hover:shadow-pink-sm transition-all text-left group"
            >
              <FileText className="h-5 w-5 text-orange-400 mb-2 group-hover:scale-110 transition-transform" />
              <span className="font-semibold text-sm">Analyze PDF</span>
              <span className="text-xs text-muted-foreground mt-1">Upload a document to begin</span>
            </button>
          </div>
          
        </div>
      </main>
    </div>
  );
}