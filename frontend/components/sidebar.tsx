"use client";

import { useSidebar } from "@/context/sideBarContext";
import Link from "next/link";

export default function Sidebar() {
  const { isOpen } = useSidebar();

  return (
    <aside
      className={`fixed top-0 left-0 h-full bg-gray-800 text-white ${
        isOpen ? "w-64" : "w-0"
      } transition-all duration-300 ease-in-out overflow-hidden z-50`}
    >
      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <Link
              href="/"
              className="block py-2 px-4 hover:bg-gray-700 rounded"
            >
              ホーム
            </Link>
          </li>
          <li>
            <Link
              href="/notes/create"
              className="block py-2 px-4 hover:bg-gray-700 rounded"
            >
              新規ノート作成
            </Link>
          </li>
          <li>
            <Link
              href="/profile"
              className="block py-2 px-4 hover:bg-gray-700 rounded"
            >
              マイページ
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
