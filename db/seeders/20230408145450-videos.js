'use strict';

const faker = require('faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const arees = ["Braços", "Tronc", "Cames", "Coll"];
    const videosIds = [
      '756ca8a4-ca0a-4a57-a128-f29bedaddf29',
      'dcc0070f-da89-4dbb-8180-cf681d19cae7',
      '2a1aefd8-a240-4cc5-9820-a4b85bc21a52',
      '5d4baefa-dda5-4a96-91b6-f7af8f61796f',
      '003efbb4-ab39-43bc-920a-3c783ece0854'
    ];

    const videosNom = ['mercedes', 'microscopio', 'televisor', 'tubos', 'corazon'];

    const videosCodi = [
      '18kHpdpqGablq52Ndbq7HzjPYMbl-l587',
      '1Gh4fZFvr0gWTMmnJ8K0iJyUI6b-RNSbh',
      '1qaR-zHKraCpNVzt_C-1rPkyBrJGJUx-7',
      '1u8HruKFe2RcvIpoI25o2ZDmOk3BNRz5u',
      '1lfInM3TqTdjGroYISqLok-MQmomBHNJq'
    ];

    let videos = [];
    for (let i = 0; i < 5; i++) {
      videos.push({
        id: videosIds[i],
        nom: videosNom[i],
        codi: videosCodi[i],
        descripcio: faker.lorem.sentence(),
        areaExercici: arees[Math.floor(Math.random() * arees.length)],
        createdAt: new Date(),
        updatedAt: new Date()
      });
    };

    await queryInterface.bulkInsert('Videos', videos, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Videos', null, {});
  }
};
