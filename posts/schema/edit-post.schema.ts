import Joi from "joi";

export const editPostSchema = Joi.object({
  title: Joi.string().min(3).max(30).optional(),
  content: Joi.string().min(3).max(1000).optional(),
  published: Joi.boolean().optional(),
});
