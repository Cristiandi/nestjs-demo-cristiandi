import * as joi from '@hapi/joi';

export const createSchema = {
  body: joi.object({
    id: joi.string().min(1).required(),
    title: joi.string().min(1).required(),
    description: joi.string().min(1).required(),
    author: joi.string().min(1).required()
  })
};