'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Roles extends Model {
    static associate(models) {
      // Thiết lập Roles có nhiều Employees
      Roles.hasMany(models.Employees, { foreignKey: 'roleId', as: 'employees' });
    }
  }
  Roles.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Roles',
  });
  return Roles;
};
