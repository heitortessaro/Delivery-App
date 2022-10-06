const { z } = require('zod');

const requiredError = 'required_error';
const invalidTypeError = 'invalid_type_error';

const userRegisterSchema = z.object({
  email: z
    .string({
      [requiredError]: 'email is required',
      [invalidTypeError]: 'email must be a string',
    })
    .email({ message: 'email is not valid' }),

  password: z
    .string({
      [requiredError]: 'password is required',
      [invalidTypeError]: 'password must be a string',
    })
    .min(6, { message: 'Password must be at least 6 characters long' }),

  name: z
    .string({
      [requiredError]: 'name is required',
      [invalidTypeError]: 'name must be a string',
    })
    .min(12, { message: 'Name must be at least 12 characters long' }),

  role: z
    .enum(['administrator', 'seller', 'customer'], {
      [requiredError]: 'role is required',
      [invalidTypeError]: 'role must be a string',
    }),
});

module.exports = {
  userRegisterSchema,
};