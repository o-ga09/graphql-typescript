"use client";

import { DiaryFormComponent } from "@/components/app-components-diary-form";
import { isAuthenticated, getCurrentUser } from "@/lib/app-lib-auth";
import Link from "next/link";

export function CreatePage() {
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

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">新規日記投稿</h2>
            <DiaryFormComponent currentUser={getCurrentUser()} />
          </div>
        </div>
      </div>
    </div>
  );
}
