'use strict';

const faker = require('faker');
const uuid = require('uuid')

const bcryptService = require('../../services/bcryptService')

module.exports = {
  up: (queryInterface, Sequelize) => {

    const password = bcryptService.hashPassword('password')
    const adminId = uuid.v4();
    let usuaris = [
      {
        id: adminId,
        username: 'admin2',
        password: password,
        email: faker.internet.email(),
        numMobil: faker.phone.phoneNumber('6########'),
        rol: 'Administrador',
        nom: faker.name.firstName(),
        cognoms: faker.name.lastName(),
        FisioterapeutaId: adminId,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid.v4(),
        username: faker.internet.userName(),
        password: password,
        email: faker.internet.email(),
        numMobil: faker.phone.phoneNumber('6########'),
        rol: 'Client',
        nom: faker.name.firstName(),
        cognoms: faker.name.lastName(),
        FisioterapeutaId: adminId,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid.v4(),
        username: faker.internet.userName(),
        password: password,
        email: faker.internet.email(),
        numMobil: faker.phone.phoneNumber('6########'),
        rol: 'Client',
        nom: faker.name.firstName(),
        cognoms: faker.name.lastName(),
        FisioterapeutaId: adminId,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid.v4(),
        username: faker.internet.userName(),
        password: password,
        email: faker.internet.email(),
        numMobil: faker.phone.phoneNumber('6########'),
        rol: 'Client',
        nom: faker.name.firstName(),
        cognoms: faker.name.lastName(),
        FisioterapeutaId: adminId,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]

    return queryInterface.bulkInsert('Usuaris', usuaris, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Usuaris', null, {});
  }


}
