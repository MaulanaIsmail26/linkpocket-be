'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("spaces", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.TEXT,
      },
      desc: {
        type: Sequelize.STRING,
      },
      background: {
        type: Sequelize.STRING,
      },
      photo_profile: {
        type: Sequelize.TEXT,
      },
      social_media: {
        type: Sequelize.TEXT,
      },
      link: {
        type: Sequelize.TEXT,
      },
      slug: {
        type: Sequelize.TEXT,
      },
      createdBy: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('spaces');
  }
};