"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteDiary } from "@/lib/app-lib-api";
import { useMutation } from "@apollo/client";
import { CreateNoteDocument } from "@/lib/generated/graphql";

interface DiaryFormProps {
  currentUser: string | null;
  diary?: {
    id: number;
    title: string;
    content: string;
    tags: string;
  };
}

export function DiaryFormComponent({ currentUser, diary }: DiaryFormProps) {
  const [title, setTitle] = useState(diary?.title || "");
  const [content, setContent] = useState(diary?.content || "");
  const [tags, setTags] = useState(diary?.tags || "");
  const [createNote] = useMutation(CreateNoteDocument);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    try {
      const { data } = await createNote({
        variables: { title, content, tags },
      });
      console.log("Note created:", data);
    } catch (error) {
      console.error("Error creating note:", error);
    }
    router.push("/diaries");
  };

  const handleDelete = async () => {
    if (diary) {
      await deleteDiary(diary.id);
      router.push("/diaries");
    }
  };

  return (
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
          rows={5}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        ></textarea>
      </div>
      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700"
        >
          タグ
        </label>
        <textarea
          id="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          required
          rows={5}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        ></textarea>
      </div>
      <div className="flex justify-between">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {diary ? "更新" : "投稿"}
        </button>
        {diary && (
          <button
            type="button"
            onClick={handleDelete}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            削除
          </button>
        )}
      </div>
    </form>
  );
}
