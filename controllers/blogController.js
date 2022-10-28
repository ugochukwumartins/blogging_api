const passport = require("passport")
const jwt = require("jsonwebtoken")
const moment = require("moment");
const blogmodel = require("../models/blogModel")


exports.getAllPubBlog= async (req, res) => {
 
  const blogs = await  blogmodel.find();
    const blog = await blogs.filter((blog) => {
      return blog.state === "published";
    });
   
    return res.json({ status: true , message:"this is all blog", blog});
  }

exports.getPubBlog= async (req, res) => {
  
  const blog = await  blogmodel.find({"state":"published"}).limit(1);
    // const blog = await blogs.filter((blog) => {
    //   return blog.state ==="draft";
    // });

    
    
  
    return res.json({ status: true , message:"this is a blog", blog});
  }
exports.createPubBlog= async (req,res)=>{

    const bodyData = req.body;
   
  
    const blog = await blogmodel.create({
        title:bodyData.title  ,
        description: bodyData.description ,
        author: bodyData.author,
        state: bodyData.state,
        read_count: bodyData.read_count,
        reading_time: bodyData.reading_time,
        tags:bodyData.tags ,
        body:bodyData.body ,
       
        timestamp: moment().toDate(),
    });


  
    
    return res.json({ status: true, message:"blog created", blog });
}