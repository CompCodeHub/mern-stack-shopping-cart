const jwt = require("jsonwebtoken");

// Generates a token and sets request cookie
const generateToken = (res, userId) => {
  // Token expires in 1 day
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  // Set jwt as cookie
  res.cookie("jwt", token, {
    httpOnly: false,
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });

};

module.exports = { generateToken };
