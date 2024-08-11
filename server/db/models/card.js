
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Card extends Model {
    
    static associate({User, Category, Favorite}) {
      this.belongsToMany(User, {
        through: Favorite,
        foreignKey: "card_id"
      })
      this.belongsTo(Category, {
        foreignKey: "category_id"
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