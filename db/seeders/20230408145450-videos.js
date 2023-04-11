'use strict';

const faker = require('faker');
const uuid = require('uuid')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const arees = ["Braços", "Tronc", "Cames", "Coll"];

    let videos = [
      {
        id: uuid.v4(),
        nom: 'mercedes',
        codi: '18kHpdpqGablq52Ndbq7HzjPYMbl-l587',
        descripcio: faker.lorem.sentence(),
        areaExercici: arees[Math.floor(Math.random() * arees.length)],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid.v4(),
        nom: 'microscopio',
        codi: '1Gh4fZFvr0gWTMmnJ8K0iJyUI6b-RNSbh',
        descripcio: faker.lorem.sentence(),
        areaExercici: arees[Math.floor(Math.random() * arees.length)],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid.v4(),
        nom: 'televisor',
        codi: '1qaR-zHKraCpNVzt_C-1rPkyBrJGJUx-7',
        descripcio: faker.lorem.sentence(),
        areaExercici: arees[Math.floor(Math.random() * arees.length)],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid.v4(),
        nom: 'tubos',
        codi: '1u8HruKFe2RcvIpoI25o2ZDmOk3BNRz5u',
        descripcio: faker.lorem.sentence(),
        areaExercici: arees[Math.floor(Math.random() * arees.length)],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid.v4(),
        nom: 'corazon',
        codi: '1lfInM3TqTdjGroYISqLok-MQmomBHNJq',
        descripcio: faker.lorem.sentence(),
        areaExercici: arees[Math.floor(Math.random() * arees.length)],
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]

    await queryInterface.bulkInsert('Videos', videos, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Videos', null, {});
  }
};
