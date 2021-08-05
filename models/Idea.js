const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Idea extends Model {}

Idea.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    idea_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    link_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'category',
        key: 'id',
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      reference: {
        model: 'user',
        key: 'id'
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'Idea',
  }
);

module.exports = Idea;
