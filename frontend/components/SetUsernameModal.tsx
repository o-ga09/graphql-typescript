import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import { useCreateUserMutation } from "@/lib/generated/graphql";

const SetUsernameModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { user, setUser } = useAuth();
  const [username, setUsername] = useState("");
  const [displayname, setDisplayname] = useState("");
  const [createUser] = useCreateUserMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      const { data } = await createUser({
        variables: {
          userId: user.uid,
          username: username,
          displayname: displayname,
        },
      });
      // ユーザーデータを更新
      setUser({
        ...user,
        username: data?.createUser?.username ?? "",
        displayname: data?.createUser?.displayname ?? "",
      });
      onClose();
    }
  };

  return (
    // モーダルのオーバーレイ
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* 背景の半透明オーバーレイ */}
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      {/* モーダルコンテンツ */}
      <div className="bg-white p-6 rounded-md z-10">
        <h2 className="text-xl font-semibold mb-4">ユーザー名を設定</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            ユーザー名を入力してください:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </label>
          <label className="block mb-2">
            表示名を入力してください:
            <input
              type="text"
              value={displayname}
              onChange={(e) => setDisplayname(e.target.value)}
              required
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </label>
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              送信
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SetUsernameModal;
