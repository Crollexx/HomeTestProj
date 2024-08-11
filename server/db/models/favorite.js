'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
   
    static associate(models) {
    
    }
  }
  Favorite.init({
    user_id: DataTypes.INTEGER,
    card_id: DataTypes.INTEGER,
    like: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Favorite',
  });
  return Favorite;
};