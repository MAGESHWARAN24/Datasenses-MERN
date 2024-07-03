const mongoose = require("mongoose");
const {isEmail, isStrongPassword} = require("validator");
const bcrypt = require("bcrypt");
const userSchema = mongoose.Schema({
  name: {type: String, required: [true, "Name is required field"]},
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required field"],
    validate: [isEmail, "Enter the valid email"],
    lowercase: true,
  },
  companyname: {
    type: String,
    required: [true, "Company Name is required field"],
  },
  workemail: {
    type: String,
    unique: true,
    required: [true, "Email is required field"],
    validate: [isEmail, "Enter the valid email"],
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Password is required field"],
    validate: isStrongPassword,
  },
  members: {
    type: Array,
    default: [],
  },
  createAt: {type: Date, default: Date.now},
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  const hashpassword = await bcrypt.hash(this.password, salt);
  this.password = hashpassword;
  next();
});

userSchema.statics.login = async function (email, password) {
  const User = await this.findOne({email});
  if (User) {
    const isMatch = await bcrypt.compare(password, User.password);
    if (isMatch) {
      return User;
    }
    throw Error("Invalid password, please try again!");
  }
  throw Error("This email wasn't registered");
};

const users = mongoose.model("users", userSchema);

module.exports = users;
