'use strict';
const {
  Model
} = require('sequelize');
const Employees = require('./employees')
module.exports = (sequelize, DataTypes) => {
  class Blogs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Blogs.belongsTo(models.Employees, {
        foreignKey: 'authorId', // Phải khớp với cột references đã khai báo trong migration
        as: 'author',
      });
    }
  }
  Blogs.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    blogImg: {
      type: DataTypes.STRING,
      allowNull: true,  
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,  
      defaultValue: 'Job search tips',
      validate: {
        isIn: [['Job search tips', 'Recruitment solutions']] 
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,  
    },  
    authorId:{
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Employees,
        key: 'id',
      },
    } 
  }, {
    sequelize,
    modelName: 'Blogs',
  });
  return Blogs;
};