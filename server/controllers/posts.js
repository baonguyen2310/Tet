import { PostModel } from "../models/PostModel.js";

export const getPosts = async (req, res) => { //function include promise need async
    try {
        
        const posts = await PostModel.find(); //promise need await
        console.log('posts', posts);
        res.status(200).json(posts);
    } catch(err){
        res.status(500).json({error: err});
    }
};

export const createPost = async (req, res) => {
    try {
        const newPost = req.body; //take from  client request

        const post = new PostModel(newPost); //create instance postmodel
        await post.save();  //save to database

        res.status(200).json(post); //send json to client 
    } catch(err) {
        res.status(500).json({ error: err});
    }
};

export const updatePost = async (req, res) => {
    try {
        const updatePost = req.body;
        const post = await PostModel.findOneAndUpdate(
            { _id: updatePost._id }, 
            updatePost,
            { new: true });

        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};