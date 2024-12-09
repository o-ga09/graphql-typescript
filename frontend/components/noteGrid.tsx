"use client";

import NoteCard from "./noteCard";

export type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  Author: {
    username: string;
    displayname: string;
  };
};

type NoteGridProps = {
  notes: Note[];
};

export function NoteGrid({ notes }: NoteGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {notes.map((note, i) => (
        <NoteCard key={i} note={note} />
      ))}
    </div>
  );
}
