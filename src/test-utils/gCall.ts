import { graphql, GraphQLSchema } from "graphql"
import { Maybe } from "graphql/jsutils/Maybe";
import { buildSchema } from "type-graphql";

export interface Options{
  source: string;
  variableValues: Maybe<{
    [key: string]: any;
  }>
}
const createSchema = async() => await buildSchema({
  resolvers: [__dirname+'/../module/*/*.ts'],
  authChecker: ({ context : {req}}) => {
    return !!req.session.user;
  }
});

// just for to stop call schema each time gCall is called for efficiency

let schema: GraphQLSchema;
export const gCall = async({source, variableValues}: Options) => {
  if(!schema){
    schema = await createSchema()
  }
  return graphql({
    schema,
    source,
    variableValues,
  })
}