import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import {hash} from 'bcryptjs';
import { User } from "../../entities/User";
import { getMongoManager } from "typeorm";
import { RegisterInput } from "../types/RegisterInput";
import { isAuth } from "../../../src/middleware/isAuth";
import { logger } from "../../../src/middleware/logger";
import { confirmedMail } from "../../../src/utils/confirmedMail";
import { createConfirmationEmail } from "../../../src/utils/createConfrimationUrl";

@Resolver()
export class RegisterResolver{
  // @Authorized()
  @UseMiddleware(isAuth, logger)
  @Query(() => String )
  async hello(){
    return 'hell'
  }

  // @UseMiddleware(logger)
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
    const confirmEmail = await createConfirmationEmail(user.email)
    await confirmedMail(user.email, confirmEmail);
    return user;
  }
}