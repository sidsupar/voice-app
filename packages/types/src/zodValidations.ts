import zod from "zod";

/*
id           Int            @id @default(autoincrement())
  name         String?
  mob          BigInt
  email        String?
  address      String?
  password     String
  posts Posts[]
*/

export const uSignUp = zod.object({
    name:zod.string().max(40).optional(),
    mob:zod.string().max(12),
    email:zod.string().email().optional(),
    address:zod.string().max(60).optional(),
    password:zod.string().min(6).regex(/^[A-Za-z0-9]+[%$&*#@]+[A-Za-z0-9%$&*#@]*$/)
});

export type UsignUp = zod.infer<typeof uSignUp>;

export const uSignIn = zod.object({
    mob:zod.string().max(12).optional(),
    email:zod.string().email().optional(),
    password:zod.string().regex(/^[A-Za-z0-9]+[%$&*#@]+[A-Za-z0-9%$&*#@]*$/)
});

export type UsignIn = zod.infer<typeof uSignIn>;

/*
model Posts{
  id Int @id @default(autoincrement())
  heading String?
  images String?
  authorId Int
  author User @relation(fields: [authorId], references: [id])
  publishDate DateTime?
  desc String
  likes Int?
  dislikes Int?
}
*/

export const postBodyValue = zod.object({
  heading:zod.string(),
  images:zod.string().optional(),
  desc:zod.string(),
  likes:zod.number().optional(),
  dislikes:zod.number().optional(),
})

export type PostBodyType = zod.infer<typeof postBodyValue>

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