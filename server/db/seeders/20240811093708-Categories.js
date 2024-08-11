'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Categories', [{
      category_name: 'Аренда квартир',
      image: "https://www.peredelka.tv/upload/resize_cache/sprint.editor/abe/1024_768_1/img-1617817963-3406-639-open-concept-small-apartment.jpg",
    
    },
    {
      category_name: 'Смартфоны',
      image: "https://istudio-shop.ru/a/istudio/files/multifile/2353/5_38_0.webp",
    
    }], {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Categories', null, {});

  }
};
