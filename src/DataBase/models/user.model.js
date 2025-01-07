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
    phone:{
        type: String,
    },
    role:{
        type: Number,
        enum: [Role.ADMIN,Role.STAFF,Role.USER],
        default: Role.USER
    },
    addresses: [ 
        {
            street: {
                type: String,
                required: true,
            },
            city: {
                type: String,
                required: true,
            },
            country: {
                type: String,
                required: true,
            },
            postalCode: {
                type: String,
            },
            isDefault: { 
                type: Boolean,
                default: false,
            },
        },
    ],
    wishlist: [ 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product', 
        },
    ],
    isActive: {
        type: Boolean,
        default: true
    },
    isBlocked: {
        type: Boolean,
        default: false
    },


},{timestamps:true,versionKey:false})

schema.plugin(mongoosePaginate)

export const User = mongoose.model('User',schema)
