import express from "express";
import bcrypt from "bcrypt";
import { ObjectId } from "../db.js";
import { addUsers, deleteUsers, generateToken, getAllUsers, getUsers ,  } from "../controllers/users.js";

const router = express.Router();
// ============================= Sign Up - encrypt =============================================

// send username , password via post req
router.post("/signup", async (req, res) => {
  try {
    // const userDetails = await req.body;
    const users = await getUsers(req.body.email);
    if (!users) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      const hashedUser = await { ...req.body, password: hashedPassword };
      // const result = await addUsers(hashedUser);
      await addUsers(hashedUser);
      res.status(200).json({ message: "Sucessfully signed up" });
      return
    }
    res.status(400).json({ message: "Given email already exists" });
  } catch (error) {
    console.log("Error Occured", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/", async(req, res)=>{
  try {
    const result = await getAllUsers();
    res.status(200).json({ data: result })
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ============================= Sign In / login - decrypt =============================================

router.post("/login",async(req,res)=>{
  try {
    // check whether user email is availale or not for signin
    const user = await getUsers(req.body.email)
    if(!user){
      res.status(400).json({message:"Invalid Email"})
      return
    }
    // decrypt the password and compare
    const validatePassword = await bcrypt.compare(
      req.body.password,
      user.password
    )
    // console.log(validatePassword)
    if(!validatePassword){
      res.status(400).json({message:"Invalid Password"})
      return
    }
    const token = generateToken(user._id);
    res.status(200).json({message:"Sucessfully logged in",token})
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
})
//=========================================================================================



















router.delete("/:id",async(req,res)=>{
  const {id} = req.params;
  try {
     const answer = await deleteUsers(id)
      res.status(200).json({message:"Deleted Sucessfully"})
  } catch (error) {
      console.log("error :", error)
      res.status(500).json({message:"Internal Server Error"})
  }
})

export const userRouter = router;












//----------------------------------------- explanation ----------------------------

// const router = express.Router();

// // send username , password via post req
// router.post("/signup",async(req,res)=>{
//     try {
//         const userDetails = await req.body;

//     // encrypting the password ( hash + salt value)
//         const salt = await bcrypt.genSalt(10);
//       //  console.log("salt : ", salt, salt.length)
//         const hashedPassword = await bcrypt.hash(req.body.password,salt)
//       //  console.log("hashedPassword : ", hashedPassword, hashedPassword.length)
//         const hashedUser = await{...req.body , password:hashedPassword}
//         res.status(200).json(hashedUser)
//     // ovvoru time ium signup iku post req tara apo , orae password iku multiple hashvalue kidaikum (for every post req)
//     // $2b$10$CzeLM2dp5..Zggzy7HSs2OySZMsgG1JQVH6MDHLsO4/g3PEILUlvW 60(length)
//     // $2b$10$ZKB8JEM7NAIDPaCU.zjy6OKi231pTl8M2yhto4aoac88TFhQNA2lm 60(length)

//     // $2b$10$v6XfAZYKdnWyH9gmispbQ.eoJwNmEEB7p9jf1PkNwUiwxtyfOAX5C 60(length)
//     // salt : $2b$10$v6XfAZYKdnWyH9gmispbQ.
//     // hash : $2b$10$v6XfAZYKdnWyH9gmispbQ.eoJwNmEEB7p9jf1PkNwUiwxtyfOAX5C

//     // each time - hash and salt different different aee generate agum.

//     } catch (error) {
//         console.log("Error Occured",error)
//         res.status(500).json({message:"Internal Server Error"})
//     }
// })

// export const userRouter = router
// // import this in index.js via app.use()
