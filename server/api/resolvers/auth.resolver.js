const authService = require('../services/auth.service');

const maxAge = 1000 * 60 * 60 * 24 * 7;

module.exports = {
   Mutation: {
      async register(_, { input }, { res }) {
         const data = await authService.register(input);
         res.cookie('refreshToken', data.tokens.refreshToken, {
            httpOnly: true,
            maxAge
         })
         return data;
      },

      async login(_, { input }, { res }) {
         const data = await authService.login(input);
         res.cookie('refreshToken', data.tokens.refreshToken, {
            httpOnly: true,
            maxAge
         })
         return data;
      },

      async logout(_, __, { req, res }) {
         const refreshToken = req.cookies.refreshToken;
         await authService.logout(refreshToken);
         res.clearCookie('refreshToken');
         return true;
      },

      async refresh(_, __, { req, res }) {
         // console.log(req.cookies)
         const refreshToken = req.cookies.refreshToken;
         const data = await authService.refresh(refreshToken);
         res.cookie('refreshToken', data.tokens.refreshToken, {
            httpOnly: true,
            maxAge
         })
         return data;
      }
   }
}
