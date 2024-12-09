import Link from "next/link";
import { Note } from "./noteGrid";

type NoteCardProps = {
  note: Note;
};

export default function NoteCard({ note }: NoteCardProps) {
  return (
    <Link href={`/notes/${note.id}`}>
      <div className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
        <h2 className="text-xl font-semibold mb-2">{note.title}</h2>
        <p className="text-gray-600 truncate">{note.content}</p>
      </div>
    </Link>
  );
}
