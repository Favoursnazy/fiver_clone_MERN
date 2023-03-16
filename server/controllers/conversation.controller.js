import Conversation from "../models/converstaion.model.js";
import createError from "../utils/createError.js";

export const getConversation = async (req, res, next) => {
  try {
    const conversation = await Conversation.find(
      req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }
    ).sort({ updatedAt: -1 });

    res.status(200).send(conversation);
  } catch (error) {
    next(error);
  }
};
export const createConversation = async (req, res, next) => {
  const newConverstion = new Conversation({
    id: req.isSeller ? req.userId + req.body.to : req.body.to + req.userId,
    sellerId: req.isSeller ? req.userId : req.body.to,
    buyerId: req.isSeller ? req.body.to : req.userId,
    readBySeller: req.isSeller,
    readByBuyer: !req.sellerId,
  });
  try {
    const savedConversation = await newConverstion.save();
    res.status(200).send(savedConversation);
  } catch (error) {
    next(error);
  }
};
export const getSingleConversation = async (req, res, next) => {
  try {
    const conversation = await Conversation.findOne({ id: req.params.id });
    if (!conversation) return next(createError(404, "conversation not found!"));
    res.status(200).send(conversation);
  } catch (error) {
    next(error);
  }
};
export const updateConversation = async (req, res, next) => {
  try {
    const updatedConversation = await Conversation.findOneAndUpdate(
      {
        id: req.params.id,
      },
      {
        $set: {
          // readByBuyer: !req.isSeller,
          // readBySeller: req.isSeller,
          ...(req.isSeller ? { readBySeller: true } : { readByBuyer: true }),
        },
      },
      {
        new: true,
      }
    );

    res.status(200).send(updatedConversation);
  } catch (error) {
    next(error);
  }
};
