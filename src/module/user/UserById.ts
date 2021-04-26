import { User } from "../../entities/User";
import { MainContext } from "../../type/MainContext";
import { Ctx, Query, Resolver } from "type-graphql";
// import mongoose from "mongoose";
declare module 'express-session' {
  export interface SessionData {
    user: { [key: string]: any };
  }
}

@Resolver()
export class UserByIdResolver{

  @Query(() => User, {nullable: true})
  async userById(@Ctx() ctx: MainContext): Promise<User | undefined>{
    
    const session_user = ctx.req.session.user;
    if(!session_user){
      return ;
    }

    const user = await User.findOne({email: session_user.email})
    return user;
  }
}