import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { signupSchema, loginSchema } from "../validators/authValidator.js";

// user registration
  export const register = async (req, res, next) => {
    try {
      console.log(req.body);
      const validateData = await signupSchema.parseAsync(req.body);

      const userexists = await User.findOne({ email: validateData.email });
      if (userexists) {
        return res
          .status(400)
          .json({ success: false, message: "Email already exists!" });
      }
      // hashing password
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);

      const newUser = new User({
        username: validateData.username,
        email: validateData.email,
        role:validateData.role,
        password: hash,
        photo: validateData.photo || "",
      });

      await newUser.save();
        
      res
        .status(200)
        .json({ success: true, message: "User Registered Successfully." });
    } catch (err) {
      next(err);
    }
  };

// user login
export const login = async (req, res, next) => {
  try {
    const validateData = await loginSchema.parseAsync(req.body);
    const email = validateData.email;
    const user = await User.findOne({ email });

    // if user doesn't exist
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // if user exist then check the password or compare the password
    const checkCorrectPassword = await bcrypt.compare(
      validateData.password,
      user.password
    );

    //if password is incorrect
    if (!checkCorrectPassword) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect email or password" });
    }

    const { password, role, ...rest } = user._doc;

    // create  jwt token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "15d" }
    );

    // set token in the browser cookies and send the response to the client
    res
      .cookie("accessToken", token, {
        httpOnly: true,
        expires: token.expiresIn,
      })
      .status(200)
      .json({
        token,
        data: { ...rest,role },
      });
  } catch (err) {
    next(err);
  }
};
