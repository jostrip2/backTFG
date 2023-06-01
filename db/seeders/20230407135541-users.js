'use strict';

const uuid = require('uuid');
const faker = require('faker');
const bcryptService = require('../../services/bcryptService')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const password = bcryptService.hashPassword('password')
    const fisiosIds = [
      'adfd2fe7-bb7e-43a3-8ee1-e91ae5766fb7', '63c07a0e-88f9-4a05-bb99-441f7eaebb5f'
    ];
    const clientIds = [
      '03e89443-0b00-4bb3-86f0-4c2255296ce5', '1601c3dd-dde3-4e91-8cf2-7f5aee1e9a39',
      '7d9bbb6d-2e77-4bcd-a27c-5c133f9a5bd3', '8650780b-fbe8-4bdf-a7a1-04943cde7414'
    ];

    let usuaris = [
      {
        id: uuid.v4(),
        username: 'admin',
        password: password,
        email: faker.internet.email(),
        numMobil: faker.phone.phoneNumber('6########'),
        rol: 'Administrador',
        nom: faker.name.firstName(),
        cognoms: faker.name.lastName(),
        FisioterapeutaId: uuid.NIL,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: fisiosIds[0],
        username: 'fisio1',
        password: password,
        email: faker.internet.email(),
        numMobil: faker.phone.phoneNumber('6########'),
        rol: 'Fisioterapeuta',
        nom: faker.name.firstName(),
        cognoms: faker.name.lastName(),
        FisioterapeutaId: uuid.NIL,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: fisiosIds[1],
        username: 'fisio2',
        password: password,
        email: faker.internet.email(),
        numMobil: faker.phone.phoneNumber('6########'),
        rol: 'Fisioterapeuta',
        nom: faker.name.firstName(),
        cognoms: faker.name.lastName(),
        FisioterapeutaId: uuid.NIL,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: clientIds[0],
        username: 'client1',
        password: password,
        email: faker.internet.email(),
        numMobil: faker.phone.phoneNumber('6########'),
        rol: 'Client',
        nom: faker.name.firstName(),
        cognoms: faker.name.lastName(),
        FisioterapeutaId: fisiosIds[0],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: clientIds[1],
        username: 'client2',
        password: password,
        email: faker.internet.email(),
        numMobil: faker.phone.phoneNumber('6########'),
        rol: 'Client',
        nom: faker.name.firstName(),
        cognoms: faker.name.lastName(),
        FisioterapeutaId: fisiosIds[0],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: clientIds[2],
        username: 'client3',
        password: password,
        email: faker.internet.email(),
        numMobil: faker.phone.phoneNumber('6########'),
        rol: 'Client',
        nom: faker.name.firstName(),
        cognoms: faker.name.lastName(),
        FisioterapeutaId: fisiosIds[0],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: clientIds[3],
        username: 'client4',
        password: password,
        email: faker.internet.email(),
        numMobil: faker.phone.phoneNumber('6########'),
        rol: 'Client',
        nom: faker.name.firstName(),
        cognoms: faker.name.lastName(),
        FisioterapeutaId: fisiosIds[1],
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]

    await queryInterface.bulkInsert('Usuaris', usuaris, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Usuaris', null, {});
  }
}
