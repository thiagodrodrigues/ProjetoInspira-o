import * as Sequelize from 'sequelize';

export default {
  up: (queryInterface: Sequelize.QueryInterface) => {

    return queryInterface.bulkInsert('accountings', [
      {
        idAccounting: 1,
        idFisioterapist: 1,
        month: 'Dezembro',
        year: 2023,
        appointments: 8,
        collected: 2000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idAccounting: 2,
        idFisioterapist: 1,
        month: 'Novembro',
        year: 2023,
        appointments: 7,
        collected: 2500,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idAccounting: 3,
        idFisioterapist: 1,
        month: 'Outubro',
        year: 2023,
        appointments: 6,
        collected: 1500,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idAccounting: 4,
        idFisioterapist: 1,
        month: 'Setembro',
        year: 2023,
        appointments: 5,
        collected: 1000.50,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

  },
  down: (queryInterface: Sequelize.QueryInterface) => {
    return queryInterface.bulkDelete('accountings', {});
  },
};
