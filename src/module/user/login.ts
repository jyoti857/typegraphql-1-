import { User } from "../../entities/User";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import bcrypt from 'bcryptjs';
import { MainContext } from "../../type/MainContext";

declare module 'express-session' {
  export interface SessionData {
    user: { [key: string]: any };
  }
}

@Resolver()
export class LoginResolver{

  @Mutation(() => User)
  async login(
    @Arg("email") email: string, 
    @Arg('password') password: string,
    @Ctx() context: MainContext
  ): Promise<User | null>{

    const user = await User.findOne({where : {email}});
    if(!user) return null;
    
    const valid = await bcrypt.compare(password, user.password);
    if(!valid) return null;
    console.log("valid from login ---> ", user );
    if(!user.isConfirmed) return null;
    
    context.req.session.user = user;

    return user;  
  }
}