import express, {Request, Response} from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./db/connectDB";
import userRouter from "./routes/user.router";
import { jwtCheck } from "./middlewares/auth.middleware";

connectDB()

const app = express();

//Middleware that converts body of any incoming request to JSON 
app.use(express.json());

//middleware for cross platform access
app.use(cors());


//Whenever a request is made to /api/v1/user, the userRouter will be called
app.use('/api/v1/my/user', userRouter)

app.listen(7000, () => {
    console.log(`server is running on http://localhost:7000`);
})