import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";

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
              <div>
                <Image
                  src={user.photoURL as string}
                  alt=""
                  className="w-10 h-10 rounded-full"
                  width={40}
                  height={40}
                />
              </div>
              <button
                className="bg-black text-white py-[7px] px-4 rounded-md"
                onClick={() => signOut(auth)}
              >
                Logout
              </button>
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
