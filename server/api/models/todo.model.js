const { Schema, model, Types } = require('mongoose');

const todoSchema = new Schema({
   title: {
      type: String,
      required: true
   },
   deadline: {
      type: Date,
      required: true
   },
   completed: {
      type: Boolean,
      default: false
   },
   owner: {
      type: Types.ObjectId,
      ref: 'User',
      required: true
   }
}, {
   timestamps: {
      createdAt: 'createdAt', 
      updatedAt: false
   }
})

module.exports = model('Todo', todoSchema);
