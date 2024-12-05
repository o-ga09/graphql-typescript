"use client";

import { useSidebar } from "@/context/sideBarContext";

export default function Footer() {
  const { isOpen } = useSidebar();

  return (
    <footer
      className={`bg-gray-100 transition-all duration-300 ease-in-out ${
        isOpen ? "pl-64" : "pl-0"
      }`}
    >
      <div className="container mx-auto px-6 py-3 text-center text-gray-600">
        <p>&copy; 2024 ノート投稿アプリ. All rights reserved.</p>
      </div>
    </footer>
  );
}
