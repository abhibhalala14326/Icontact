import mongoose, { Schema } from "mongoose";
import { IContact } from "../model/IContact";


const ContectSchema = new Schema<IContact>({
    user:{
        // type:Schema.Types.ObjectId,
        // ref:"User"
        type:String

    },
    name:{type:String , required:true , trim:true},
    imageUrl:{type:String , required:true},
    mobile:{type:String , required:true , unique:true},
    email:{type:String},
    company:{type:String },
    title:{type:String},
    groupId:{
   type:String ,required:true 
    }


},{timestamps:true})


export const ContectTable = mongoose.model<IContact>("Contact" , ContectSchema)