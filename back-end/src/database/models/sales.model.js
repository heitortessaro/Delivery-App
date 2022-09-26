module.exports = (sequelize, DataTypes) => {
    const Sale = sequelize.define('sale', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
          },
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
        saleDate: {
          type: DataTypes.DATE,
        },
        status: DataTypes.STRING,
    }, {
        timestamps: false,
        tableName: 'sales',
        underscored: true,
      })

    Sale.associate = (models) => {
        Sale.belongsTo(models.user,
          { foreignKey: 'userId', as: 'user' },
          { foreignKey: 'sellerId', as: 'seller' });
      };

    return Sale;
};