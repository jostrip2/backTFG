'use strict';

const uuid = require('uuid');
const faker = require('faker');
const moment = require('moment');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const adminIds = [
      'adfd2fe7-bb7e-43a3-8ee1-e91ae5766fb7', '63c07a0e-88f9-4a05-bb99-441f7eaebb5f'
    ];
    const clientIds = [
      '03e89443-0b00-4bb3-86f0-4c2255296ce5', '1601c3dd-dde3-4e91-8cf2-7f5aee1e9a39',
      '7d9bbb6d-2e77-4bcd-a27c-5c133f9a5bd3', '8650780b-fbe8-4bdf-a7a1-04943cde7414'
    ];

    let missatges = [];

    for (let i = 0; i < 15; i++) {
      missatges.push({
        id: uuid.v4(),
        titol: faker.lorem.sentence(),
        missatge: faker.lorem.paragraph(1),
        data: moment('2023-06-01').add(Math.floor(Math.random() * 30), 'd').format('YYYY-MM-DD'),
        llegit: false,
        emissorId: clientIds[Math.floor(Math.random() * clientIds.length)],
        receptorId: adminIds[Math.floor(Math.random() * adminIds.length)],
        createdAt: new Date(),
        updatedAt: new Date()
      });
    };

    await queryInterface.bulkInsert('Missatges', missatges, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Missatges', null, {});
  }
};
