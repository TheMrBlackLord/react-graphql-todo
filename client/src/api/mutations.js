import { gql } from '@apollo/client'

export const REFRESH = gql`
   mutation refreshMutation {
      refresh {
         tokens { accessToken }
      }
   }
`
export const LOGOUT = gql`
   mutation logoutMutation {
      logout 
   }
`
export const REGISTER = gql`
   mutation registerMutation($username: String!, $password: String!) {
      register(input: { username: $username, password: $password }) {
         tokens { accessToken }
         user { id, username }
      }
   }
`
export const LOGIN = gql`
   mutation loginMutation($username: String!, $password: String!) {
      login(input: { username: $username, password: $password }) {
         tokens { accessToken }
         user { id, username }
      }
   }
`

/* TODO MUTATIONS */

export const CREATE_TODO = gql`
   mutation createTodoMutation($id: ID!, $title: String!, $deadline: Date!) {
      createTodo(id: $id, input: { title: $title, deadline: $deadline }) {
         id, title, deadline, completed, createdAt
      }
   }
`
export const DELETE_TODO = gql`
   mutation deleteTodoMutation($id: ID!) {
      deleteTodo(id: $id) {
         id
      }
   }
`
export const UPDATE_TODO = gql`
   mutation updateTodoMutation($id: ID!, $updates: UpdateTodoInput!) {
      updateTodo(id: $id, updates: $updates) {
         id, title, completed
      }
   }
`
