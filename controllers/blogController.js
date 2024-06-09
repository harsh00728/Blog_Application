const mongoose= require('mongoose');
const blogModel= require('../models/blogModel');
const userModel= require('../models/userModel');

// GET ALL BLOGS
exports.getAllBlogsController= async (req, res)=> {
    try{
        const blogs= await blogModel.find({}).populate("user");
        if(!blogs){
            return res.status(200).send({
                success: false,
                message: 'No blogs found'
            })
        }
        return res.status(200).send({
            success: true,
            BlogCount: blogs.length,
            message: 'All Blogs lists',
            blogs
        });
    } catch(err){
        console.log(err);
        return res.status(500).send({
            success: false,
            message: "error while getting blogs",
            err
        })
    }
}

// Create Blog
exports.createBlogController= async(req, res)=> {
    try{
        const {title, description, image, user}= req.body;
        // validation.
        if(!title || !description || !image || !user){
            return res.status(400).send({
                success: false,
                message: 'please provide all fields',
            });
        }
        
        const exisitingUser= await userModel.findById(user);
        //user validation.
        if(!exisitingUser){
            return res.status(404).send({
                success: false,
                message: 'unable to find user'
            });
        }

        const newBlog= new blogModel({title, description, image, user});
        await newBlog.save();
        exisitingUser.blogs.push(newBlog);
        await exisitingUser.save();
        await newBlog.save();
        return res.status(201).send({
            success: true,
            message: 'blog created',
            newBlog,
        })
    } catch(err) {
        console.log(err);
        return res.status(400).send({
            success: false,
            message: 'error while creating blog',
            err
        });
    }
};

// Update blogs
exports.updateBlogController= async(req, res)=> {
    try{
        const {id} = req.params;
        const {title, description, image}= req.body;
        const blog= await blogModel.findByIdAndUpdate(id, {...req.body}, {new:true});
        return res.status(200).send({
            success: true,
            message: 'blog updated',
            blog
        })
    } catch(err){
        console.log(err);
        return res.status(400).send({
            success: false,
            message: 'error while updating blog',
            err
        });
    }
};

// Single Blog
exports.getBLogByIdController= async(req, res)=> {
    try{
        const {id}= req.params;
        const blog= await blogModel.findById(id);
        if(!blog){
            return res.status(404).send({
                success: false,
                message: 'blog not found with this id',
            });
        }
        return res.status(200).send({
            success: true,
            message: 'fetch single blog',
            blog,
        })
    } catch(err){
        console.log(err);
        return res.status(400).send({
            success: false,
            message: 'error while getting single blog',
            err
        });    
    }
};

// delete blog
exports.deleteBlogController= async(req, res)=> {
    try{
       // const {id}= req.params;
        const blog= await blogModel.findByIdAndDelete(req.params.id).populate("user");
        await blog.user.blogs.pull(blog);
        await blog.user.save();
        return res.status(200).send({
            success: true,
            message: 'blog deleted',
        });
    } catch(err){
        console.log(err);
        return res.status(400).send({
            success: false,
            message: 'error while deleting single blog',
            err,
        });    
    }
};

// GET USER BLOG
exports.userBlogController= async(req, res)=> {
    try{ 
        const userBlog= await userModel.findById(req.params.id).populate("blogs");
        if(!userBlog){
            return res.status(404).send({
                success: false,
                message: "blogs not found with this id",
            })
        }
        return res.status(200).send({
            success: true,
            message: "user blogs",
            userBlog,
        });
    } catch(err){
        console.log(err);
        return res.status(400).send({
            success: false,
            message: 'error in user blog',
            err
        });
    }
};