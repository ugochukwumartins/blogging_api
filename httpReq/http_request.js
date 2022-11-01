const axios = require("axios");
var store = require("store");

const url = "http://localhost:3000/";

exports.demo = async (req, res) => {
  axios
    .get(url, {
      headers: {
        name: "value",
      },
    })
    .then(
      (response) => {
        var response = response.data;
      },
      (error) => {
        var status = error.response.status;
      }
    );
};

exports.addblog = async (req, res) => {
  var yourtoken = store.get("user").token;
  var body = {
    title: req.body.title,
    description: req.body.description,

    tags: req.body.tags,
    body: req.body.body,
  };
  console.log(req.body);
  axios
    .post(url + "create_blog", body, {
      headers: {
        "Content-type": "Application/json",
        Authorization: `Bearer ${yourtoken}`,
      },
    })
    .then(
      (response) => {
        var status = response.status;
        var message = response.statusText + " " + "blog created";
        res.redirect('/')
       // return res.json({ status: true, message });
      },
      (error) => {
        var status = error.response.status;
        var message = error.response.statusText;
        return res.json({ status, message });
      }
    );
};
