import { Connection } from "typeorm";
import { gCall } from "../test-utils/gCall";
import { testConn } from "../test-utils/testConn"


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
    await console.log(await gCall({
      source: RegisterMutation,
      variableValues: {
        data:{
          firstName: "a",
          lastName: "b",
          email: "a@b.com",
          password: "123456" 
        }
      }
    }))
  })
})
