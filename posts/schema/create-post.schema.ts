import Joi from "joi";

export const createPostSchema = Joi.object({
  title: Joi.string().min(3).max(30).required(),
  content: Joi.string().min(3).max(1000).required(),
  published: Joi.boolean().required(),
  // authorId: Joi.string().required(),
});
