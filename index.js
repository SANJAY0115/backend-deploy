import express from "express"
import dotenv from "dotenv"
import { studentsRouter } from "./routes/student.js";
import { userRouter } from "./routes/users.js";
import cors from "cors"

// env configurations
dotenv.config()
const PORT = process.env.PORT;

// middleware
const app = express();
app.use(express.json()); // middleware tells server to use json
app.use(cors()) //cors function which makes 2 different ports to speak frontend-3000 , backend-9000
 
app.use("/students",studentsRouter)
app.use("/users",userRouter)
// default url: users , router url : signup

// deploy pana url oda home age la endha cotent ium ilama , backend-deploy-delta.vercel.app
//cant get nu varudhu , adhuku oru get req , home page route
const router = express.Router();
// Check server or default api (get) - backend-deploy-delta.vercel.app
router.get("/", (req, res) => {
    try {
      res.send(`Server Active`)
    } catch (error) {
      console.log(error)
    }
  });



// http server initialization
app.listen(PORT,()=>console.log(`server started localhost:${PORT}`))




// export var ObjectId = obj.ObjectId      // object id for put and post in student.js