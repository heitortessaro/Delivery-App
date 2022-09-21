const SaleModel = (sequelize, DataTypes) => {
    const Sale = sequelize.define('sale', {
        userId: {
            type: DataTypes.INTEGER,
            foreignKey: true,
        },
        sellerId: {
            type: DataTypes.INTEGER,
            foreignKey: true,
        },
        totalPrice: DataTypes.DECIMAL(9, 2),
        deliveryAddress: DataTypes.STRING,
        deliveryNumber: DataTypes.STRING,
        saleDate: DataTypes.DATE,
        status: DataTypes.STRING,
    }, {
        timestamps: false,
        underscored: true,
      })

    Sale.associate = (models) => {
        Sale.belongsTo(models.user,
          { foreignKey: 'userId', as: 'users' },
          { foreignKey: 'sellerId', as: 'sellers' });
      };

    return Sale;
};

module.exports = SaleModel;