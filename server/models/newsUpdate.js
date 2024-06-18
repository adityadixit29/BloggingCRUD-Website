import mongoose from "mongoose";

const newsUpdateSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String
    },
    image: {
        type: String,  // Storing image URL
        required: true
    },
    content: {
        type: String
    }
});

export const NewsUpdate = mongoose.model("NewsUpdate",newsUpdateSchema)
