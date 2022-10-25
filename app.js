const express = require("express");
const moment = require("moment");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
//const orderModel = require("./orderModel");
const passport = require("passport")
const usersModel = require("./models/userModel");
//const auth = require("./authenticate");
const jwt = require("jsonwebtoken")
require("dotenv").config();
require("./services/auth_with_jwt");
const PORT = 3000;
let User;
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.post('/register', passport.authenticate('signup', { session: false }), async (req, res) => {
 

  return res.json({ status: true, user: req.user });
});

app.post('/login', async (req, res, next) => {
  passport.authenticate('login', async (error, user, info) => {
    try {
      console.log( user);
      if (error) {
        return next(error);
      };
      if (!user) {
        const error = new Error('user name or password is incorrects');
        return next(error);
      }
      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = {

          email: user.email,
          password: user.password,
          first_name: user.first_name,
          last_name: user.last_name,
          user_type: user.user_type,
          age: user.age,
          _id: user._id,
          created_at: user.created_at,
        };
        User= body;
        const token = jwt.sign(

          { user: body }, process.env.JWT_SECRETE, {

            expiresIn: '180s' // expires in 24 hours

             }
        );
        return res.json({ status: true, token: token });
      })
    } catch (error) {
      return next(error)
    }
  })(req, res, next) ;


});

app.get("/", passport.authenticate('jwt', { session: false }), (req, res) => {
 
  return res.json({ status: true });
});

app.post("/order", passport.authenticate('jwt', { session: false }), async (req, res) => {
 
  const body = req.body;
  console.log(`this is ${body.total_price}`);

  const total_price = body.items.reduce((prev, curr) => {
    prev += curr.price;
    return prev;
  }, 0);
  console.log(`this is ${total_price}`);

  const order = await orderModel.create({
    items: body.items,
    state: body.state,
    created_at: moment().toDate(),
    total_price,
  });

  return res.json({ status: true, order });
});

app.get("/order/:orderId", passport.authenticate('jwt', { session: false }), async (req, res) => {
 

 
  const { orderId } = req.params;
  const order = await orderModel.findById(orderId);

  if (!order) {
    return res.status(404).json({ status: false, order: null });
  }

  return res.json({ status: true, order });
});

app.get("/orders", passport.authenticate('jwt', { session: false }), async (req, res) => {
 
console.log(`this is ${User.last_name}`);
console.log(`this is ${User.first_name}`);
console.log(`this is ${User._id}`);
console.log(`this is ${User.age}`);
console.log(`this is ${User.created_at}`);
console.log(`this is ${User.user_type}`);
var typeUser=User.user_type;

//   const orders = await orderModel.find();
//   const count = await orderModel.countDocuments();

//   //sorting with order total price in ascending order
//   let ascPrice = orders.sort((f, s) => f.total_price - s.total_price);

//   //sorting with order date created at in ascending order
//   let ascDate = orders.sort((f, s) => f.created_at - s.created_at);

//   //quering the order db by state 
//   const orderFound = orders.filter((user) => {
//     return user.state === req.body.state;
//   });

//   //paginating the orders get request
//   const paginatedOrders = await orderModel
//     .find()
//     .limit(limit * 1)
//     .skip((page - 1) * limit)
//     .exec();

//   console.log(`pag ${paginatedOrders}`);
//   console.log(count);
if(typeUser === "Logged" ){
  return res.json({ status: true, message:"your order" });}else{
    res.status(401);
    return res.json({ status: false, message:"401 Unauthorized" });
  }
});

app.patch("/order/:id", passport.authenticate('jwt', { session: false }), async (req, res) => {
 


  const { id } = req.params;
  const { state } = req.body;

  const order = await orderModel.findById(id);

  if (!order) {
    return res.status(404).json({ status: false, order: null });
  }

  if (state < order.state) {
    return res
      .status(422)
      .json({ status: false, order: null, message: "Invalid operation" });
  }

  order.state = state;

  await order.save();

  return res.json({ status: true, order });
});

app.delete("/order/:id", passport.authenticate('jwt', { session: false }), async (req, res) => {
 

  const { id } = req.params;

  const order = await orderModel.deleteOne({ _id: id });

  return res.json({ status: true, order });
});

mongoose.connect("mongodb://localhost:27017");

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB Successfully");
});

mongoose.connection.on("error", (err) => {
  console.log("An error occurred while connecting to MongoDB");
  console.log(err);
});

app.listen(PORT, () => {
  console.log("Listening on port, ", PORT);
});
