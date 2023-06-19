const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, unique: true },
        desc: { type: String, required: true },
        image: { type: String, required: true },
        category: { type: Array },
        gender: { type: String, required: true },
        price: { type: Number, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Products", ProductSchema);