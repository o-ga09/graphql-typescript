"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSidebar } from "@/context/sideBarContext";
import { useAuth } from "@/context/authContext";
import Header from "@/components/header";
import { useMutation } from "@apollo/client";
import { CREATE_NOTE } from "@/graphql/operations";

export default function BlockPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const router = useRouter();
  const { isOpen } = useSidebar();
  const { user } = useAuth();

  const [createNote] = useMutation(CREATE_NOTE);

  if (!user) {
    return <div>ログインしてください</div>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data } = await createNote({
        variables: {
          userId: user.uid,
          title: title,
          content: content,
          tags: tagsInput,
        },
      });
      // 作成後、トップページにリダイレクト
      console.log("ノート作成成功:", data);
      router.push("/");
    } catch (error) {
      console.error("ノート作成エラー:", error);
    }
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
            <div>
              <label
                htmlFor="tags"
                className="block text-sm font-medium text-gray-700"
              >
                タグ（カンマ区切り）
              </label>
              <input
                type="text"
                id="tags"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="例: JavaScript, React, GraphQL"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
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
