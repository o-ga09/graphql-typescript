import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { DropDownMenu } from "@/components/menu";

const Header = () => {
  const [user] = useAuthState(auth);
  return (
    <header className="bg-white">
      <div className="container flex justify-between items-center mx-auto px-2 h-20">
        <h1>
          <Link href="/" className="md:text-4xl text-3xl">
            Short Diary
          </Link>
        </h1>
        <nav className="flex items-center gap-3">
          <ul className="flex gap-3 items-center">
            <li className="hidden lg:block">
              <Link href="/diaries/new">日記を書く✏️</Link>
            </li>
          </ul>
          {user ? (
            <div className="flex gap-3 items-center">
              <DropDownMenu
                photoURL={user.photoURL!}
                onClick={() => signOut(auth)}
              />
            </div>
          ) : (
            <button className="bg-black text-white py-[7px] px-4 rounded-md">
              <Link href="/signin">Login</Link>
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
