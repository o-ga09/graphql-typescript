"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/header";

type Note = {
  id: number;
  title: string;
  content: string;
};

export default function NotePage() {
  const [note, setNote] = useState<Note | null>(null);
  const params = useParams();
  const router = useRouter();
  const { slug } = params;

  useEffect(() => {
    // ここで実際のAPIからノートデータを取得します
    // この例では、モックデータを使用しています
    const fetchNote = async () => {
      // 実際のアプリケーションでは、この部分をAPIリクエストに置き換えます
      const mockNote = {
        id: parseInt(slug as string),
        title: `ノート ${slug}`,
        content: `これはノート ${slug} の内容です。実際のアプリケーションでは、ここに本文が表示されます。`,
      };
      setNote(mockNote);
    };

    fetchNote();
  }, [slug]);

  const handleDelete = async () => {
    if (confirm("本当にこのノートを削除しますか？")) {
      // ここで実際の削除APIを呼び出します
      console.log("ノートを削除:", slug);
      router.push("/");
    }
  };

  if (!note) {
    return <div>読み込み中...</div>;
  }

  return (
    <>
      <Header />
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{note.title}</h1>
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <p className="whitespace-pre-wrap">{note.content}</p>
        </div>
        <div className="flex justify-between">
          <Link
            href={`/notes/${slug}/edit`}
            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
          >
            編集
          </Link>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600"
          >
            削除
          </button>
        </div>
      </div>
    </>
  );
}
