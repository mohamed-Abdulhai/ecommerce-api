import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const schema = new mongoose.Schema({
    actionBy:{
        type:mongoose.Types.ObjectId,
        ref: 'User',
        required:true,
    },
    action:{
        type:String,
        enum:['created','updated','deleted','deletedAll'],
        required:true,
    },
    collectionName:{
        type:String,
        required:true,
    },
    item:{
        type:mongoose.Types.ObjectId,
        }
},{timestamps:true})

schema.plugin(mongoosePaginate)

export const Log = mongoose.model('Log',schema)