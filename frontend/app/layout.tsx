import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/authContext";
import { SidebarProvider } from "@/context/sideBarContext";
import Sidebar from "@/components/sidebar";
import Footer from "@/components/footer";
import { ApolloWrapper } from "@/lib/apollo";
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
        <ApolloWrapper>
          <AuthProvider>
            <SidebarProvider>
              <div
                className="flex overflow-hidden"
                style={{ minHeight: "calc(100vh - 48px)" }}
              >
                <div className="flex flex-col flex-grow overflow-hidden">
                  <Sidebar />
                  <main className="flex-grow overflow-auto">{children}</main>
                </div>
              </div>
              <Footer />
            </SidebarProvider>
          </AuthProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
