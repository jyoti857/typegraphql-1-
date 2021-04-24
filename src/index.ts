import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql"
import * as Express from 'express';
import { createConnection } from "typeorm";
import { RegisterResolver } from "./module/user/register";



const main = async () => {

  const schema = await buildSchema({
    resolvers: [RegisterResolver],  
  });

  await createConnection();
  // const manager = getMongoManager();
  // manager.save(user)
  const  apolloServer = new ApolloServer({schema});
  const app = Express();
  apolloServer.applyMiddleware({ app }); 
  app.listen(4000, () => console.log("app is listening at port 4000!!"));

}

main().catch(err => console.log(err)); 