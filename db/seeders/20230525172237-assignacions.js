'use strict';

const uuid = require('uuid');
const moment = require('moment');

module.exports = {
  async up(queryInterface, Sequelize) {

    const clientIds = [
      '03e89443-0b00-4bb3-86f0-4c2255296ce5',
      '1601c3dd-dde3-4e91-8cf2-7f5aee1e9a39',
      '7d9bbb6d-2e77-4bcd-a27c-5c133f9a5bd3',
      '8650780b-fbe8-4bdf-a7a1-04943cde7414'
    ];

    const videosIds = [
      '756ca8a4-ca0a-4a57-a128-f29bedaddf29',
      'dcc0070f-da89-4dbb-8180-cf681d19cae7',
      '2a1aefd8-a240-4cc5-9820-a4b85bc21a52',
      '5d4baefa-dda5-4a96-91b6-f7af8f61796f',
      '003efbb4-ab39-43bc-920a-3c783ece0854'
    ];

    let assignacions = [];

    for (let i = 0; i < 20; i++) {
      assignacions.push({
        id: uuid.v4(),
        dia: moment('2023-06-01').add(Math.floor(Math.random() * 30), 'd').format('YYYY-MM-DD'),
        realitzat: false,
        UsuariId: clientIds[Math.floor(Math.random() * clientIds.length)],
        VideoId: videosIds[Math.floor(Math.random() * videosIds.length)],
        createdAt: new Date(),
        updatedAt: new Date()
      });
    };

    await queryInterface.bulkInsert('AssignacioVideos', assignacions, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('AssignacioVideos', null, {});
  }
};
