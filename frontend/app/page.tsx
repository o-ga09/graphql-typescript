"use client";
import { MainPage } from "@/components/app-page";
import dynamic from "next/dynamic";

const ApolloProviderWrapper = dynamic(
  () => import("@/components/apolloProviderWrapper"),
  { ssr: false }
);

export default function Page() {
  return (
    <ApolloProviderWrapper>
      <MainPage />;
    </ApolloProviderWrapper>
  );
}
