const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Message = sequelize.define(
  'Message',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    reply: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    save_history: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    tableName: 'messages',
    timestamps: true,
  }
);

module.exports = Message;