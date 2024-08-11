'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Cards', [{
      title: 'Однокомнатная квартира',
      description: "Сдам однокомнатную квартиру, рядом с метро",
      price: "120000",
      image: "https://www.peredelka.tv/upload/resize_cache/sprint.editor/f24/1024_768_1/img-1617818102-3122-855-studio-apartment-decor-ideas.jpg",
      category_id: 1,
      user_id: 1,
    },{
      title: 'Двухкомнатная квартира',
      description: "Сдам двухкомнатную квартру, без детей",
      price: "250000",
      image: "https://darstroy-yug.ru/upload/medialibrary/367/3673570332f8259705fe0ecbe5dc81f9.png",
      category_id: 1,
      user_id: 1,
    },
    {
      title: 'Iphone 15 Pro',
      description: "Айфон в хорошем состоянии, пользовался 2 раза",
      price: "125000",
      image: "https://mtscdn.ru/upload/iblock/ee2/Pro-Natural-Titanium.png",
      category_id: 2,
      user_id: 1,
    },
  ], {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Cards', null, {});

  }
};
