import Joi, { ObjectSchema } from "joi";

const battleSchema: ObjectSchema<any> = Joi.object().keys({
  firstUser: Joi.string().trim().required(),
  secondUser: Joi.string().trim().required(),
});

export { battleSchema };