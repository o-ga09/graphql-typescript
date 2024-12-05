"use client";

import NoteCard from "./noteCard";

type Note = {
  id: number;
  title: string;
  content: string;
};

type NoteGridProps = {
  notes: Note[];
};

export function NoteGrid({ notes }: NoteGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  );
}
