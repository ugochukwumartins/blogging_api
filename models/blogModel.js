const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const BlogId = Schema.ObjectId;

const BlogSchema = new Schema({
  id: BlogId,
  title: { type: String ,unique: true, required: 'please provide a valide string'},
  description: { type: String },
  author: { type: String },
  state: { type: String , default :"draft"},
  read_count: { type:  Number , default:0},
  reading_time: { type: String },
  tags: { type: String },
  body: { type: String , required: 'must be a valid string'},
 
  timestamp: {
    type: Date,
    default: Date.now,
    required: "Must have start date - default value is the created date",
  },

});


const Blog = mongoose.model("Blog", BlogSchema);

module.exports = Blog;



