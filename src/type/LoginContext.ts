
import {Request} from 'express';

export interface LoginContext{
  req: Request;
}

export interface UserContext{
  req: Request;
}