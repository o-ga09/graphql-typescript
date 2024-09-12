import { Suspense } from "react";
// import { AboutType } from "@/types/index";
import About from "@/components/about/About";
import LayoutWithSidebar from "@/components/layout/LayoutWithSidebar";
import Loading from "@/app/loading";
// import { microcms } from "@/lib/microcms";

export const revalidate = 0;

// アバウトページ
const AboutPage = async () => {
  const dummy = "dammy";
  //   const about = await microcms.getList<AboutType>({
  //     endpoint: "about",
  //     queries: {
  //       orders: "publishedAt",
  //       limit: 1,
  //     },
  //   });

  return (
    <Suspense fallback={<Loading />}>
      <LayoutWithSidebar>
        <About content={dummy} />
      </LayoutWithSidebar>
    </Suspense>
  );
};

export default AboutPage;
