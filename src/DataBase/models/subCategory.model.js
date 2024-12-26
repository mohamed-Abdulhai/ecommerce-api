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
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:true
    }
},{timestamps:true,versionKey:false})

schema.plugin(mongoosePaginate)

export const SubCategory = mongoose.model('SubCategory',schema)
