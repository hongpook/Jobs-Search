'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Thêm cột googleId vào bảng Candidates
    await queryInterface.addColumn('Candidates', 'googleId', {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true,
    });
  },

  async down(queryInterface, Sequelize) {
    // Xóa cột googleId nếu rollback
    await queryInterface.removeColumn('Candidates', 'googleId');
  }
};
