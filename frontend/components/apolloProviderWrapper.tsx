import { ApolloProvider } from "@apollo/client";
import client from "@/lib/apolloClient";

const ApolloProviderWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloProviderWrapper;
