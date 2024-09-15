"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { isAuthenticated, getCurrentUser } from "@/lib/app-lib-auth";
import { getDiary } from "@/lib/app-lib-api";
import Link from "next/link";
import { DiaryFormComponent } from "./app-components-diary-form";

export function EditPage() {
  const [diary, setDiary] = useState<{
    id: number;
    title: string;
    content: string;
  } | null>(null);
  const params = useParams();
  const id = Number(params.id);

  useEffect(() => {
    const fetchDiary = async () => {
      const fetchedDiary = await getDiary(id);
      if (fetchedDiary) {
        setDiary(fetchedDiary);
      }
    };
    fetchDiary();
  }, [id]);

  if (!isAuthenticated()) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">ログインが必要です</h2>
          <Link href="/" className="text-blue-500 hover:text-blue-700">
            ログインページへ
          </Link>
        </div>
      </div>
    );
  }

  if (!diary) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">日記編集</h2>
            <DiaryFormComponent currentUser={getCurrentUser()} diary={diary} />
          </div>
        </div>
      </div>
    </div>
  );
}
