import { User } from "../../entities/User";
import { UserContext } from "../../type/LoginContext";
import { Ctx, Query, Resolver } from "type-graphql";
import { getMongoManager } from "typeorm";


@Resolver()
export class UserByIdResolver{

  @Query(() => User, {nullable: true})
  async userById(@Ctx() ctx: UserContext): Promise<User | undefined>{
    
    const id = ctx.req.sessionID;
    console.log(ctx.req.sessionID)
    if(!id){
      return ;
    }
    // console.log('id--> ', id,  User.findOne(id), User.count());
    const manager =  getMongoManager();
    const user = await manager.findOne(User, {id})
    // return await User.findOne({where: {email: ctx.req.body}}); 
    return user;
  }
}