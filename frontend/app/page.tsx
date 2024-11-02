"use client";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Home from "@/components/home";
import dynamic from "next/dynamic";

const ApolloProviderWrapper = dynamic(
  () => import("@/components/apolloProviderWrapper"),
  { ssr: false }
);

export default function Page() {
  return (
    <ApolloProviderWrapper>
      <Header />
      <Home />
      <Footer />
    </ApolloProviderWrapper>
  );
}
