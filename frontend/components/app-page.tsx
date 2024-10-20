"use client";

import { LoginFormComponent } from "@/components/app-components-login-form";
import Link from "next/link";

export function MainPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            日記投稿アプリ
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            ログインしてください
          </p>
        </div>
        <LoginFormComponent />
        <div className="text-center">
          <Link
            href="/signup"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            新規登録はこちら
          </Link>
        </div>
      </div>
    </div>
  );
}
