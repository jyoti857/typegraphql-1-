import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql";
import {hash} from 'bcryptjs';
import { User } from "../../entities/User";
import { getMongoManager } from "typeorm";

@Resolver(User)
export class RegisterResolver{
  @Query(() => String )
  async hello(){
    return 'hell'
  }

  @FieldResolver()
  async name(@Root() parent: User){
    return `${parent.firstName} ${parent.lastName}`
  }

  @Mutation(() => User)
  // @Field()
  async register(
    @Arg("firstName") firstName: string,
    @Arg("lastName") lastName: string,
    @Arg("email") email: string,
    @Arg("password") password: string 
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