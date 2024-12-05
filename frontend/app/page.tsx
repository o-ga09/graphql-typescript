"use client";
import Header from "@/components/header";
import { NoteGrid } from "@/components/noteGrid";
import PublicHeader from "@/components/publicHeader";
import { useAuth } from "@/context/authContext";
import { useSidebar } from "@/context/sideBarContext";

export default function Page() {
  const { isOpen } = useSidebar();
  const { user } = useAuth();

  const notes = [
    { id: 1, title: "ノート1", content: "これはノート1の内容です。" },
    { id: 2, title: "ノート2", content: "これはノート2の内容です。" },
    { id: 3, title: "ノート3", content: "これはノート3の内容です。" },
    { id: 4, title: "ノート4", content: "これはノート4の内容です。" },
    { id: 5, title: "ノート5", content: "これはノート5の内容です。" },
    { id: 6, title: "ノート6", content: "これはノート6の内容です。" },
  ];

  return (
    <>
      {user ? <Header /> : <PublicHeader />}
      <div
        className={`container mx-auto px-4 transition-all duration-300 ease-in-out ${
          isOpen ? "pl-64" : "pl-0"
        }`}
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold my-6 p-1">ノート一覧</h1>
        </div>
        <div className="flex justify-center">
          <div className="w-full h-full max-w-4xl">
            <NoteGrid notes={notes} />
          </div>
        </div>
      </div>
    </>
  );
}
