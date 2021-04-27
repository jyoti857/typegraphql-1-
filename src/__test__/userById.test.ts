import { Connection } from "typeorm";
import { gCall } from "../test-utils/gCall";
import { testConn } from "../test-utils/testConn"
import faker from 'faker';
import { User } from "../entities/User";

let conn: Connection;
beforeAll(async() => {
  conn = await testConn();
})

afterAll(async() => {
  await conn.close();
})
const UserByIdMutation = `
  {
    userById{
      id
      firstName
      lastName
      email
      name
    }
  }`

describe("UserById", () => {
  it("get a user by Id", async() => {

    const user = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    }

    const newUser = await User.create(user).save();
    console.log("new user ---> ", newUser);
    const dbUser = await User.findOne({email: newUser.email});
    console.log("db user from user by id ", dbUser);
    
    const response = await gCall({
      source: UserByIdMutation,
      user: newUser
    })

    console.log("response from user by id ----> ", response);

    expect(response).toMatchObject({
      data: {
        userById: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        }
      }
    })
  }, 10000);
  it("return null", async() => {
    const response = await gCall({
      source: UserByIdMutation,
    });

    expect(response).toMatchObject({
      data: {
        userById: null
      }
    })
  })
})
