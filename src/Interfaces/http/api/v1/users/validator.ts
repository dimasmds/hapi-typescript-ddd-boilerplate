import Joi, { ObjectSchema } from 'joi';
import InvariantError from '@Commons/exceptions/InvariantError';

type UsersRouteSchema = {
  postUser: ObjectSchema
  loginUser: ObjectSchema
}

type PostUserPayload = {
  name: string;
  email: string;
  password: string;
}

class UsersRouteValidator {
  private schemas: UsersRouteSchema;

  constructor() {
    this.schemas = {
      postUser: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      }),
      loginUser: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      }),
    };
  }

  validatePostUser(payload: unknown) {
    const validationResult = this.schemas.postUser.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }

    return validationResult.value as PostUserPayload;
  }

  validateLoginUser(payload: unknown) {
    const validationResult = this.schemas.loginUser.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }

    return validationResult.value as PostUserPayload;
  }
}

export default UsersRouteValidator;
