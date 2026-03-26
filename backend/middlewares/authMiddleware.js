import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const auth = async (req, res, next) => {
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
  //   const token =

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access Denied no token provied",
    });
  }
  try {
    let decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    console.log("Error in authmiddleware :", error);
    return res.status(401).json({
      success: false,
      message: error?.message || "Invalid token or Expired token",
    });
  }
};
