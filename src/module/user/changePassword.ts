import { Arg, Mutation, Resolver } from "type-graphql";
import { User } from "../../entities/User";
import { redis } from "../../redis";
import {hash} from 'bcryptjs';

@Resolver()
export class changePasswordResolver{

  @Mutation(() => Boolean)
  async changePassword(
    @Arg('token') token: string,
    @Arg('newPassword') newPassword: string
  ): Promise<boolean>{

    const userEmail = await redis.get(token);
    
    if(!userEmail){
      return true;
    }

    const user = await User.findOne({email: userEmail});
    user!.password = await hash(newPassword, 10);
    user?.save();
    return true;
  }
}