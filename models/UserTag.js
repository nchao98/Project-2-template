const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');
const User = require('./User');
const Tag = require('./Tag');

class UserTag extends Model {}

UserTag.init(
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
    tag_id: {
      type: DataTypes.INTEGER,
      //references the TAG model's id
      references: {
        model: Tag,
        key: 'id',
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = UserTag;