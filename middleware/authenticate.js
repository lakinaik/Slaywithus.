const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");

const authenticate = async (req, res, next) => {
  const {token} = req.cookies

  if (!token){
    res.redirect("/login")
  }

  try {
    const decode = jwt.verify(token, "MYNAMEISSURYANARAYANAMALLIKWEBDEVLOPER",
    {
      expiresIn: "3.154e+10"
    })
    req.user = decode
  } catch (error) {
    console.log(error);
    res.status(401).send('invalid token')
  }

  next()

};

module.exports = authenticate;
