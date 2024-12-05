"use client";

import Image from "next/image";

type User = {
  displayName: string | null;
  email: string | null;
  photoURL?: string | null;
};

type UserProfileProps = {
  user: User;
};

export function UserProfile({ user }: UserProfileProps) {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">ユーザー情報</h2>
      <div className="flex items-center mb-4">
        <Image
          src={user.photoURL || "/placeholder.svg?height=64&width=64"}
          alt="ユーザーアイコン"
          className="w-16 h-16 rounded-full"
          width={64}
          height={64}
        />
      </div>
      <div>
        <p>
          <strong>名前：</strong> {user.displayName || "未設定"}
        </p>
        <p>
          <strong>メールアドレス：</strong> {user.email || "未設定"}
        </p>
      </div>
      <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        プロフィール編集
      </button>
    </div>
  );
}
