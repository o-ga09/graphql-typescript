"use client";
import { SidebarProvider } from "@/components/ui/sidebar";
import "../globals.css";
import { AppSidebar } from "@/components/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SidebarProvider>
          <AppSidebar />
        </SidebarProvider>
      </div>
      <div>{children}</div>
    </div>
  );
}
