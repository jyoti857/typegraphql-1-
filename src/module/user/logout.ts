import { Ctx, Mutation, Resolver } from "type-graphql";
import { MainContext } from "../../type/MainContext";

@Resolver()
export class logoutResolver{

  @Mutation(() => Boolean)
  async logout(
    @Ctx() ctx: MainContext
  ): Promise<boolean>{

  return new Promise ((res, rej) => {
    ctx.req.session.destroy((err) => {
      if(err){
        console.log(err);
        return rej(false);
      }
      ctx.res.clearCookie('qid');
      res(true);
    })
  })
 }
}