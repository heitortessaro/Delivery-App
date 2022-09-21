const ProductModel = (sequelize, DataTypes) => {
    const Product = sequelize.define('product', {
        name: DataTypes.STRING,
        price: DataTypes.DECIMAL(4, 2),
        urlImage: DataTypes.STRING,
    }, {
        underscored: true,
    });

    return Product;
};

module.exports = ProductModel;