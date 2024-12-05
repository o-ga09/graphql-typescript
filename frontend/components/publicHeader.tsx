"use client";

import { useSidebar } from "@/context/sideBarContext";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import LoginModal from "./loginModal";

export default function PublicHeader() {
  const { isOpen, toggleSidebar } = useSidebar();
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  return (
    <header
      className={`bg-white shadow transition-all duration-300 ease-in-out ${
        isOpen ? "pl-64" : "pl-0"
      }`}
    >
      <nav className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="mr-4 text-gray-600 hover:text-gray-800"
            >
              <Menu size={24} />
            </button>
            <Link href="/" className="text-lg font-semibold text-gray-800">
              ノート投稿アプリ
            </Link>
          </div>

          <div className="relative">
            <button
              onClick={() => setLoginModalOpen(true)}
              className="text-gray-600 hover:text-gray-800"
            >
              ログイン
            </button>
          </div>
        </div>
      </nav>
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      />
    </header>
  );
}
