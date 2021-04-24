import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import { buildSchema, Query, Resolver } from "type-graphql"
import * as Express from 'express';
import { createConnection } from "typeorm";

@Resolver()
class FashionResolver{
  @Query(() => String, {name: "helloFashion", nullable: true, defaultValue: 'jest and singh'} )
  async hello(){
    return '23';
   }
}

const main = async () => {

  // creating a connection and this simply reads the data from ormconfig.json
  // file to make a connection 
  await createConnection()
  
  const schema = await buildSchema({
    resolvers: [FashionResolver],
    // here provide all the types that are missing in schema
    // orphanedTypes: [FirstObject],
  });
  const  apolloServer = new ApolloServer({schema});
  const app = Express();
  apolloServer.applyMiddleware({ app }); 
  app.listen(4000, () => console.log("app is listening at port 4000!!"));

}

main();