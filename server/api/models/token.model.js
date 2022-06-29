const { Schema, model, Types } = require('mongoose');

const tokenSchema = new Schema({
   owner: {
      type: Types.ObjectId,
      required: true,
      ref: 'User'
   },
   refreshToken: {
      type: String,
      required: true
   }
})

module.exports = model('Token', tokenSchema);
