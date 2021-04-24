import { IsEmailAlreadyExist } from "../module/validator";
import { Field, ID, ObjectType, Root } from "type-graphql";
import { BaseEntity, Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

@ObjectType()
@Entity()
export class User extends BaseEntity{

  @Field(() => ID)
  @ObjectIdColumn()
  id: ObjectID;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @IsEmailAlreadyExist({message: 'email is already in use'})
  @Field()
  @Column('text', {unique: true})
  email: string;

  @Field()
  name(@Root() parent: User): string{
    return `${parent.firstName} ${parent.lastName}`
  }

  @Column()
  password: string;
}