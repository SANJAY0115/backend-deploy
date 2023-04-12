import {client} from "../db.js"
import { ObjectId } from "../db.js"

export function getStudent(){
    return client
    .db("cloud")
    .collection("students")
    .find()
    .toArray()
}

export function addStudent(data){
   return client
    .db("cloud")
    .collection("students")
    .insertOne(data)
}

export function updateStudent(id,updateData){
    return client
    .db("cloud")
    .collection("students")
    .updateOne({_id:new ObjectId(id)} , {$set:updateData})
}

export function deleteStudent(id){
    return client
    .db("cloud")
    .collection("students")
    .deleteOne({_id:new ObjectId(id)})
}