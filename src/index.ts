import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql"
import Express from 'express';
import { createConnection } from "typeorm";
// import { RegisterResolver } from "./module/user/register";
import session from "express-session";
// import connectRedis from 'connect-redis';
import cors from 'cors';
// import { redis } from "./redis";
// import { LoginResolver } from "./module/user/login";
// import { UserByIdResolver } from "./module/user/UserById";
import MongoDBStore from 'connect-mongodb-session';
// import { confirmUserResolver } from "./module/user/confirmUser";

const main = async () => {

  
  const schema = await buildSchema({
    resolvers: [__dirname+'/module/**/*.ts'],
    // resolvers: [RegisterResolver, LoginResolver, UserByIdResolver, confirmUserResolver],  
    authChecker: ({ context : {req}}) => {
      return !!req.session.user;
    }
  });
  
  await createConnection();
  const  apolloServer = new ApolloServer({
    schema,
    context: ({req}: any) => ({req})
  });
  const app = Express();
  // const RedisStore = connectRedis(session);
  const MongoStore = MongoDBStore(session);
  const store = new MongoStore({
    collection: 'sessions', 
    uri: " mongodb://127.0.0.1:27017/graphql-1!"
  })
  app.use(
    cors({
      credentials: true,
      origin: 'http://localhost:3000'
    })
  )
  app.use(session({
    // store: new RedisStore({
    //   client: redis,
    // }),
    store,
    name: "qid",
    secret: "secret_key_can_be_anything",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 365 * 7,  // 7 years
    },
  }))
  apolloServer.applyMiddleware({ app }); 
  app.listen(4000, () => {
    console.log("app is listening at port 4000!!");
  });
}

main().catch(err => console.log(err)); 