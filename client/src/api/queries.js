import { gql } from "@apollo/client";

export const TODOS = gql`
   query todosQuery {
      userTodos {
         id, title, deadline, completed, createdAt
      }
   }
`
export const USER = gql`
   query userQuery {
      me {
         id, username
      }
   }
`
