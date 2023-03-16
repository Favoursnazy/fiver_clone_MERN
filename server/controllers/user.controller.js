import userModel from "../models/user.model.js";
import User from "../models/user.model.js";
import createError from "../utils/createError.js";

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (req.userId !== user._id.toString()) {
      return next(createError(403, "TYou can only delete your account!"));
    }
    await User.findByIdAndDelete(req.params.id);
    return next(createError(200, "Account deleted!"));
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  const user = await userModel.findById(req.params.id);

  if (!user) return res.status(404).send("user not found");

  res.status(200).send(user);
};
