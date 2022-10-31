const express= require('express');
const passport = require("passport")
const httpReq = require('../httpReq/http_request');
const requestRouter = express.Router();




requestRouter.get("/demo",httpReq.demo);
requestRouter.post("/create",httpReq.demo2);

module.exports = requestRouter;

