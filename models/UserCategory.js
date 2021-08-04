const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');
const User = require('./User');
const Category = require('./Category');
class UserCategory extends Model {}

UserCategory.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      //references USER model's id
      references: {
        model: User,
        key: 'id',
      }
    },
    category_id: {
      type: DataTypes.INTEGER,
      //references the CATEGORY model's id
      references: {
        model: Category,
        key: 'id',
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user_category',
  }
);

module.exports = UserCategory;