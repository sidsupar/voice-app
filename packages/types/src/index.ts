import { UsignIn, UsignUp, uSignIn, uSignUp, postBodyValue, PostBodyType } from "./zodValidations";

export enum StatusCodes{
  ok=200,
  created=201,
  accepted=202,
  badRequest=400,
  unauthorized=401,
  forbidden=403,
  notFound=404,
  conflict=409,
  invalidInput=422,
  tooManyRequests=429,
  internalServeError=500,
  badGateway=502,
  serviceUnavailable=503,
  gatewayTimeout=504
}

export type UserSignUp = UsignUp;
export type UserSignIn = UsignIn;
export type PostBody = PostBodyType;
export const userSignUp = uSignUp;
export const userSignIn = uSignIn;
export const postBody = postBodyValue;

export interface BlogType extends Partial<PostBody> {
  id?:number
  authorId?:number
  author:Partial<UsignUp>
  publishDate:string
}



