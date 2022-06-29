const Todo = require('../models/todo.model');

class TodoService {
   static async getTodos(id) {
      return await Todo.find({ owner: id });
   }
   static async createTodo(id, input) {
      const todo = await Todo.create({
         ...input,
         owner: id
      })
      return todo;
   }
   static async deleteTodo(id) {
      const deleted = await Todo.findByIdAndDelete(id);
      return deleted;
   }
   static async updateTodo(id, updates) {
      const todo = await Todo.findById(id);
      if (updates.title) {
         todo.title = updates.title;
      }
      if (Object.prototype.hasOwnProperty.call(updates, 'completed')) {
         todo.completed = !!updates.completed;
      }
      return await todo.save();
   }
}

module.exports = TodoService;
