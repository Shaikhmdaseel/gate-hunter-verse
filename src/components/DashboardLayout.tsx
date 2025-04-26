
import React from 'react';
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";
import { useNavigate } from "react-router-dom";
import { User, Trophy, Clock, List } from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const menuItems = [
    { 
      icon: User, 
      title: "Profile", 
      onClick: () => navigate("/profile"),
      rank: "E",
    },
    { 
      icon: List, 
      title: "Quests", 
      onClick: () => navigate("/quests"),
      rank: "D",
    },
    { 
      icon: Clock, 
      title: "Dungeon", 
      onClick: () => navigate("/dungeon"),
      rank: "C",
    },
    { 
      icon: Trophy, 
      title: "Ranking", 
      onClick: () => navigate("/ranking"),
      rank: "B",
    },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar>
          <SidebarHeader className="flex justify-center py-6 border-b border-white/5">
            <div className="text-center">
              <div className="relative mx-auto w-16 h-16 mb-2">
                <Avatar className="w-16 h-16 border-2 border-accent animate-pulse-shadow">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-secondary text-2xl font-bold">SL</AvatarFallback>
                </Avatar>
              </div>
              <h1 className="text-lg font-bold text-glow">HUNTER</h1>
              <div className="rank rank-e mt-1">E-Rank</div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs text-muted-foreground">Main Menu</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton onClick={item.onClick} className="portal-hover relative">
                        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center">
                          <span className={`rank rank-${item.rank.toLowerCase()} text-[10px] px-1 py-0`}>{item.rank}</span>
                        </span>
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="text-center text-xs text-muted-foreground py-4">
            <div className="border-t border-white/5 pt-4">
              System Access #45912
            </div>
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1 relative overflow-auto">
          <div className="sticky top-0 z-10">
            <div className="h-16 flex items-center justify-between px-4 bg-background/70 backdrop-blur-md border-b border-white/5">
              <SidebarTrigger>
                <button className="p-2 hover:bg-accent/10 rounded-md">
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1.5 7C1.22386 7 1 7.22386 1 7.5C1 7.77614 1.22386 8 1.5 8H13.5C13.7761 8 14 7.77614 14 7.5C14 7.22386 13.7761 7 13.5 7H1.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
                  </svg>
                </button>
              </SidebarTrigger>
              <div className="text-sm font-medium">
                System Time: <span className="text-accent">07:14:22</span>
              </div>
            </div>
          </div>
          <div className="container py-8 max-w-7xl">
            {children}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
