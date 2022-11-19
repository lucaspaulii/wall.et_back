import joi from "joi";

export const inflowSchema = joi.object({
    value: joi.number().required(),
    description: joi.string().required(),
    type: joi.string().valid("in", "out").required()
  });