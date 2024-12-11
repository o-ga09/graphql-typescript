"use client";
import Header from "@/components/header";
import { Note, NoteGrid } from "@/components/noteGrid";
import { useSidebar } from "@/context/sideBarContext";
import { GET_NOTES_ALL } from "@/graphql/operations";
import { useQuery } from "@apollo/client";
import Loading from "./loading";
import Error from "./error";
import NotFound from "./not-found";
import { useEffect } from "react";

export default function Page() {
  const { isOpen } = useSidebar();
  const { loading, error, data, refetch } = useQuery(GET_NOTES_ALL);

  useEffect(() => {
    refetch();
  }, []);

  if (loading) return <Loading />;
  if (!data) {
    return <NotFound />;
  }
  console.log("⭐️", data);
  const notes: Note[] = data.getNoteAll.map(
    (note: {
      noteId: string;
      title: string;
      content: string;
      createdAt: string;
      updatedAt: string;
      tags: { name: string }[];
    }) => ({
      id: note.noteId,
      title: note.title,
      content: note.content,
      createdAt: note.createdAt,
      updatedAt: note.updatedAt,
      tags: note.tags.map((tag: { name: string }) => tag.name),
    })
  );
  if (error) return <Error />;
  return (
    <>
      <Header />
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
