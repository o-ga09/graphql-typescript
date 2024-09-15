"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getDiaries } from "@/lib/app-lib-api";

interface Diary {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

export function DiaryListComponent({
  currentUser,
}: {
  currentUser: string | null;
}) {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    const fetchDiaries = async () => {
      const fetchedDiaries = await getDiaries();
      setDiaries(fetchedDiaries);
    };
    fetchDiaries();
  }, []);

  return (
    <div className="space-y-4">
      {diaries.map((diary) => (
        <div key={diary.id} className="border p-4 rounded-md">
          <h3 className="text-xl font-bold">{diary.title}</h3>
          <p className="text-gray-600">{diary.content.substring(0, 100)}...</p>
          <p className="text-sm text-gray-500 mt-2">作成者: {diary.author}</p>
          <p className="text-sm text-gray-500">作成日時: {diary.createdAt}</p>
          {currentUser === diary.author && (
            <Link
              href={`/diaries/${diary.id}/edit`}
              className="text-blue-500 hover:text-blue-700 mt-2 inline-block"
            >
              編集
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}
