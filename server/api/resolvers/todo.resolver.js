const todoService = require('../services/todo.service');
const { AuthenticationError } = require('apollo-server-express');

module.exports = {
   Query: {
      async userTodos(_, __, { req }) {
         if (!req.user) {
            throw new AuthenticationError('Unauthenticated')
         }
         const todos = await todoService.getTodos(req.user.id);
         return todos;
      }
   },
   Mutation: {
      async createTodo(_, { id, input }, { req }) {
         if (!req.user) {
            throw new AuthenticationError('Unauthenticated')
         }
         try {
            const todo = await todoService.createTodo(id, input);
            return todo;
         } catch (error) {
            throw new ApolloError(error);
         }
      },
      async deleteTodo(_, { id }, { req }) {
         if (!req.user) {
            throw new AuthenticationError('Unauthenticated')
         }
         try {
            const deleted = await todoService.deleteTodo(id);
            return deleted;
         } catch (error) {
            throw new ApolloError(error);
         }
      },
      async updateTodo(_, { id, updates }, { req }) {
         if (!req.user) {
            throw new AuthenticationError('Unauthenticated')
         }
         try {
            const updated = await todoService.updateTodo(id, updates);
            return updated;
         } catch (error) {
            throw new ApolloError(error);
         }
      }
   }
}
