import express from "express"
import dotenv from "dotenv"
import { studentsRouter } from "./routes/student.js";
// import { userRouter } from "./routes/users.js";
import cors from "cors"

// env configurations
dotenv.config()
const PORT = process.env.PORT;

// middleware
const app = express();
app.use(express.json()); // middleware tells server to use json
app.use(cors()) //cors function which makes 2 different ports to speak frontend-3000 , backend-9000
 
app.use("/students",studentsRouter)
// app.use("/users",userRouter)
// default url: users , router url : signup

// export var ObjectId = obj.ObjectId      // object id for put and post in student.js

// http server initialization
app.listen(PORT,()=>console.log(`server started localhost:${PORT}`))