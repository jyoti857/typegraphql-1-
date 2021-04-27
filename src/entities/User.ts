import { IsEmailAlreadyExist } from "../module/validator";
import { Field, ID, ObjectType, Root } from "type-graphql";
import { BaseEntity, Column, Entity, ObjectIdColumn } from "typeorm";
import { ObjectID } from "mongodb";
import { Min } from "class-validator";

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

  @Min(5)
  @Column()
  password: string;

  @Column()
  isConfirmed: boolean;
}