const jwt = require("jsonwebtoken");

module.exports.getUID = async function (token) {
  try {
    const {id} = await jwt.verify(token, process.env.SECRET_KEY);
    if (id) return id;
  } catch (error) {
    console.log(error);
  }
};
