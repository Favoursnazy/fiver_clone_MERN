import User from "../models/user.model.js";
import bycrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";
export const register = async (req, res, next) => {
  try {
    const hash = bycrypt.hashSync(req.body.password, 5);
    const newUser = new User({ ...req.body, password: hash });

    await newUser.save();
    res.status(201).json({
      message: "Account created succesfulyy!!",
    });
  } catch (error) {
    next(error);
  }
};
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User Not found!!!"));

    const isCorrect = bycrypt.compareSync(req.body.password, user.password);
    if (!isCorrect) return next(createError(404, "Wrong username or password"));

    const token = jwt.sign(
      {
        id: user._id,
        isSeller: user.isSeller,
      },
      process.env.JWT_KEY
    );

    if (isCorrect) {
      const { password, ...info } = user._doc;
      res.cookie("accessToken", token, {
        httpOnly: true,
      });
      res.status(200).send(info);
    }
  } catch (error) {
    next(error);
  }
};
export const logout = async (req, res, next) => {
  try {
    res
      .clearCookie("accessToken", {
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .send("User has been logged out");
  } catch (error) {
    next(error);
  }
};
