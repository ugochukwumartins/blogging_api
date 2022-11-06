const passport = require("passport");
const jwt = require("jsonwebtoken");
const moment = require("moment");
var store = require("store");
const blogmodel = require("../models/blogModel");

exports.getAllPubBlog = async (req, res) => {
  try {
    var perPage = 20;
    var page = req.params.page || 1;
    var users = store.get("user");

    blogmodel
      .find({ state: "published" })
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec(function (err, blog) {
        blogmodel.count().exec(function (err, count) {
          if (err) return next(err);
          res.render("index", {
            user: users,
            blogs: blog,
            pageTitle: "Home",
            path: "/",
            current: page,
            pages: Math.ceil(count / perPage),
          });
        });
      });
  } catch (e) {
    console.log(e);
  }
  // return res.json({ status: true , message:"this is all blog", blog});
};

exports.getPubBlog = async (req, res) => {
  try {
    const blog = await blogmodel.find({ state: "published" }).limit(1);

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
      blogFound: blog,
      pageTitle: "Up Date Blog",
      path: "/updateBlogses",
    });
    // Product.findByPk(productId).then(product =>{
  } catch (e) {
    const blog = {};
    return res.json({ status: true, message: "no match found ", blog });
  }
};

exports.findAuthor = async (req, res) => {
  try {
    var perPage = 20;
    var page = req.params.page || 1;
    var users = store.get("user");
    const authors = req.params.author;
    console.log(req.params);
    console.log(req.params.author);
    var myquery = { author: authors };
    const blog = await blogmodel.find(myquery);
    if (blog.length === 0) {
      res.render("error", {
        errors: "no record found",
        // blogs: blog,
        pageTitle: "Error",
        path: "/error",
      });
      return res.json({ status: true, message: "no record found", blog });
    }

    blogmodel
      .find({ myquery })
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec(function (err, blog) {
        blogmodel.count().exec(function (err, count) {
          if (err) return next(err);
          res.render("blog/myblog", {
            user: users,
            blogs: blog,
            pageTitle: "My Blog",
            path: "/myBlog",
            current: page,
            pages: Math.ceil(count / perPage),
          });
        });
      });
  } catch (e) {
    const blog = {};
    return res.json({ status: true, message: "no match found ", blog });
  }
};

exports.getCreateBlog = (req, res, next) => {
  var users = store.get("user");
  res.render("blog/createBlog", {
    user: users,
    // blogs: blog,
    pageTitle: "Add blog",
    path: "/createBlog",
  });
};

exports.updateBlog = async (req, res) => {
  try {
    var users = store.get("user");
    const blogId = req.params.id.toString();
    const bodyData = req.body;
    const blog = await blogmodel.findOne({ _id: blogId });
    const updateval = {
      read_count: blog.read_count + 1,
    };
    blogmodel.updateOne({ _id: blogId }, updateval, function (err, result) {
      if (err) {
        res.send(err);
      } else {
        // res.json(result);
        res.render("blog/blogView", {
          user: users,
          blogs: blog,
          pageTitle: "Read View",
          path: "/myBlogView",
        });
        //    return res.json({ status: true, message: "Updated sucessfully",result});
      }
    });
  } catch (e) {}
};

exports.updateBlogByDetails = async (req, res) => {
  try {
    const blogId = req.params.id.toString();
    const bodyData = req.body;
    const blog = await blogmodel.findOne({ _id: blogId });
    const updateval = {
      title: bodyData.title,
      description: bodyData.description,

      state: bodyData.state,

      tags: bodyData.tags,
      body: bodyData.body,
    };
    blogmodel.updateOne({ _id: blogId }, updateval, function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.redirect("/");
        // return res.json({ status: true, message: "Updated sucessfully",result});
      }
    });
  } catch (e) {}
};

exports.getSearchPubBlog = async (req, res) => {
  try {
    var perPage = 20;
    var searchedquery = req.body.searchQ;
    var page = req.params.page || 1;
    var users = store.get("user");

    blogmodel
      .find({
        state: "published",
        $or: [
          { author: searchedquery },
          { title: searchedquery },
          { tags: searchedquery },
        ],
      })
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec(function (err, blog) {
        blogmodel.count().exec(function (err, count) {
          if (err) return next(err);

          res.render("blog/search_result", {
            user: users,
            blogs: blog,
            pageTitle: "Search Result",
            path: "/",
            current: page,
            pages: Math.ceil(count / perPage),
          });
        });
      });
  } catch (e) {
    console.log(e);
  }
  // return res.json({ status: true , message:"this is all blog", blog});
};
