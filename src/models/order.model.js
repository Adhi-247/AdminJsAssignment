const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Order = sequelize.define(
  'Order',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pending',
    },
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    tableName: 'orders',
    timestamps: true,
  }
);

module.exports = Order;
