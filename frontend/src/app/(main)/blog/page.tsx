import { Suspense } from "react";
// import { microcms } from "@/lib/microcms";
import { BlogType } from "@/types";
import Blog from "@/components/blog/Blog";
import LayoutWithSidebar from "@/components/layout/LayoutWithSidebar";
import Loading from "@/app/loading";

export const revalidate = 0;

// ブログページ
const BlogPage = async () => {
  const dummyBlog: BlogType[] = [
    {
      id: "dummy",
      title: "dummy",
      content: "dummy",
      image: {
        url: "/dummy.jpg",
      },
      category: {
        id: "dummy",
        name: "dummy",
        color: "dummy",
      },
      ranking: 1,
      isRecommended: true,
      isSpecial: true,
      createdAt: "2024-09-12",
      publishedAt: "2024-09-12",
      updatedAt: "2024-09-12",
    },
  ];
  // const allBlogs = await microcms.getList<BlogType>({
  //   endpoint: "blog",
  //   queries: {
  //     orders: "-publishedAt",
  //   },
  // });

  return (
    <Suspense fallback={<Loading />}>
      <LayoutWithSidebar>
        <Blog blogs={dummyBlog} />
      </LayoutWithSidebar>
    </Suspense>
  );
};

export default BlogPage;
