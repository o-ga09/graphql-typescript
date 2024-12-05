"use client";

import { useAuth } from "@/context/authContext";
import { useSidebar } from "@/context/sideBarContext";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { Edit, FileText, LogOut, Menu, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import LoginModal from "./loginModal";

export default function Header() {
  const { isOpen, toggleSidebar } = useSidebar();
  const { user, loading } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("サインアウトエラー:", error);
    }
  };

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const closeDropdown = () => setDropdownOpen(false);
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      closeDropdown();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
          {!loading && (
            <div className="relative">
              {user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center focus:outline-none"
                  >
                    <Image
                      src={
                        user.photoURL || "/placeholder.png?height=32&width=32"
                      }
                      alt="ユーザーアイコン"
                      className="w-8 h-8 rounded-full"
                      width={32}
                      height={32}
                    />
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                      <Link
                        href={`/${user.uid}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                      >
                        <User size={16} className="mr-2" />
                        マイページ
                      </Link>
                      <Link
                        href={`/${user.uid}/profile`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                      >
                        <User size={16} className="mr-2" />
                        ユーザー情報を編集
                      </Link>
                      <Link
                        href="/notes/create"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                      >
                        <FileText size={16} className="mr-2" />
                        新規投稿
                      </Link>
                      <Link
                        href="/notes"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                      >
                        <Edit size={16} className="mr-2" />
                        ノートを編集
                      </Link>

                      <button
                        onClick={handleSignOut}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                      >
                        <LogOut size={16} className="mr-2" />
                        サインアウト
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setLoginModalOpen(true)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  ログイン
                </button>
              )}
            </div>
          )}
        </div>
      </nav>
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      />
    </header>
  );
}
