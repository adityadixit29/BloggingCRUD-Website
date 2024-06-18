import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
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
    },
    likes: {
        type: Number,
        default: 0
    },
    views: {
        type: Number,
        default: 0
    },
    comments: {
        type: Number,  // Array of comment IDs or comment text
    }
});
newsSchema.pre('save', function(next) {
    // Generate random values for views, likes, and comments
    this.views = Math.floor(Math.random() * 1000) + 1; // Example range: 1 to 1000
    this.likes = Math.floor(Math.random() * 100) + 1; // Example range: 1 to 100
    this.comments = Math.floor(Math.random() * 10) + 1; // Example range: 1 to 100
    
    next();
});
export const News = mongoose.model("News",newsSchema)
