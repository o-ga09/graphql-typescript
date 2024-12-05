"use client";

import { useState } from "react";
import {
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../lib/firebase";
import { X, Mail } from "lucide-react";

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleBackgroundClick = (e: {
    target: unknown;
    currentTarget: unknown;
  }) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      onClose();
    } catch (error) {
      setError(`Googleログインに失敗しました: ${error}`);
    }
  };

  const handleGithubLogin = async () => {
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
      onClose();
    } catch (error) {
      setError(`GitHubログインに失敗しました: ${error}`);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onClose();
    } catch (error) {
      setError(`メールアドレスまたはパスワードが正しくありません: ${error}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleBackgroundClick}
    >
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">ログイン</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="space-y-4">
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200"
          >
            Googleでログイン
          </button>
          <button
            onClick={handleGithubLogin}
            className="w-full bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-900 transition duration-200"
          >
            GitHubでログイン
          </button>
          <div className="relative">
            <hr className="my-8" />
            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-gray-500">
              または
            </span>
          </div>
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <input
              type="email"
              placeholder="メールアドレス"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded py-2 px-3"
              required
            />
            <input
              type="password"
              placeholder="パスワード"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded py-2 px-3"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
            >
              <Mail className="inline mr-2" size={18} />
              メールアドレスでログイン
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
