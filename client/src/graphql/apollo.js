import VueApollo from "vue-apollo";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

const getHeaders = () => {
  const headers = {};
  const token = JSON.parse(localStorage.getItem("token"));
  if (token) {
    console.log("TOKEN", token);
    headers.authorization = `Bearer ${token}`;
  }
  return headers;
};

const httpLink = new HttpLink({
  uri: "http://localhost:3000/graphql",
  headers: getHeaders(),
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

export default apolloProvider;
