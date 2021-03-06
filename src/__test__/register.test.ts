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
const RegisterMutation = `
  mutation Register($data: RegisterInput!){
    register(data: $data){
      id
      firstName
      lastName
      email
      name
    }
  }`

describe("Register", () => {
  it("create a user", async() => {

    const user = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    }
    const response = await gCall({
      source: RegisterMutation,
      variableValues: {
        data: user
      }
    })
    expect(response).toMatchObject({
      data: {
        register: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        }
      }
    })

    const dbUser = await User.findOne({email: user.email});
    expect(dbUser).toBeDefined();
    expect(dbUser?.isConfirmed).toBeFalsy();
    expect(dbUser!.email).toBe(user.email);
  }, 30000)
})
