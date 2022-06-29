import {
   ApolloClient,
   InMemoryCache,
   HttpLink,
   from,
   ApolloLink,
   fromPromise
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { REFRESH } from "./mutations";

let client;

const httpLink = new HttpLink({
   uri: "http://localhost:5000/graphql",
   credentials: "include"
})

const authLink = new ApolloLink((operation, forward) => {
   const token = localStorage.getItem("token");
   operation.setContext( ({headers = {}}) => ({
      headers: {
         ...headers,
         Authorization: token ? `Bearer ${token}` : ""
      }
   }))

   return forward(operation);
})

const refreshTokenLink = onError( ({ graphQLErrors, operation, forward }) => {
   if (graphQLErrors) {
      for (const { extensions } of graphQLErrors) {
         const nameAvailable = !["refreshMutation", "logoutMutation"].includes(operation.operationName);
         if (extensions.code === 'UNAUTHENTICATED' && nameAvailable) {
            return fromPromise(client.mutate({ mutation: REFRESH }))
               .filter((value) => !!value)
               .flatMap(({ data }) => {
                  const token = data.refresh.tokens.accessToken;
                  localStorage.setItem("token", token);
                  operation.setContext(({ headers = {} }) => ({
                     headers: {
                        ...headers,
                        Authorization: `Bearer ${token}`,
                     },
                  }));
                  return forward(operation);
               });
         }
      }
   }
})


client = new ApolloClient({
   link: from([refreshTokenLink, authLink, httpLink]),
   cache: new InMemoryCache()
})

export default client;
