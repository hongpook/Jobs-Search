'use strict';
const {
  Model
} = require('sequelize');
const Candidates = require('./candidates')
module.exports = (sequelize, DataTypes) => {
  class Resumes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Resumes.belongsTo(models.Candidates, { foreignKey: 'candidateId', as: 'candidate' });
    }
  }
  Resumes.init({

    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    linkedin: {
      type: DataTypes.STRING,
      allowNull: true
    },
    position: {
      type: DataTypes.STRING,
      allowNull: true
    },
    careerObjective: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    workExperience: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    education: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    skills: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    certificates: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    projects: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    interests: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    candinateId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Candidates,
        key: 'id',
      },
    }
  }, {
    sequelize,
    modelName: 'Resumes',
  });
  return Resumes;
};