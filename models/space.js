'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class space extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  space.init(
    {
      title: DataTypes.STRING,
      desc: DataTypes.STRING,
      background: DataTypes.STRING,
      photo_profile: DataTypes.STRING,
      social_media: DataTypes.STRING,
      link: DataTypes.STRING,
      slug: DataTypes.STRING,
      createdBy: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "space",
    }
  );
  return space;
};