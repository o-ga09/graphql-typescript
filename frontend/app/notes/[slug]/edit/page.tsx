"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";
import { useQuery, useMutation } from "@apollo/client";
import { GET_NOTE_BY_ID, UPDATE_NOTE } from "@/graphql/operations";
import Header from "@/components/header";
import Loading from "@/app/loading";
import Error from "@/app/error";

export default function EditNotePage() {
  const { user } = useAuth();
  const params = useParams();
  const router = useRouter();
  const { slug } = params;

  const { loading, error, data } = useQuery(GET_NOTE_BY_ID, {
    variables: { id: slug },
  });

  const [updateNote] = useMutation(UPDATE_NOTE);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tagsInput, setTagsInput] = useState("");

  useEffect(() => {
    if (data) {
      const note = data.getNoteById.note;
      setTitle(note.title);
      setContent(note.content);
      setTagsInput(
        note.tags.map((tag: { name: string }) => tag.name).join(", ")
      );
    }
  }, [data]);

  if (!user) {
    return <div>ログインしてください</div>;
  }

  if (loading) return <Loading />;
  if (error) return <Error />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateNote({
        variables: {
          noteId: slug,
          title: title,
          content: content,
          tags: tagsInput.split(",").map((tag) => tag.trim()),
        },
      });
      // 更新後、ノートページにリダイレクト
      router.push(`/notes/${slug}`);
    } catch (error) {
      console.error("ノート更新エラー:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto mt-6 p-1">
          <h1 className="text-3xl font-bold mb-6">ノートを編集</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                タイトル
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700"
              >
                内容
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows={10}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              ></textarea>
            </div>
            <div>
              <label
                htmlFor="tags"
                className="block text-sm font-medium text-gray-700"
              >
                タグ（カンマ区切り）
              </label>
              <input
                type="text"
                id="tags"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="例: JavaScript, React, GraphQL"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
            >
              ノートを更新
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
