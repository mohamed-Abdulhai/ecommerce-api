import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import slugify from "slugify";

const schema = new mongoose.Schema(
  {
    title: {
      ar: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
      en: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      ar: {
        type: String,
        required: true,
        trim: true,
      },
      en: {
        type: String,
        required: true,
        trim: true,
      },
    },
    coverImage: {
      type: String,
    },
    images: [String],
    price: {
      type: Number,
      min: 0,
      required: true,
    },
    priceAfterDiscount: {
      type: Number,
      min: 0,
      validate: {
        validator: function (value) {
          return value <= this.price;
        },

      },
    },
    sold: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      default: 0,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
    },
    rateAverge: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    rateCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true, versionKey: false }
);

// Middleware to generate slug
schema.pre("validate", function (next) {
  if (!this.slug && this.title?.en) {
    this.slug = slugify(this.title.en, { lower: true, strict: true });
  }
  next();
});

schema.plugin(mongoosePaginate);

export const Product = mongoose.model("Product", schema);
