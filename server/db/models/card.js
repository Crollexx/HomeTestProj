'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Card extends Model {
    
    static associate({User, Favorite, Category}) {
      this.belongsToMany(User, {
        through: Favorite,
        foreignKey: "card_id"
      })
      this.belongsTo(Category, {
        foreignKey: "card_id"
      })
      this.belongsTo(User, {
        foreignKey: "user_id"
      })
    }
    
  }

  
  Card.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.STRING,
    image: DataTypes.STRING,
    category_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Card',
  });
  return Card;
};