const { gql } = require('apollo-server-express');

module.exports = gql`
   scalar Date

   type User {
      id: ID!
      username: String!
      password: String!
   }
   type Todo {
      id: ID!
      title: String!
      deadline: Date!
      completed: Boolean!
      createdAt: Date!
      owner: ID!
   }
   type UserDTO {
      id: ID!
      username: String!
   }
   type AuthPayload {
      tokens: Tokens!
      user: UserDTO!
   }
   type Tokens {
      accessToken: String!
      refreshToken: String!
   }

   input AuthUserInput {
      username: String!
      password: String!
   }
   input CreateTodoInput {
      title: String!
      deadline: Date!
   }
   input UpdateTodoInput {
      title: String
      completed: Boolean
   }

   type Query {
      userTodos: [Todo]!
      me: UserDTO!
   }
   type Mutation {
      register(input: AuthUserInput!): AuthPayload!
      login(input: AuthUserInput!): AuthPayload!
      logout: Boolean!
      refresh: AuthPayload!

      createTodo(id: ID!, input: CreateTodoInput!): Todo!
      deleteTodo(id: ID!): Todo!
      updateTodo(id: ID!, updates: UpdateTodoInput!): Todo!
   }
`
