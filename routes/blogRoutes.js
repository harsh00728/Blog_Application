const express= require('express');
const { 
    getAllBlogsController,
    createBlogController, 
    updateBlogController, 
    getBLogByIdController, 
    deleteBlogController, 
    userBlogController
} = require('../controllers/blogController');

//router object
const router= express.Router()

// routes
//GET || all blogs.
router.get('/all-blog', getAllBlogsController);

//POST  || create blog
router.post('/create-blog', createBlogController)

// PUT || update blog
router.put('/update-blog/:id', updateBlogController);

// GET || Single blog Details
router.get('/get-blog/:id', getBLogByIdController);

// DELETE || delete blog
router.delete('/delete-blog/:id', deleteBlogController);

//GET || user Blog.
router.get('/user-blog/:id', userBlogController);

module.exports= router;