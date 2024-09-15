"use client";

import { LoginFormComponent } from "@/components/app-components-login-form";

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
      </div>
    </div>
  );
}
