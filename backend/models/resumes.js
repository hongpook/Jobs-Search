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
    candinateId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Candidates,
        key: 'id',
      },
    },
    resume: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Resumes',
  });
  return Resumes;
};