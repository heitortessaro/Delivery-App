module.exports = (sequelize, DataTypes) => {
	const saleProduct = sequelize.define('saleProduct',
		{
			saleId: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				references: {
					model: 'sales',
					key: 'id'
				}
			},
			productId: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				references: {
					model: 'products',
					key: 'id'
				}
			},
			quantity: DataTypes.INTEGER,
        },
		{
			timestamps: false,
			underscored: true, 
			tableName: 'sales_products'
		},
	);

    saleProduct.associate = (models) => {
		models.product.belongsToMany(models.sale, {
			as: 'sales',
			through: saleProduct,
			foreignKey: 'product_id',
			otherKey: 'sale_id',
		});
		models.sale.belongsToMany(models.product, {
			as: 'products',
			through: saleProduct,
			foreignKey: 'sale_id',
			otherKey: 'product_id',
		});
	};

  	return saleProduct;
};