const User = require('../models/user.model');
const UserDTO = require('../dto/user.dto');
const { AuthenticationError } = require('apollo-server-express');

module.exports = {
   Query: {
      async me(_, __, { req }) {
         if (!req.user) {
            throw new AuthenticationError('Unauthenticated')
         }
         const rawUser = await User.findById(req.user.id);
         const user = new UserDTO(rawUser);
         return user;
      }
   }
}
