const passport = require("passport");
const jwt = require("jsonwebtoken");
const moment = require("moment");
var store = require("store");
const blogmodel = require("../models/blogModel");

exports.getAllPubBlog = async (req, res) => {
  try {
    var users = store.get("user");
    //console.log(users.token);
    const blogs = await blogmodel.find();
    const blog = await blogs.filter((blog) => {
      return blog.state === "published";
    });

    res.render("index", {
      user: users,
      blogs: blog,
      pageTitle: "Home",
      path: "/",
    });
  } catch (e) {
    console.log(e);
  }
  // return res.json({ status: true , message:"this is all blog", blog});
};

exports.getPubBlog = async (req, res) => {
  try {
    const blog = await blogmodel.find({ state: "published" }).limit(1);
    // const blog = await blogs.filter((blog) => {
    //   return blog.state ==="draft";
    // });

    return res.json({ status: true, message: "this is a blog", blog });
  } catch (e) {
    console.log(e);
  }
};
exports.createPubBlog = async (req, res) => {
  try {
    var users = store.get("user").user_name;
    const bodyData = req.body;

    const blog = await blogmodel.create({
      title: bodyData.title,
      description: bodyData.description,
      author: users,
      state: bodyData.state,
      read_count: bodyData.read_count,
      reading_time: bodyData.reading_time,
      tags: bodyData.tags,
      body: bodyData.body,

      timestamp: moment().toDate(),
    });

    return res.json({ status: true, message: "blog created", blog });
  } catch (e) {
    console.log(e);
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id.toString();
    console.log(req.params);
    console.log(req.params.id);
    var myquery = { _id: blogId };
    blogmodel.deleteOne(myquery, function (err, obj) {
      if (err) throw err;
      console.log(obj + " document(s) deleted");
      res.redirect("/");
    });
  } catch (e) {
    console.log(e);
  }
  // Product.findByPk(productId).then(product =>{

  //  return product.destroy();
  // }).then(result =>{
  //   console.log('result');
  //   res.redirect("/");
  // }).catch(erro =>{
  //   console.log(erro);
  // });
};

exports.findBlogById = async (req, res) => {
  try {
    var users = store.get("user");
    const blogId = req.params.id.toString();
    console.log(req.params);
    console.log(req.params.id);
    var myquery = { _id: blogId };
    const blog = await blogmodel.findOne(myquery);

   // return res.json({ status: true, message: "this is a blog", blog });
    res.render("blog/updateBlog", {
      user: users,
      blogFound : blog,
      pageTitle: "Up Date Blog",
      path: "/updateBlogses",
    });
    // Product.findByPk(productId).then(product =>{
  } catch (e) {
    const blog ={}
    return res.json({ status: true, message: "no match found ", blog});
  }
  //  return product.destroy();
  // }).then(result =>{
  //   console.log('result');
  //   res.redirect("/");
  // }).catch(erro =>{
  //   console.log(erro);
  // });
};



exports.findAuthor = async (req, res) => {
  try {
    var users = store.get("user");
    const authors = req.params.author;
    console.log(req.params);
    console.log(req.params.author);
    var myquery = { author: authors};
    const blog = await blogmodel.find(myquery);
if(blog.length === 0){
  return res.json({ status: true, message: "no record found", blog });
}
    //return res.json({ status: true, message: "this is a blog", blog });
    res.render("blog/myblog", {
      blogs: blog,
      user:users,
      pageTitle: "My Blog",
      path: "/myBlog",
    });
    // Product.findByPk(productId).then(product =>{
  } catch (e) {
    const blog ={}
    return res.json({ status: true, message: "no match found ", blog});
  }
  //  return product.destroy();
  // }).then(result =>{
  //   console.log('result');
  //   res.redirect("/");
  // }).catch(erro =>{
  //   console.log(erro);
  // });
};

exports.getCreateBlog = (req, res, next) => {
  var users= store.get('user');
  res.render("blog/createBlog", {
     user:users,
    // blogs: blog,
     pageTitle: "Add blog",
     path: "/createBlog",
   });
};






exports.updateBlog = async (req, res) => {

  try{
  const blogId = req.params.id.toString();
  const bodyData = req.body;
  const blog = await blogmodel.findOne( { _id: blogId });
  const updateval = {
    // _id: bodyData._id,
    // title: bodyData.title,
    // description: bodyData.description,
    // author: bodyData.author,
    // state: bodyData.state,
    read_count:blog.read_count  +1,
    // reading_time: bodyData.reading_time,
    // tags: bodyData.tags,
    // body: bodyData.body,
    // timestamp: bodyData.timestamp,
  };
  blogmodel.updateOne(
    { _id: blogId },
    updateval ,
    function (err, result) {
      if (err) {
        res.send(err);
      } else {
       // res.json(result);
        return res.json({ status: true, message: "Updated sucessfully",result});
      }
    }
  );

  }catch(e){

  }
};




exports.updateBlogByDetails = async (req, res) => {

  try{
  const blogId = req.params.id.toString();
  const bodyData = req.body;
  const blog = await blogmodel.findOne( { _id: blogId });
  const updateval = {
    
    title: bodyData.title,
    description: bodyData.description,
   
    state: bodyData.state,
   
 
    tags: bodyData.tags,
    body: bodyData.body,
  
  };
  blogmodel.updateOne(
    { _id: blogId },
    updateval ,
    function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.redirect("/");
       // return res.json({ status: true, message: "Updated sucessfully",result});
      }
    }
  );

  }catch(e){

  }
};
