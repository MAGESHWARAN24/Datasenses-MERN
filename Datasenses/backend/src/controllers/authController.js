const users = require("../models/users");
const {handleError} = require("./handleError");
const jwt = require("jsonwebtoken");

const createToken = async (id) => {
  return jwt.sign({id}, process.env.SECRET_KEY, {
    expiresIn: 24 * 60 * 60 * 1000,
  });
};

module.exports.__getUserId = async function (token) {
  try {
    const u_Id = jwt.verify(token, process.env.SECRET_KEY);
    if (u_Id) return u_Id.id;
  } catch (error) {
    console.log(error);
  }
};
module.exports.__logIn_Post = async (req, res) => {
  try {
    const {email, password} = req.body;
    const isUser = await users.login(email, password);
    const token = await createToken(isUser._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxage: 60 * 60 * 5 * 1000,
    });
    res.status(200).json({token: token});
  } catch (error) {
    const Error = handleError(error);
    res.status(400).json({Error: Error});
  }
};
module.exports.__signUp_Post = async (req, res) => {
  try {
    const {name, email, password, workemail, companyName, members} = req.body;
    const user = await users.create({
      name,
      email,
      password,
      workemail,
      companyName,
      members,
    });
    res.status(200).json({user: user});
  } catch (error) {
    const Error = handleError(error);
    res.status(400).json({Error: Error});
  }
};

module.exports.__logOut_Post = (req, res) => {
  try {
    res.clearCookie("jwt").status(200).json({Logout: "Logout"});
  } catch (error) {
    console.log(error);
  }
};
