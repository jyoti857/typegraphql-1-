
import { CONFIRMATION_MAIL } from '../../src/constants/constants';
import {v4} from 'uuid';
import {redis} from '../redis';

export const createConfirmationEmail = async (userEmail: string) => {

  const token = CONFIRMATION_MAIL + v4();
  await redis.set(token, userEmail, "ex", 60 * 60 * 24); // 1 day expiration 
  
  return `http://localhost:3000/user/confirm/${token}`
}