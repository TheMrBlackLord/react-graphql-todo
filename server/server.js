require('dotenv').config();
const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const typeDefs = require('./api/schema');
const authResolver = require('./api/resolvers/auth.resolver');
const todoResolver = require('./api/resolvers/todo.resolver');
const userResolver = require('./api/resolvers/user.resolver');
const dateResolver = require('./api/resolvers/date.resolver');
const authMiddleware = require('./api/middlewares/auth.middleware');

const PORT = process.env.PORT || 5000;
const cors = {
   origin: process.env.FRONTEND_URL,
   credentials: true
}

const app = express();
app.use(cookieParser());
app.use(authMiddleware);


const server = new ApolloServer({
   typeDefs,
   resolvers: [authResolver, todoResolver, userResolver, dateResolver],
   csrfPrevention: true,
   context: ({ req, res }) => ({ req, res })
});

server.start().then(() => {
   server.applyMiddleware({ app, cors });
})

mongoose.connect(process.env.MONGO_URI, () => {
   console.log('Connected to MongoDB');
});

app.listen(PORT, () => {
   console.log(`Server started at http://localhost:${PORT}${server.graphqlPath}`);
})
