module.exports = (sequelize, DataTypes) => {
	const sales_products = sequelize.define('sales_products',
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

    sales_products.associate = (models) => {
		models.product.belongsToMany(models.sale, {
			as: 'sales',
			through: sales_products,
			foreignKey: 'product_id',
			otherKey: 'sale_id',
		});
		models.sale.belongsToMany(models.product, {
			as: 'products',
			through: sales_products,
			foreignKey: 'sale_id',
			otherKey: 'product_id',
		});
	};

  	return sales_products;
};