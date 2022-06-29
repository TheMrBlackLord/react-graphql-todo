const tokenService = require('./token.service');
const UserDTO = require('../dto/user.dto');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const { ApolloError, AuthenticationError } = require('apollo-server-express');

class AuthService {
   static async register({ username, password }) {
      const candidate = await User.findOne({ username });
      if (candidate) {
         throw new ApolloError('User already exists');
      }
      const hashedPassword = await bcrypt.hash(password, 5);
      const rawUser = await User.create({ username, password: hashedPassword });
      const user = new UserDTO(rawUser);
      const tokens = tokenService.generateTokens({...user});
      await tokenService.saveRefreshToken(user.id, tokens.refreshToken);
      return { user, tokens };
   }

   static async login({ username, password }) {
      const rawUser = await User.findOne({ username });
      if (!rawUser) {
         throw new ApolloError('User not found');
      }
      const isPasswordValid = await bcrypt.compare(password, rawUser.password);
      if (!isPasswordValid) {
         throw new ApolloError('Invalid password');
      }
      const user = new UserDTO(rawUser);
      const tokens = tokenService.generateTokens({...user});
      await tokenService.saveRefreshToken(user.id, tokens.refreshToken);
      return { user, tokens };
   }

   static async logout(refreshToken) {
      if (!refreshToken) {
         throw new AuthenticationError('Unauthenticated')
      }
      await tokenService.deleteRefreshToken(refreshToken);
      return true;
   }

   static async refresh(refreshToken) {
      if (!refreshToken) {
         throw new AuthenticationError('Unauthenticated')
      }
      const userData = tokenService.verifyRefreshToken(refreshToken);
      const tokenFromDb = await tokenService.findToken(refreshToken);
      if (!userData || !tokenFromDb) {
         throw new AuthenticationError('Unauthenticated');
      }
      const rawUser = await User.findById(userData.id);
      const user = new UserDTO(rawUser);
      const tokens = tokenService.generateTokens({...user});
      await tokenService.saveRefreshToken(user.id, tokens.refreshToken);
      return { user, tokens };
   }
}

module.exports = AuthService
