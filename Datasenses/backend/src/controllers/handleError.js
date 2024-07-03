module.exports.handleError = (error) => {
  const Error = {
    name: "",
    email: "",
    password: "",
    companyname: "",
  };
  if (error.code === 11000) {
    Error["email"] = "This Email is Already Registered";
    return Error;
  }
  if (error.message === "This email wasn't registered") {
    Error["email"] = "This Email Doesn't Registered";
    return Error;
  }
  if (error.message === "This password Doesn't Match") {
    Error["password"] = "This Password Doesn't Match";
    return Error;
  }
  if (error.message.includes("users validation failed")) {
    Object.values(error.errors).forEach(({properties}) => {
      Error[properties.path] = properties.message;
    });
    return Error;
  }
};
