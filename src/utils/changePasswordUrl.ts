import { CHANGE_PASSWORD } from "../../src/constants/constants";
import { redis } from "../../src/redis";
import { v4 } from "uuid"



export const changePasswordUrl = async(userEmail: string) => {

  const token = CHANGE_PASSWORD + v4();
  await redis.set(token, userEmail, 'ex', 60 * 60 * 24); // 1 day expiration 

  return `http://localhost:3000/changePassword/${token}`
}