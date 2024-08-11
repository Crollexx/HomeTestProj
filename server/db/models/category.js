
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {

    static associate({Card}) {
      this.hasMany(Card, {
        foreignKey: "category_id"
      })
    }
  }
  Category.init({
    category_name: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};