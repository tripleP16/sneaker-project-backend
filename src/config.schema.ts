import * as joi from '@hapi/joi';

export const configValidationSchema = joi.object({
  PORT: joi.number(),
  URI: joi.string(),
  SECRET: joi.string(),
});
