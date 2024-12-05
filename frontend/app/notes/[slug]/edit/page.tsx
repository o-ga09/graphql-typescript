"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/header";

type Note = {
  id: number;
  title: string;
  content: string;
};

export default function EditNotePage() {
  const [note, setNote] = useState<Note | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const params = useParams();
  const router = useRouter();
  const { slug } = params;

  useEffect(() => {
    // ここで実際のAPIからノートデータを取得します
    const fetchNote = async () => {
      // 実際のアプリケーションでは、この部分をAPIリクエストに置き換えます
      const mockNote = {
        id: parseInt(slug as string),
        title: `ノート ${slug}`,
        content: `これはノート ${slug} の内容です。`,
      };
      setNote(mockNote);
      setTitle(mockNote.title);
      setContent(mockNote.content);
    };

    fetchNote();
  }, [slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // ここでノート更新のAPIリクエストを行います
    console.log("ノートを更新:", { id: slug, title, content });
    // 更新後、ノート詳細ページにリダイレクト
    router.push(`/note/${slug}`);
  };

  if (!note) {
    return <div>読み込み中...</div>;
  }

  return (
    <>
      <Header />
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">ノートを編集</h1>
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
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            更新
          </button>
        </form>
      </div>
    </>
  );
}
