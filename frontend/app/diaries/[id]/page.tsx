"use client";

import { useQuery } from "@apollo/client";
import { GetNoteByIdDocument } from "@/lib/generated/graphql";

export default function DiaryPage({ params }: { params: { id: string } }) {
  const { loading, error, data } = useQuery(GetNoteByIdDocument, {
    variables: { id: params.id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>{data.getNoteById.title}</h1>
      <p>{data.getNoteById.content}</p>
    </div>
  );
}
