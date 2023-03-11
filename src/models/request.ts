import Joi from "joi";

const status = ["ON", "OFF"];
export const BookType = Joi.object({
  name: Joi.string().min(1).max(50).required(),
  status: Joi.string().valid(...Object.values(status)),
});

const Role = ["USER", "ADMIN"];
export const Users = Joi.object({
  firstName: Joi.string().min(1).max(50).required(),
  lastName: Joi.string().min(1).max(50).required(),
  email: Joi.string().email().required(),
  tel: Joi.string()
    .min(10)
    .max(10)
    .pattern(/^[0-9]+$/, "numbers")
    .required(),
  username: Joi.string().min(4).max(50).required(),
  password: Joi.string().min(4).max(50).required(),
  role: Joi.string().valid(...Object.values(Role)),
  status: Joi.string().valid(...Object.values(status)),
});

export const Book = Joi.object({
  name: Joi.string().min(1).max(50).required(),
  amount: Joi.number(),
  author: Joi.string().min(1).max(50).required(),
  publicher: Joi.string().min(1).max(50).required(),
  bookTypeId: Joi.number().required(),
  status: Joi.string().valid(...Object.values(status)),
});

export const BookLog = Joi.object({
  adminId: Joi.number().required(),
  userId: Joi.number().required(),
  bookId: Joi.number().required(),
  borrowDate: Joi.date(),
  returnDate: Joi.date(),
  status: Joi.string().valid(...Object.values(status)),
});
