const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const { ROLES } = require('../constants/roles');
const { hashPassword } = require('../utils/hash');

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM(ROLES.ADMIN, ROLES.USER),
      allowNull: false,
      defaultValue: ROLES.USER,
    },
  },
  {
    tableName: 'users',
    timestamps: true,
  }
);

User.beforeCreate(async (user) => {
  user.password = await hashPassword(user.password);
});

User.beforeUpdate(async (user) => {
  if (user.changed('password')) {
    user.password = await hashPassword(user.password);
  }
});

User.prototype.toJSON = function toJSON() {
  const values = { ...this.get() };
  delete values.password;
  return values;
};

module.exports = User;
