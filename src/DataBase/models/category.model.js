import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const schema = new mongoose.Schema({
    title:{
       ar:{
         type:String,
         required:true,
         unique:true,
       },
       en:{
         type:String,
         required:true,
         unique:true,
       },
    },
    slug:{
        type:String,
        unique:true
    },
    image:{
        type:String,
    },

},{timestamps:true,versionKey:false})

schema.plugin(mongoosePaginate)

export const Category = mongoose.model('Category',schema)
