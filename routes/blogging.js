const express= require('express');
const passport = require("passport")
const blogController = require('../controllers/blogController');
const blogRouter = express.Router();



blogRouter.get("/",blogController.getAllPubBlog );
  
  blogRouter.get("/get_a_published_blog",blogController.getPubBlog );
  blogRouter.post("/create_blog",passport.authenticate('jwt', { session: false }), blogController.createPubBlog);
  blogRouter.post("/deleteBlog/:id",blogController.deleteBlog);
  blogRouter.get("/get_a_published_blog/:id",blogController.findBlogById);
  blogRouter.get("/get_a_published_blog_byAuthor/:author",blogController.findAuthor);
  blogRouter.get("/createBlog",blogController.getCreateBlog );
  blogRouter.post("/updateBlog",blogController.updateBlog);
  

  module.exports = blogRouter;