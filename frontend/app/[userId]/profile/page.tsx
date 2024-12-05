"use client";

import { useAuth } from "@/context/authContext";
import { useSidebar } from "@/context/sideBarContext";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/header";

export default function ProfilePage() {
  const { user } = useAuth();
  const { isOpen } = useSidebar();
  const [badgeEnabled, setBadgeEnabled] = useState(false);
  const [activeTab, setActiveTab] = useState("account");
  const [notifications, setNotifications] = useState({
    comments: true,
    purchases: true,
    timeline: true,
    reports: false,
    service: false,
  });
  const [profile, setProfile] = useState({
    displayName: "o-ga",
    introduction:
      "新卒4年目のSEです。ミドルウェアとアプリの中間の人です。サーバ好き。",
    github: "o-ga09",
    twitter: "o_ga09",
    website: "https://www.t09-blog.com/",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  if (!user) {
    return (
      <div
        className={`container mx-auto px-4 transition-all duration-300 ease-in-out ${
          isOpen ? "pl-64" : "pl-0"
        }`}
      >
        <div className="text-center">
          <p>ログインしてください。</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div
        className={`container mx-auto px-4 transition-all duration-300 ease-in-out ${
          isOpen ? "pl-64" : "pl-0"
        }`}
      >
        <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
          <h1 className="text-4xl font-bold">Settings</h1>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="flex space-x-8 border-b mb-8">
              <TabsTrigger
                value="account"
                className={`pb-2 text-lg font-medium border-b-2 ${
                  activeTab === "account"
                    ? "border-blue-500 text-blue-500"
                    : "border-transparent hover:border-gray-300"
                }`}
              >
                アカウント
              </TabsTrigger>
              <TabsTrigger
                value="profile"
                className={`pb-2 text-lg font-medium border-b-2 ${
                  activeTab === "profile"
                    ? "border-blue-500 text-blue-500"
                    : "border-transparent hover:border-gray-300"
                }`}
              >
                プロフィール
              </TabsTrigger>
            </TabsList>

            <TabsContent value="account" className="space-y-10">
              <div className="flex items-center justify-between bg-gray-50 p-6 rounded-lg">
                <div>
                  <h2 className="text-xl font-semibold mb-2">
                    有料バッジを受け取る
                  </h2>
                  <p className="text-gray-600">
                    無効になっています。有効にすると読者はあなたの投稿に有料のバッジを贈ることができます。受け取った有料のバッジの数や種類に応じて、Zennから分配金が支払われます。
                  </p>
                </div>
                <Switch
                  checked={badgeEnabled}
                  onCheckedChange={setBadgeEnabled}
                />
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">メール通知</h2>
                <div className="space-y-4">
                  {Object.entries(notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center space-x-3">
                      <Checkbox
                        id={key}
                        checked={value}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, [key]: checked })
                        }
                      />
                      <Label htmlFor={key} className="text-lg">
                        {key === "comments" && "コメント通知"}
                        {key === "purchases" && "購入通知"}
                        {key === "timeline" && "タイムライン通知"}
                        {key === "reports" && "振り返りレポート"}
                        {key === "service" && "サービスからのお知らせ"}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between bg-gray-50 p-6 rounded-lg">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">
                      Googleログイン
                    </h2>
                    <p className="text-gray-600">taitabe1997@gmail.com</p>
                  </div>
                  <button className="bg-white text-blue-600 px-6 py-3 rounded-full hover:bg-blue-50 transition duration-300 shadow-sm">
                    別アカウントに移行
                  </button>
                </div>

                <div className="flex items-center justify-between bg-gray-50 p-6 rounded-lg">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">
                      メールアドレスログイン
                    </h2>
                    <p className="text-gray-600">未設定</p>
                  </div>
                  <button className="bg-white text-blue-600 px-6 py-3 rounded-full hover:bg-blue-50 transition duration-300 shadow-sm">
                    ログイン方法をメールアドレスログインに移行
                  </button>
                </div>

                <div className="flex items-center justify-between bg-gray-50 p-6 rounded-lg">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">
                      再設定用のメールアドレス
                    </h2>
                    <p className="text-gray-600">
                      Zennにログインできなくなった際に、再設定用のメールアドレスを使用して別のGoogleアカウントでログインできるようになります。
                    </p>
                  </div>
                  <button className="bg-white text-blue-600 px-6 py-3 rounded-full hover:bg-blue-50 transition duration-300 shadow-sm">
                    設定する
                  </button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="profile" className="space-y-10">
              <div className="max-w-4xl  px-4 py-12 space-y-12">
                <div className="flex space-x-6">
                  <div className="w-1/6 ">
                    <div className="flex justify-center space-x-4">
                      <Image
                        src={
                          user?.photoURL ||
                          "/placeholder.png?height=100&width=100"
                        }
                        alt="プロフィール画像"
                        width={100}
                        height={100}
                        className="rounded-full"
                      />
                    </div>
                    <div className="flex justify-center">
                      <button className="text-blue-600 hover:underline">
                        変更する
                      </button>
                    </div>
                  </div>

                  <div className="w-3/4 space-y-6">
                    <div>
                      <Label
                        htmlFor="displayName"
                        className="block text-lg font-medium mb-2"
                      >
                        表示名
                      </Label>
                      <Input
                        id="displayName"
                        name="displayName"
                        value={profile.displayName}
                        onChange={handleChange}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <Label
                        htmlFor="introduction"
                        className="block text-lg font-medium mb-2"
                      >
                        自己紹介
                      </Label>
                      <Textarea
                        id="introduction"
                        name="introduction"
                        value={profile.introduction}
                        onChange={handleChange}
                        className="w-full"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <Label
                          htmlFor="github"
                          className="block text-lg font-medium mb-2"
                        >
                          GitHubユーザー名
                        </Label>
                        <Input
                          id="github"
                          name="github"
                          value={profile.github}
                          onChange={handleChange}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="twitter"
                          className="block text-lg font-medium mb-2"
                        >
                          X(Twitter)ユーザー名
                        </Label>
                        <Input
                          id="twitter"
                          name="twitter"
                          value={profile.twitter}
                          onChange={handleChange}
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div>
                      <Label
                        htmlFor="website"
                        className="block text-lg font-medium mb-2"
                      >
                        あなたのウェブサイト
                      </Label>
                      <Input
                        id="website"
                        name="website"
                        value={profile.website}
                        onChange={handleChange}
                        className="w-full"
                      />
                    </div>

                    <Button className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition duration-300">
                      更新する
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
