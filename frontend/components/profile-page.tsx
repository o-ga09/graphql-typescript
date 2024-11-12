"use client";

import * as React from "react";
import { Bell, CreditCard, LogOut, Settings, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ProfilePage() {
  const [activeSection, setActiveSection] = React.useState("プロフィール");

  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <Sidebar className="w-64">
          <SidebarHeader className="p-4">
            <h2 className="text-lg font-semibold">プロフィール設定</h2>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setActiveSection("プロフィール")}
                  isActive={activeSection === "プロフィール"}
                >
                  <User className="mr-2 h-4 w-4" />
                  プロフィール
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setActiveSection("通知")}
                  isActive={activeSection === "通知"}
                >
                  <Bell className="mr-2 h-4 w-4" />
                  通知
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setActiveSection("支払い")}
                  isActive={activeSection === "支払い"}
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  支払い
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setActiveSection("設定")}
                  isActive={activeSection === "設定"}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  設定
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                  <Avatar className="mr-2 h-6 w-6">
                    <AvatarImage
                      src="/placeholder.svg?height=32&width=32"
                      alt="ユーザーアバター"
                    />
                    <AvatarFallback>ユ</AvatarFallback>
                  </Avatar>
                  ユーザー名
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>マイアカウント</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>ログアウト</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>
        <SidebarInset className=" p-6 md:overflow-y-auto md:p-12">
          <main className="max-w-4xl w-full mx-auto px-4">
            <h1 className="text-2xl font-bold mb-6">{activeSection}</h1>
            {activeSection === "プロフィール" && (
              <form className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">名前</Label>
                    <Input id="name" placeholder="あなたの名前" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">メールアドレス</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">自己紹介</Label>
                  <textarea
                    id="bio"
                    className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="あなたについて教えてください"
                  />
                </div>
                <Button type="submit">保存</Button>
              </form>
            )}
            {activeSection === "通知" && <p>通知設定がここに表示されます。</p>}
            {activeSection === "支払い" && (
              <p>支払い情報がここに表示されます。</p>
            )}
            {activeSection === "設定" && (
              <p>アカウント設定がここに表示されます。</p>
            )}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
