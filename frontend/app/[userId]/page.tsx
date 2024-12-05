"use client";
import Header from "@/components/header";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/context/authContext";
import { useSidebar } from "@/context/sideBarContext";
import { GET_USER_PROFILE } from "@/gql/getUser";
import { useQuery } from "@apollo/client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { Badge, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import Loading from "../loading";
import Error from "../error";
import NotFound from "../not-found";

export default function Page() {
  const { isOpen } = useSidebar();
  const params = useParams();
  const { userId } = params;
  const [activeTab, setActiveTab] = useState("articles");
  const { user } = useAuth();

  const { data, loading, error } = useQuery(GET_USER_PROFILE, {
    variables: { userId },
  });
  if (loading) return <Loading />;

  if (error && error?.message === "sql: no rows in result set") {
    return <NotFound />;
  } else if (error) {
    console.error(error?.message);
    return <Error />;
  }

  const articles = [
    {
      id: 1,
      title:
        "じぶんリリースノートをGitHub Releaseでリリースするカスタムアクション作った",
      emoji: "🎉",
      date: "4ヶ月前",
      likes: 1,
    },
    {
      id: 2,
      title: "Go Conference 2024参戦してきた！",
      emoji: "🐹",
      date: "5ヶ月前",
      likes: 4,
    },
    {
      id: 3,
      title: "Cloud Run Jobsでバッチ実行する",
      emoji: "👻",
      date: "2024/04/20",
      likes: 2,
    },
    // 他の記事
  ];

  return (
    <>
      <Header />
      <div
        className={`container mx-auto px-4 transition-all duration-300 ease-in-out ${
          isOpen ? "pl-64" : "pl-0"
        }`}
      >
        <div className="max-w-5xl mx-auto px-4 py-12 space-y-12">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
            <Image
              src={user?.photoURL || "/placeholder.png?height=120&width=120"}
              alt="プロフィール画像"
              width={120}
              height={120}
              className="rounded-full"
            />
            <div className="flex-grow">
              <h1 className="text-3xl font-bold mb-2">{data?.displayName}</h1>
              <p className="text-gray-600 mb-4">
                新卒4年目のSEです。ミドルウェアとアプリの中間の人です。サーバ好き。
              </p>
              <div className="flex flex-wrap gap-4">
                <span className="text-gray-600">323 Likes</span>
                <span className="text-gray-600">7 Followings</span>
                <span className="text-gray-600">14 Followers</span>
              </div>
            </div>
            <button className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition duration-300">
              <Link href={`${user?.username}/profile`}>Edit profile</Link>
            </button>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="flex space-x-8 border-b mb-8">
              <TabsTrigger
                value="articles"
                className={`pb-2 text-lg font-medium border-b-2 transition-colors duration-200 ${
                  activeTab === "articles"
                    ? "border-blue-500 text-blue-500"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                Articles 20
              </TabsTrigger>
              <TabsTrigger
                value="books"
                className={`pb-2 text-lg font-medium border-b-2 transition-colors duration-200 ${
                  activeTab === "books"
                    ? "border-blue-500 text-blue-500"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                Books 1
              </TabsTrigger>
              <TabsTrigger
                value="scraps"
                className={`pb-2 text-lg font-medium border-b-2 transition-colors duration-200 ${
                  activeTab === "scraps"
                    ? "border-blue-500 text-blue-500"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                Scraps 29
              </TabsTrigger>
              <TabsTrigger
                value="comments"
                className={`pb-2 text-lg font-medium border-b-2 transition-colors duration-200 ${
                  activeTab === "comments"
                    ? "border-blue-500 text-blue-500"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                Comments
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value="articles"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {articles.map((article) => (
                <Card
                  key={article.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Badge className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold">
                        TECH TECH
                      </Badge>
                      <span className="text-2xl">{article.emoji}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-4 line-clamp-2">
                      {article.title}
                    </h3>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{article.date}</span>
                      <div className="flex items-center space-x-1">
                        <Heart size={16} className="text-red-500" />
                        <span>{article.likes}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* 他のタブコンテンツ */}
            <TabsContent value="books">
              <p>ここに本のリストが表示されます。</p>
            </TabsContent>

            <TabsContent value="scraps">
              <p>ここにスクラップのリストが表示されます。</p>
            </TabsContent>

            <TabsContent value="comments">
              <p>ここにコメントのリストが表示されます。</p>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
