import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const schema = new mongoose.Schema({
    comment:{
        type:String,
        required:true,
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true,
    },
    product:{
        type:mongoose.Types.ObjectId,
        ref:"Product",
        required:true,
    },
    rating:{
        type:Number,
        min:0,
        max:5,
        required:true,
    },
},{timestamps:true,versionKey:false})

schema.plugin(mongoosePaginate)

export const Category = mongoose.model('Category',schema)
