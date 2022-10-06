const { z } = require('zod');

const updateSaleStatusSchema = z.object({
  status: z
    .enum(
      ['Pendente', 'Preparando', 'Em Trânsito', 'Entregue'],
    ),
});

module.exports = {
  updateSaleStatusSchema,
};