import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const schema = new mongoose.Schema({
    code:{
        type:String,
        required:true,
        unique:true
    },
    discount:{
        type:Number,
        required:true,
        min:0,
        max:100
    },
    active:{
        type:Boolean,
        default:true
    },
    expires:{
        type:Date,
        required:true
    },
},{timestamps:true,versionKey:false})

schema.plugin(mongoosePaginate)

export const Coupon = mongoose.model('Coupon',schema)
