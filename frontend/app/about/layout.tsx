import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ノート投稿アプリ",
  description: "簡単にノートを作成・共有できるアプリケーション",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <div className="flex h-screen overflow-hidden">
          <div className="flex flex-col flex-grow overflow-hidden">
            <main className="flex-grow overflow-auto p-6">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
