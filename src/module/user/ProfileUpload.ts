import { createWriteStream } from "fs";
import { Arg, Mutation, Resolver } from "type-graphql";
import { IProfileUpload } from "../types/IProfileUpload";
import {GraphQLUpload} from 'graphql-upload';

@Resolver()
export class ProfileUploadResolver{

  @Mutation(() => Boolean)
  async profileUpload(
    @Arg('picture', () => GraphQLUpload) {
      fileName, 
      createReadStream
    }:IProfileUpload
  ): Promise<boolean>{
    return new Promise(async(resolve, reject) => {
      return createReadStream()
        .pipe(createWriteStream(__dirname+`/../../images/${fileName}`))
        .on('finish', () => resolve(true))
        .on("error", () => reject(false))
    })
  }
}
