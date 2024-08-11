'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Users', [{
      name: 'John Doe',
      email: 'jon@mail.ru',
      password: '123',
      role: false
    },
    {
      name: 'Oleg',
      email: 'oleg@mail.ru',
      password: '123',
      role: true

    }], {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Users', null, {});

  }
};
