const jwt = require('jsonwebtoken');
const Token = require('../models/token.model');

class TokenService {
   static generateTokens(payload) {
      const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });
      const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
      return { accessToken, refreshToken };
   }

   static async saveRefreshToken(owner, refreshToken) {
      await Token.findOneAndUpdate({ owner }, { refreshToken }, { upsert: true });
   }

   static async deleteRefreshToken(refreshToken) {
      await Token.deleteOne({ refreshToken });
   }

   static verifyRefreshToken(refreshToken) {
      return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
   }

   static async findToken(refreshToken) {
      return Token.findOne({ refreshToken });
   }
}

module.exports = TokenService;
