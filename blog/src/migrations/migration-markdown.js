'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Markdowns', {
        // key: DataTypes.STRING,
        // type : DataTypes.STRING,
        // value_en: DataTypes.STRING,
        // value_vi: DataTypes.STRING,
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      contentHTML: {
        type: Sequelize.TEXT('long'),
        allowNull:false
      },
      contentMarkdowmn: {
        type: Sequelize.TEXT('long'),
        allowNull:false
      },
      description: {
        type: Sequelize.TEXT('long'),
        allowNull:true
      },
      doctorId: {
        type: Sequelize.INTEGER,
        allowNull:true
      },
      specialtyId: {
        type: Sequelize.INTEGER,
        allowNull:true
      },
      clinicId: {
        type: Sequelize.INTEGER ,
        allowNull:true
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
    await queryInterface.dropTable('Markdowns');
  }
};