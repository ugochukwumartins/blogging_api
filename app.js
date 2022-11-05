const express = require("express");
const moment = require("moment");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require('path');
const passport = require("passport");
const { connectToDb }  = require("./db");

const jwt = require("jsonwebtoken");
require("dotenv").config();
require("./services/auth_with_jwt");
const onboardingRoute = require("./routes/onboarding");
const blogRoute = require("./routes/blogging");
const httpreq = require("./routes/request");
const PORT = process.env.PORT;
let User;
const app = express();
app.set("view engine", "ejs");

app.set("views", "views");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(blogRoute);
app.use(onboardingRoute);

app.use(httpreq);




// app.post(
//   "/order",
//   passport.authenticate("jwt", { session: false }),
//   async (req, res) => {
//     const body = req.body;
//     console.log(`this is ${body.total_price}`);

//     const total_price = body.items.reduce((prev, curr) => {
//       prev += curr.price;
//       return prev;
//     }, 0);
//     console.log(`this is ${total_price}`);

//     const order = await orderModel.create({
//       items: body.items,
//       state: body.state,
//       created_at: moment().toDate(),
//       total_price,
//     });

//     return res.json({ status: true, order });
//   }
// );

// app.get(
//   "/order/:orderId",
//   passport.authenticate("jwt", { session: false }),
//   async (req, res) => {
//     const { orderId } = req.params;
//     const order = await orderModel.findById(orderId);

//     if (!order) {
//       return res.status(404).json({ status: false, order: null });
//     }

//     return res.json({ status: true, order });
//   }
// );

// app.patch(
//   "/order/:id",
//   passport.authenticate("jwt", { session: false }),
//   async (req, res) => {
//     const { id } = req.params;
//     const { state } = req.body;

//     const order = await orderModel.findById(id);

//     if (!order) {
//       return res.status(404).json({ status: false, order: null });
//     }

//     if (state < order.state) {
//       return res
//         .status(422)
//         .json({ status: false, order: null, message: "Invalid operation" });
//     }

//     order.state = state;

//     await order.save();

//     return res.json({ status: true, order });
//   }
// );

// app.delete(
//   "/order/:id",
//   passport.authenticate("jwt", { session: false }),
//   async (req, res) => {
//     const { id } = req.params;

//     const order = await orderModel.deleteOne({ _id: id });

//     return res.json({ status: true, order });
//   }
// );

connectToDb();
// mongoose.connect("mongodb://localhost:27017");

// mongoose.connection.on("connected", () => {
//   console.log("Connected to MongoDB Successfully");
// });

// mongoose.connection.on("error", (err) => {
//   console.log("An error occurred while connecting to MongoDB");
//   console.log(err);
// });

app.listen(PORT, () => {
  console.log("Listening on port, ", PORT);
});


module.exports = app;
  
