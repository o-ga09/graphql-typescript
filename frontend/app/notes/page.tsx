"use client";

import { useAuth } from "@/context/authContext";
import { useSidebar } from "@/context/sideBarContext";
import Header from "@/components/header";
import Link from "next/link";
import Loading from "../loading";
import Error from "../error";
import { useEffect } from "react";
import { useGetNotesByUserIdQuery } from "@/lib/generated/graphql";

export default function NotesPage() {
  const { user } = useAuth();
  const { isOpen } = useSidebar();

  const { data, loading, error, refetch } = useGetNotesByUserIdQuery({
    variables: {
      userId: user?.uid || "",
    },
  });

  useEffect(() => {
    refetch();
  }, []);

  if (!user) {
    return <div>ログインしてください</div>;
  }

  if (loading) return <Loading />;
  if (error) return <Error />;

  const notes = data?.getNotesByUserId?.notes || [];

  return (
    <>
      <Header />
      <div
        className={`container mx-auto px-4 transition-all duration-300 ease-in-out ${
          isOpen ? "pl-64" : "pl-0"
        }`}
      >
        <h1 className="text-3xl font-bold mb-6">ノート一覧</h1>
        <ul>
          {notes.map(
            (note: {
              noteId: string;
              title: string;
              content: string;
              createdAt: string;
              updatedAt: string;
              tags: { name: string }[];
            }) => (
              <li key={note.noteId} className="mb-4">
                <Link href={`/notes/${note.noteId}`} className="text-blue-500">
                  {note.title}
                </Link>
                <p>{note.content}</p>
                <p>作成日時: {new Date(note.createdAt).toLocaleString()}</p>
                <p>更新日時: {new Date(note.updatedAt).toLocaleString()}</p>
                <p>
                  タグ:{" "}
                  {note.tags
                    .map((tag: { name: string }) => tag.name)
                    .join(", ")}
                </p>
              </li>
            )
          )}
        </ul>
      </div>
    </>
  );
}
