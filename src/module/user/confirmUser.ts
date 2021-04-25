import { User } from "../../entities/User";
import { Arg, Mutation, Resolver } from "type-graphql";
import { redis } from "../../../src/redis";

declare module 'express-session' {
  export interface SessionData {
    user: { [key: string]: any };
  }
}

@Resolver()
export class confirmUserResolver{

  @Mutation(() => Boolean)
  async confirmUser(
    @Arg("token") token: string,
  ): Promise<boolean>{

    const userEmail = await redis.get(token);
    if(!userEmail) return false;
    
    await User.update({email: userEmail}, {isConfirmed: true})
    await redis.del(token);
    return true;  
  }
}
