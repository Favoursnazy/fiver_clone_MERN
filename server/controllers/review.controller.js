import Reviews from "../models/review.odel.js";
import createError from "../utils/createError.js";
import Gig from "../models/gigs.model.js";

export const createReview = async (req, res, next) => {
  if (req.isSeller)
    return next(createError(403, "Sellers can't create a review"));

  const newReview = new Reviews({
    userId: req.userId,
    gigId: req.body.gigId,
    desc: req.body.desc,
    star: req.body.star,
  });
  try {
    const review = await Reviews.findOne({
      gidId: req.body.gidId,
      userId: req.userId,
    });
    if (review)
      return next(createError(403, "You have already created a review"));

    const savedReview = await newReview.save();
    await Gig.findByIdAndUpdate(req.body.gidId, {
      $inc: {
        totalStars: req.body.star,
        starNumber: 1,
      },
    });
    res.status(201).send(savedReview);
  } catch (error) {
    next(error);
  }
};

export const getReviews = async (req, res, next) => {
  try {
    const reviews = await Reviews.find({
      gigId: req.params.id,
    });
    res.status(200).send(reviews);
  } catch (error) {
    next(error);
  }
};

export const deleteReviews = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
