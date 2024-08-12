const bcrypt = require('bcrypt')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Users', [{
      name: 'John Doe',
      email: 'jon@mail.ru',
      password: await bcrypt.hash('123', 10),
      role: false
    },
    {
      name: 'Oleg',
      email: 'oleg@mail.ru',
      password: await bcrypt.hash('123', 10),
      role: true

    }], {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Users', null, {});

  }
};
