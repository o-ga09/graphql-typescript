"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSidebar } from "@/context/sideBarContext";
import { useAuth } from "@/context/authContext";
import Header from "@/components/header";

export default function BlockPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();
  const { isOpen } = useSidebar();
  const { user } = useAuth();

  if (!user) {
    return <div>ログインしてください</div>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // ここでノート作成のAPIリクエストを行います
    console.log("ノートを作成:", { title, content });
    // 作成後、トップページにリダイレクト
    router.push("/");
  };

  return (
    <>
      <Header />
      <div
        className={`container mx-auto px-4 transition-all duration-300 ease-in-out ${
          isOpen ? "pl-64" : "pl-0"
        }`}
      >
        <div className="max-w-2xl mx-auto mt-6 p-1">
          <h1 className="text-3xl font-bold mb-6">新規ノート作成</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                タイトル
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700"
              >
                内容
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows={10}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
            >
              ノートを作成
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
