import Joi from "joi";

export const getPostListSchema = Joi.object({
  page: Joi.number().positive().optional().default(1),
  limit: Joi.number().positive().optional().default(10),
  searchTerm: Joi.string().optional(),
});
