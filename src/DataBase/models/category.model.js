import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const schema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    slug:{
        type:String,
        required:true,
        unique:true
    },
    image:{
        type:String,
    },

},{timestamps:true,versionKey:false})

schema.plugin(mongoosePaginate)

export const Category = mongoose.model('Category',schema)