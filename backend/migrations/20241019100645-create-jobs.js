'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Jobs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      imageUrl:{
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      requirements: {
        type: Sequelize.TEXT
      },
      salaryRange: {
        type: Sequelize.STRING
      },
      jobType: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      },
      employerId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Jobs');
  }
};