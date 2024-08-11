'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Favorites', [{
      user_id: 1,
      card_id: 1,
      like: 0
    },{
      user_id: 1,
      card_id: 2,
      like: 1
    },
    {
      user_id: 1,
      card_id: 3,
      like: 3
    }
  ], {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Favorites', null, {});

  }
};
