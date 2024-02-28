'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Blog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Blog.belongsTo(models.User, { foreignKey: 'userId' })

    }
  }
  Blog.init(
      {
          userId: DataTypes.INTEGER,
          title: DataTypes.STRING,
          descriptionHTML: DataTypes.TEXT,
          descriptionMarkdown: DataTypes.TEXT,
          thumb: DataTypes.STRING,
          topic: DataTypes.STRING,
          accept: DataTypes.BOOLEAN,
      },
      {
          sequelize,
          modelName: "Blog",
      }
  );
  return Blog;
};