import { buildSchema } from "type-graphql";

export const createSchema = async() => {
  return await buildSchema({
    resolvers: [__dirname+'/../module/**/*.ts'],
    // resolvers: [RegisterResolver, LoginResolver, UserByIdResolver, confirmUserResolver],  
    authChecker: ({ context : {req}}) => {
      return !!req.session.user;
    }
  });
}