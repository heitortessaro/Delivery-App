module.exports = (sequelize, DataTypes) => {
	const SaleProduct = sequelize.define('saleProduct',
		{
            quantity: DataTypes.INTEGER
        },
		{
			timestamps: false,
			underscored: false, 
			tableName: 'salesProducts'
		},
	);

    SalesProduct.associate = (models) => {
		models.Product.belongsToMany(models.Sale, {
			as: 'sales',
			through: SaleProduct,
			foreignKey: 'productId',
			otherKey: 'saleId',
		});
		models.Sale.belongsToMany(models.Product, {
			as: 'products',
			through: SaleProduct,
			foreignKey: 'saleId',
			otherKey: 'productId',
		});
	};

  	return SaleProduct;
};