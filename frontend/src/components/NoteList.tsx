"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Note = {
  id: string;
  title: string;
  content: string;
};

export default function NoteList() {
  const [notes] = useState<Note[]>([]);

  useEffect(() => {
    // ここでノートを取得するAPIを呼び出す
    // 例: fetch('/api/notes').then(res => res.json()).then(setNotes)
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {notes.map((note) => (
        <Card key={note.id}>
          <CardHeader>
            <CardTitle>{note.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{note.content}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
