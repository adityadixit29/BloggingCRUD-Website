import { News } from "../models/news.js";
import { NewsUpdate } from "../models/newsUpdate.js";

export const addNews = async (req, res) => {
    try {
        const { title, subtitle, image, content, likes, views, comments } = req.body;

        const news = await News.create({
            title,
            subtitle,
            image,
            content,
            likes,
            views,
            comments

        })
        res.status(201).json({
            success: true,
            // news,
            message: "News Added Successfully"


        })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
export const updateNews = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, subtitle, image, content } = req.body;

        // Find the news article by ID and update it
        const updatedArticle = await News.findOneAndUpdate(
            { _id: id },
            {
                title,
                subtitle,
                image,
                content
            },
            { new: true, runValidators: true }
        );

        if (!updatedArticle) {
            return res.status(404).json({ message: 'News article not found' });
        }

        res.status(200).json({
            success: true,
            news: updatedArticle,
            message: "News Updated Successfully"
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
export const DeleteNews = async (req, res) => {
    try {
        const task = await News.findById(req.params.id)
        if (!task) {
            return next(new ErrorHandler("Task not found", 404))
        }
        await task.deleteOne();

        res.status(201).json({
            success: true,
            message: "Task Deleted"
        })
    } catch (error) {
        next(error)
    }
};

export const getnews = async (req, res) => {
    try {


        const getnews = await News.find();
        res.status(201).json({
            success: true,
            getnews,


        })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
export const getSinglenews = async (req, res) => {
    try {

        const { id } = req.params;
        const getSinglenews = await News.findById(id);
        res.status(201).json({
            success: true,
            getSinglenews,


        })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const getlikes = async (req, res) => {

    try {
        const allNews = await News.find({}, 'title likes'); // Fetch only title and likes fields
        res.status(200).json({
            success: true,
            likes: allNews
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
export const getviews = async (req, res) => {

    try {
        const allviews = await News.find({}, 'title views'); // Fetch only title and likes fields
        res.status(200).json({
            success: true,
            views: allviews
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
export const getcomments = async (req, res) => {

    try {
        const allcomments = await News.find({}, 'title comments'); // Fetch only title and likes fields
        res.status(200).json({
            success: true,
            comments: allcomments
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}