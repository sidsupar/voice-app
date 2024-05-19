import express from "express";
import cors from "cors";
import session from 'express-session';
import { createClient }  from 'redis';
import connectRedis from 'connect-redis';
import adminRouter from "./admin/index";
import userRouter from "./user/index";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

console.log(`EXPRESS PORT IN ENV = ${process.env.HTTP_PORT}`);

const app = express();

const redisClient = createClient();

//starting redis client
async function connectRedisClient(){
    console.log("Initiating redis client");
    await redisClient.connect();
}

redisClient.on("error", function(err){
    console.log("Error occured while connecting redis "+err.message);
});

redisClient.on("ready", function(){
    console.log("Connected to redis");
});

const redisStore = new connectRedis({
    client:redisClient,
    prefix:"voicesess:"
});    

//Setting up redis session store
app.use(session({
    store: redisStore,
    secret: process.env.REDIS_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // if true only transmit cookie over https
        httpOnly: true, // if true prevent client side JS from reading the cookie 
        maxAge: 1000 * 60 * 60 // session max age in miliseconds
    }
}));

//adding cors support
app.use(cors({
    origin:true,
    credentials:true
}));

//adding parsing support
app.use(express.json());
app.use(express.urlencoded({extended:true}));//allows nested objects to be read easily(json like exp)

app.use(cookieParser());

app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/user", userRouter);

const port = process.env.HTTP_PORT ?? 3559;

async function main(){
    try{    
        await connectRedisClient();
        app.listen(port, ()=>{
            console.log("Connected successfully, "+"Listening to port "+port);
        });
    }catch(err:any){
        console.log(err+"Error connecting to port "+port);
    }
}
app.use((err:any, req:Express.Request , res:Express.Response, next:(err?: any) => void) => {

    console.error(err.message); // Log the error stack trace for debugging
    //@ts-ignore
    res.status(err.cause).json({ 
        message: 'Something went wrong!',
        error:err.message
    }); // Respond with a generic error message
  
});
main();
