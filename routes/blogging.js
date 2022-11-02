const express= require('express');
const passport = require("passport")
const blogController = require('../controllers/blogController');
const blogRouter = express.Router();




  
  blogRouter.get("/get_a_published_blog",blogController.getPubBlog );
  blogRouter.post("/create_blog",passport.authenticate('jwt', { session: false }), blogController.createPubBlog);
  blogRouter.post("/deleteBlog/:id",blogController.deleteBlog);
  blogRouter.get("/get_a_published_blog/:id",blogController.findBlogById);
  blogRouter.get("/get_a_published_blog_byAuthor/:author/:page?",blogController.findAuthor);
  blogRouter.get("/createBlog",blogController.getCreateBlog );
  blogRouter.get("/updateBlog/:id",blogController.updateBlog);
  blogRouter.post("/updateBlogdetails/:id",blogController.updateBlogByDetails);
  blogRouter.get("/:page?",blogController.getAllPubBlog );
  

  module.exports = blogRouter;