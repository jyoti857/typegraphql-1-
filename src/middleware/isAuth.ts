import { MainContext } from "../type/MainContext";
import { MiddlewareFn } from "type-graphql";

declare module 'express-session' {
  export interface SessionData {
    user: { [key: string]: any };
  }
}

export const isAuth: MiddlewareFn<MainContext> = async ({context}, next) => {

  if(!context.req.session.user){
    throw new Error("not authenticated!!!");
  }
  return next();
};