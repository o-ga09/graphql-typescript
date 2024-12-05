import Link from "next/link";
import { Book, Edit, Share } from "lucide-react";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* ヒーローセクション */}
      <section className="text-center py-20">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          あなたのアイデアを記録し、共有しよう
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          シンプルで使いやすいノート投稿アプリ
        </p>
        <Link
          href="/notes"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition duration-300"
        >
          今すぐ始める
        </Link>
      </section>

      {/* 主要機能の紹介 */}
      <section className="py-16">
        <h2 className="text-3xl font-bold text-center mb-12">主な機能</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <Book size={48} className="mx-auto text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">簡単なノート作成</h3>
            <p className="text-gray-600">
              直感的なインターフェースで、すぐにノートを作成できます。
            </p>
          </div>
          <div className="text-center">
            <Edit size={48} className="mx-auto text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">リアルタイム編集</h3>
            <p className="text-gray-600">
              変更はリアルタイムで保存され、どこからでもアクセスできます。
            </p>
          </div>
          <div className="text-center">
            <Share size={48} className="mx-auto text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">簡単な共有</h3>
            <p className="text-gray-600">
              ワンクリックで他のユーザーとノートを共有できます。
            </p>
          </div>
        </div>
      </section>

      {/* CTAセクション */}
      <section className="bg-gray-100 rounded-lg p-8 text-center my-16">
        <h2 className="text-3xl font-bold mb-4">今すぐ始めましょう</h2>
        <p className="text-xl text-gray-600 mb-8">
          無料でアカウントを作成し、アイデアを記録し始めましょう。
        </p>
        <Link
          href="/signup"
          className="bg-green-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-600 transition duration-300"
        >
          無料で登録
        </Link>
      </section>

      {/* フッター */}
      <footer className="border-t py-8 mt-16">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p>&copy; 2024 ノート投稿アプリ. All rights reserved.</p>
          </div>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-gray-800"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-600 hover:text-gray-800"
                >
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-600 hover:text-gray-800"
                >
                  利用規約
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-gray-800"
                >
                  お問い合わせ
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  );
}
