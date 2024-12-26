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
    description:{
        type:String,
        required:true
    },
    coverImage:{
        type:String,
    },
    images:[String],
    price:{
        type:Number,
        min:0,
        required:true
    },
    priceAfterDiscount:{
        type:Number,
        min:0,
        required:true
    },
    sold:Number,
    stock:Number,
    Category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    subCategory:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory'
    },
    brand:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand'
    },
    rateAverge:{
        type:Number,
        min:0,
        max:5
    },
    rateCount:{
        type:Number,
        default:0
    }

},{timestamps:true,versionKey:false})

schema.plugin(mongoosePaginate)

export const Product = mongoose.model('Product',schema)
