import { MainContext } from "../type/MainContext";
import { MiddlewareFn } from "type-graphql";

declare module 'express-session' {
  export interface SessionData {
    user: { [key: string]: any };
  }
}

export const logger: MiddlewareFn<MainContext> = async ({context, args}, next) => {

  if(!context.req.session.user){
    throw new Error("not authenticated!!!");
  }
  console.log("args ", args);
  return next();
};