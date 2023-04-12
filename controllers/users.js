// import {client} from "../db.js"
// import { ObjectId } from "../db.js"
// import jwt from "jsonwebtoken"

// export function addUsers(userDetails){
//     return client
//     .db("cloud")
//     .collection("users")
//     .insertOne(userDetails)
// }

// export function getUsers(userEmail){
//     return client 
//     .db("cloud")
//     .collection("users")
//     .findOne({email:userEmail})
// }
// export function getAllUsers(){
//     return client 
//     .db("cloud")
//     .collection("users")
//     .find()
//     .toArray()
// }

// export function deleteUsers(id){
//     return client
//     .db("cloud")
//     .collection("students")
//     .deleteOne({_id:new ObjectId(id)})
// }

// export function generateToken(id){
//  return jwt.sign({id}, process.env.SECRET_KEY, {expiresIn:"30d"})
// }
