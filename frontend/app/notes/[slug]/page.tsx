"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/header";
import Loading from "@/app/loading";
import Error from "@/app/error";
import { useEffect } from "react";
import {
  useDeleteNoteMutation,
  useGetNoteByIdQuery,
} from "@/lib/generated/graphql";

export default function NotePage() {
  const params = useParams();
  const router = useRouter();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  const { loading, error, data, refetch } = useGetNoteByIdQuery({
    variables: { id: slug },
  });

  useEffect(() => {
    refetch();
  }, []);

  const [deleteNote] = useDeleteNoteMutation();

  const handleDelete = async () => {
    if (confirm("本当にこのノートを削除しますか？")) {
      try {
        await deleteNote({
          variables: { noteId: slug },
        });
        router.push("/");
      } catch (error) {
        console.error("ノート削除エラー:", error);
      }
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error />;

  const note = data?.getNoteById?.note;

  return (
    <>
      <Header />
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{note?.title}</h1>
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <p className="whitespace-pre-wrap">{note?.content}</p>
        </div>
        <div className="flex justify-between">
          <Link
            href={`/notes/${slug}/edit`}
            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
          >
            編集
          </Link>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600"
          >
            削除
          </button>
        </div>
      </div>
    </>
  );
}
