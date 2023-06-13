module.exports = {
  loginValidator: {
    email: "required|email",
    password: "required",
  },
  registerValidator: {
    email: "required|email",
    fullname: "required",
    password: "required",
  },
};
