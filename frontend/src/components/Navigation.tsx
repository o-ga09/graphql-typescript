import Link from "next/link";
import Login from "./Login";

export default function Navigation() {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-100">
      <div className="flex space-x-4">
        <Link href="/" className="text-blue-500 hover:text-blue-700">
          Home
        </Link>
        <Link href="/notes" className="text-blue-500 hover:text-blue-700">
          Notes
        </Link>
      </div>
      <Login />
    </nav>
  );
}
