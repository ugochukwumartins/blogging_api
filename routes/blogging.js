const express= require('express');
const passport = require("passport")
const blogController = require('../controllers/blogController');
const blogRouter = express.Router();



blogRouter.get("/all_published_blogs",blogController.getAllPubBlog );
  
  blogRouter.get("/get_a_published_blog",blogController.getPubBlog );
  blogRouter.post("/create_blog",passport.authenticate('jwt', { session: false }), blogController.createPubBlog);
  blogRouter.post("/deleteBlog/:id",blogController.deleteBlog);

  module.exports = blogRouter;