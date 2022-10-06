const { z } = require('zod');

const requiredError = 'required_error';
const invalidTypeError = 'invalid_type_error';

const newSaleSchema = z.object({
  userId: z
    .number({
      [requiredError]: 'userId is required',
      [invalidTypeError]: 'userId must be a number',
    }),

  sellerId: z
    .number({
      [requiredError]: 'sellerId is required',
      [invalidTypeError]: 'sellerId must be a number',
    }),

  totalPrice: z
    .number({
      [requiredError]: 'totalPrice is required',
      [invalidTypeError]: 'totalPrice must be a number',
    }),

  deliveryAddress: z
    .string({
      [requiredError]: 'deliveryAddress is required',
      [invalidTypeError]: 'deliveryAddress must be a string',
    }),

  deliveryNumber: z
    .string({
      [requiredError]: 'deliveryNumber is required',
      [invalidTypeError]: 'deliveryNumber must be a string',
    }),

  products: z.array(z.object({
    id: z
      .number({
        [requiredError]: 'product\'s id is required',
        [invalidTypeError]: 'product\'s id must be a number',
      }),

    quantity: z
      .number({
        [requiredError]: 'product\'s quantity is required',
        [invalidTypeError]: 'product\'s quantity must be a number',
      }),
  })),
});

module.exports = {
  newSaleSchema,
};