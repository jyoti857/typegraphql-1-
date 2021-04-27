import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { User } from "../../entities/User";
import { redis } from "../../redis";
import {hash} from 'bcryptjs';
import { MainContext } from "../../type/MainContext";
import { ChangePasswordInput } from "../types/ChangePasswordInput";


declare module 'express-session' {
  export interface SessionData {
    user: { [key: string]: any };
  }
}


@Resolver()
export class changePasswordResolver{

  @Mutation(() => User)
  async changePassword(
    @Arg("data") {token, newPassword}: ChangePasswordInput,
    @Ctx() ctx: MainContext
  ): Promise<User | null | undefined>{

    const userEmail = await redis.get(token);
    
    if(!userEmail){
      return null;
    }
    await redis.del(token);
    const user = await User.findOne({email: userEmail});
    user!.password = await hash(newPassword, 10);
    user?.save();
    ctx.req.session.user = user;
    return user;
  }
}