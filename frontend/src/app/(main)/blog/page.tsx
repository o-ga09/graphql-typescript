import { Suspense } from "react";
// import { microcms } from "@/lib/microcms";
import { BlogType } from "@/types";
import Blog from "@/components/blog/Blog";
import LayoutWithSidebar from "@/components/layout/LayoutWithSidebar";
import Loading from "@/app/loading";
import { microcms } from "@/lib/microcms";

export const revalidate = 0;

// ブログページ
const BlogPage = async () => {
  const allBlogs = await microcms.getList<BlogType>({
    endpoint: "blog",
    queries: {
      orders: "-publishedAt",
    },
  });

  return (
    <Suspense fallback={<Loading />}>
      <LayoutWithSidebar>
        <Blog blogs={allBlogs.contents} />
      </LayoutWithSidebar>
    </Suspense>
  );
};

export default BlogPage;
