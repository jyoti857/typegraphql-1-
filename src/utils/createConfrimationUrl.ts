
import {v4} from 'uuid';
import {redis} from '../redis';

export const createConfirmationEmail = async (userEmail: string) => {

  const token = v4();
  await redis.set(token, userEmail, "ex", 60 * 60 * 24); // 1 day expiration 
  
  return `http://localhost:3000/user/confirm/${token}`
}