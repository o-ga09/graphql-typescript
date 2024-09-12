"use client";

import Image from "next/image";
import Link from "next/link";

// サイドバー
const Sidebar = () => {
  return (
    <div className="space-y-10">
      <div className="border flex flex-col items-center justify-center p-5 space-y-5">
        <Link href="/about">
          <Image
            src="/default.png"
            width={120}
            height={120}
            alt="avatar"
            className="rounded-full"
            priority={false}
          />
        </Link>

        <div className="font-bold text-xl">Haru</div>

        <div className="text-sm">
          Next.jsとMicroCMSを使用したブログサイト構築チュートリアルです。技術ブログなど、すぐに運用できるようになっています。
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
