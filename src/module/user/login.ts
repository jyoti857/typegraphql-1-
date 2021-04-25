import { User } from "../../entities/User";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import bcrypt from 'bcryptjs';
import { LoginContext } from "../../type/LoginContext";

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
    @Ctx() context: LoginContext
  ): Promise<User | null>{

    const user = await User.findOne({where : {email}});
    if(!user) return null;
    
    const valid = await bcrypt.compare(password, user.password);
    if(!valid) return null;
    
    if(!user.isConfirmed) return null;
    
    context.req.session.user = user;

    return user;  
  }
}