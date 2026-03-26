import User from "../models/User.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

export const signUp = async (req, res) => {
  console.log("i am in signup controller");
  try {
    // exract email and password from req.body
    const { email, password, username } = req.body;
    // check email and password is not empty
    if (!email || !password || !username) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const normalizedEmail = email.toLowerCase();
    // check user is already registered or not
    const user = await User.findOne({ email: normalizedEmail });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already registered ",
      });
    }
    // hashed the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashed password:", hashedPassword);
    // create new user
    const newUser = await User.create({
      email: normalizedEmail,
      password: hashedPassword,
      username: username,
    });
    //save in datanbase
    return res.status(201).json({
      message: "User created successfully",
      success: true,
      user: newUser,
    });
  } catch (error) {
    console.log("Error in signup :", error);
    return res.status(500).json({
      message: error?.message || "Internal Server Error",
      success: false,
    });
  }
};
export const login = async (req, res) => {
  console.log("i am in lognin controller");
  try {
    // get email and password from req.body
    const { email, password } = req.body;
    // check email and password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    // check user exists or not
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
        success: false,
      });
    }
    const hashedPassword = user.password;
    // check password match or not
    const isMatch = await bcrypt.compare(password, hashedPassword);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    const userPayload = {
      userId: user._id,
    };
    // create jwt token
    const token = jwt.sign(userPayload, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    const options = {
      httpOnly: true, // can't access from JS (security)
      secure: false, // true in production (HTTPS)
      sameSite: "strict",
      maxAge: 2 * 60 * 60 * 1000, // 2 hours
    };
    return res.cookie("token", token, options).status(200).json({
      message: "Login successfully",
      user: user,
      token: token,
      success: true,
    });
  } catch (error) {
    console.log("Error in login :", error);
    return res.status(500).json({
      message: error?.message || "Internal Server Error",
    });
  }
};
