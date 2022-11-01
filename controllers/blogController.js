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
    const blogId = req.params.id.toString();
    console.log(req.params);
    console.log(req.params.id);
    var myquery = { _id: blogId };
    const blog = await blogmodel.find(myquery);

    return res.json({ status: true, message: "this is a blog", blog });
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
      user:users,
      blogs: blog,
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



exports.updateBlog = async (req, res) => {
  const blogId = req.params.id.toString();
  blogmodel.updateOne(
    { name: "Sergio Ramos" },
    { club: "Real Madrid" },
    function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    }
  );
};
