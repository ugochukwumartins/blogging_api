const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const UserId = Schema.ObjectId;

const UserSchema = new Schema({
  id: UserId,
  email: { type: String ,unique: true, required: 'please provide a valide and unique email'},
  password: { type: String },
  first_name: { type: String , required: 'must be a valid string'},
  last_name: { type: String , required:  'must be a valid string'},
  user_type: { type: String, enum: ['Logged','logged'], default:"logged"},
  created_at: {
    type: Date,
    default: Date.now,
    required: "Must have start date - default value is the created date",
  },
  age: Number,
});
UserSchema.pre("save", async function (next) {
  const user = this;
  const hashp = await bcrypt.hash(this.password, 10);
  this.password = hashp;
  next();
});

UserSchema.methods.isValidPasswor = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
};

const User = mongoose.model("UserBlog", UserSchema);

module.exports = User;
