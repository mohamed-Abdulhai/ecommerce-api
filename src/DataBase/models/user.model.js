import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { Role } from "../../utilities/enum/userRole.enum.js";
const schema = new mongoose.Schema({
    userName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    password:{
        type:String,
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    role:{
        type: String,
        enum: [Role.ADMIN,Role.STAFF,Role.USER],
        default: Role.USER
    },
    address:{
        type: String,
    },
    phone:{
        type: String,
    },

},{timestamps:true,versionKey:false})

schema.plugin(mongoosePaginate)

export const User = mongoose.model('User',schema)
