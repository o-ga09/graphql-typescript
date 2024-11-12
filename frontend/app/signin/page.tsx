"use client";
import Link from "next/link";
import SignupForm from "@/components/SignUpForm";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const GoogleProvider = new GoogleAuthProvider();
  const router = useRouter();
  const signInWithGoogle = async () => {
    const user = await signInWithPopup(auth, GoogleProvider);
    if (user) {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            新規登録
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            アカウントを作成してください
          </p>
        </div>
        <SignupForm />
        <div className="container mx-auto">
          <div className="bg-white shadow-md rounded-md py-12">
            <p className="mb-5 text-center">
              好きなアカウントでのログインを行なってください
            </p>
            <div className="flex gap-3 flex-col items-center">
              <button
                className="bg-white w-max border border-black py-2 px-4 rounded"
                onClick={signInWithGoogle}
              >
                Googleでログイン
              </button>
              <button className="bg-black text-white w-max border border-black py-2 px-4 rounded">
                GitHubでログイン
              </button>
            </div>
          </div>
        </div>
        <div className="text-center">
          <Link
            href="/"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            ログインページに戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
