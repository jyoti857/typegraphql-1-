import { Arg, Mutation, Query, Resolver } from "type-graphql";
import {hash} from 'bcryptjs';
import { User } from "../../entities/User";
import { getMongoManager } from "typeorm";
import { RegisterInput } from "../types/RegisterInput";

@Resolver()
export class RegisterResolver{
  @Query(() => String )
  async hello(){
    return 'hell'
  }

  @Mutation(() => User)
  async register(
    @Arg("data") {firstName, lastName, email, password}: RegisterInput
  ): Promise<User>{
    const hashedPassword = await hash(password, 12);
    const user =  new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.password = hashedPassword;
    await getMongoManager().save(user);
    return user;
  }
}