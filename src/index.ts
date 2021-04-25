import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql"
import Express from 'express';
import { createConnection } from "typeorm";
import { RegisterResolver } from "./module/user/register";
import session from "express-session";
import connectRedis from 'connect-redis';
import cors from 'cors';
import { redis } from "./redis";
import { LoginResolver } from "./module/user/login";
import { UserByIdResolver } from "./module/user/UserById";

const main = async () => {
  
  const schema = await buildSchema({
    resolvers: [RegisterResolver, LoginResolver, UserByIdResolver],  
  });
  
  await createConnection();
  const  apolloServer = new ApolloServer({
    schema,
    context: ({req}: any) => ({req})
  });
  const app = Express();
  const RedisStore = connectRedis(session);
  app.use(
    cors({
      credentials: true,
      origin: 'http://localhost:3000'
    })
  )
  app.use(session({
    store: new RedisStore({
      client: redis as any,
    }),
    name: "qid",
    secret: "secret_key_can_be_anything",
    resave: true,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 365 * 7,  // 7 years
    },
  }))
  apolloServer.applyMiddleware({ app }); 
  app.listen(4000, () => console.log("app is listening at port 4000!!"));
}

main().catch(err => console.log(err)); 