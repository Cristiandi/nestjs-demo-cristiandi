import * as joi from '@hapi/joi';

export const updateSchema = {
  body: joi.object({
    id: joi.number().min(1),
    title: joi.string().min(1),
    description: joi.string().min(1),
    author: joi.string().min(1)
  }),
  params: joi.object({
    bookId: joi.number().min(1).required()
  })
};