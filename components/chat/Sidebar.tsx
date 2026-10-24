"use client";

import { useRef, useState } from "react";
import { Plus, Upload, MessageSquare, Settings, LogOut, Bot, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface Chat {
  _id: string;
  title: string;
}

interface SidebarProps {
  chats?: Chat[];
  activeChat?: string | null;
  onSelectChat?: (id: string) => void;
  onNewChat?: (documentId?: string) => void;
  onUpload?: (file: File) => Promise<void>;
  userEmail?: string;
  userName?: string;
}

export function Sidebar({
  chats = [],
  activeChat,
  onSelectChat,
  onNewChat,
  onUpload,
  userEmail = "user@angel.ai",
  userName = "User Name",
}: SidebarProps) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !onUpload) return;

    setIsUploading(true);
    try {
      await onUpload(file);
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <aside className="w-[280px] h-full flex flex-col bg-sidebar border-r border-sidebar-border shadow-pink-sm z-10 transition-all">
      {/* HEADER / LOGO */}
      <div className="p-5 flex items-center gap-2 border-b border-sidebar-border/50">
        <div className="bg-primary p-1.5 rounded-lg shadow-pink-sm">
          <Bot className="h-5 w-5 text-primary-foreground" />
        </div>
        <h2 className="text-xl font-bold tracking-tight">Angel AI</h2>
      </div>

      {/* ACTION BUTTONS */}
      <div className="p-4 flex flex-col gap-3">
        <Button 
          onClick={() => onNewChat?.()}
          className="w-full justify-start gap-2 shadow-pink-md h-11 text-base"
        >
          <Plus size={20} />
          New Chat
        </Button>
        
        <Button 
          variant="outline" 
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading || !onUpload}
          className="w-full justify-start gap-2 h-11 text-base bg-card hover:bg-secondary/50"
        >
          {isUploading ? <Loader2 size={18} className="animate-spin" /> : <Upload size={18} />}
          {isUploading ? "Processing..." : "Upload PDF"}
        </Button>

        <input
          type="file"
          accept=".pdf"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* CHAT HISTORY LIST */}
      <ScrollArea className="flex-1 px-3">
        <div className="space-y-1 py-2">
          <p className="px-2 text-xs font-semibold text-muted-foreground mb-2 mt-2">
            Recent Chats
          </p>
          
          {chats.length === 0 ? (
            <p className="px-2 text-sm text-muted-foreground text-center py-4">
              No chats yet.
            </p>
          ) : (
            chats.map((chat) => (
              <button
                key={chat._id}
                onClick={() => onSelectChat?.(chat._id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all text-left truncate
                  ${activeChat === chat._id 
                    ? "bg-primary/10 text-primary font-medium shadow-sm" 
                    : "text-foreground hover:bg-secondary"
                  }
                `}
              >
                <MessageSquare size={16} className={activeChat === chat._id ? "text-primary" : "text-muted-foreground"} />
                <span className="truncate">{chat.title || "Untitled Chat"}</span>
              </button>
            ))
          )}
        </div>
      </ScrollArea>

      {/* FOOTER / USER PROFILE */}
      <div className="p-4 border-t border-sidebar-border/50 bg-sidebar/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{userName}</span>
              <span className="text-xs text-muted-foreground truncate w-24">{userEmail}</span>
            </div>
          </div>
          
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
              <Settings size={16} />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
              <LogOut size={16} />
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
}