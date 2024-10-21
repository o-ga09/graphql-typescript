"use client";

import { useQuery } from "@apollo/client";
import { GetNotesDocument, Note } from "@/lib/generated/graphql";
import Link from "next/link";

export function DiaryListComponent() {
  const { data, loading, error } = useQuery(GetNotesDocument);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="space-y-4">
      {data?.getNotes.map((note: Note) => (
        <div key={note.noteId} className="border p-4 rounded-md">
          <Link href={`/diaries/${note.noteId}`}>
            <h3 className="text-xl font-bold">{note.title}</h3>
            <p className="text-gray-600">{note.content.substring(0, 100)}...</p>
          </Link>
        </div>
      ))}
    </div>
  );
}
