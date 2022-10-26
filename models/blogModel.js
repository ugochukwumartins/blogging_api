const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const BlogId = Schema.ObjectId;

const BlogSchema = new Schema({
  id: BlogId,
  title: { type: String , required: 'please provide a valide string'},
  description: { type: String },
  author: { type: String },
  state: { type: String },
  read_count: { type:  Number },
  reading_time: { type: String },
  tags: { type: String },
  body: { type: String , required: 'must be a valid string'},
 
  timestamp: {
    type: Date,
    default: Date.now,
    required: "Must have start date - default value is the created date",
  },

});
// BlogSchema.pre("save", async function (next) {
//   const user = this;
//   const hashp = await bcrypt.hash(this.password, 10);
//   this.password = hashp;
//   next();
// });

// BlogSchema.methods.isValidPasswor = async function (password) {
//   const user = this;
//   const compare = await bcrypt.compare(password, user.password);
//   return compare;
// };

const Blog = mongoose.model("Blog", BlogSchema);

module.exports = Blog;



