
import { Arg, Mutation, Resolver } from "type-graphql";
import { User } from "../../entities/User";
import { changePasswordUrl } from "../../utils/changePasswordUrl";
import { confirmedMail } from "../../utils/confirmedMail";


@Resolver()
export class forgotPasswordResolver{

  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg("email") email: string
  ){

    const user = await User.findOne({email});
    if(!user!.email) return false;

    await confirmedMail(user!.email, await changePasswordUrl(user!.email));
    return true;
  }
}