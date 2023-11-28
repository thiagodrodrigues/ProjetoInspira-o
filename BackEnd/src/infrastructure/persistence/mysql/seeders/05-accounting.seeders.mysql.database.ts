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
        collected: 'R$ 2000,00',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idAccounting: 2,
        idFisioterapist: 1,
        month: 'Novembro',
        year: 2023,
        appointments: 7,
        collected: 'R$ 2500,00',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idAccounting: 3,
        idFisioterapist: 1,
        month: 'Outubro',
        year: 2023,
        appointments: 6,
        collected: 'R$ 1500,00',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idAccounting: 4,
        idFisioterapist: 1,
        month: 'Setembro',
        year: 2023,
        appointments: 5,
        collected: 'R$ 1000,00',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

  },
  down: (queryInterface: Sequelize.QueryInterface) => {
    return queryInterface.bulkDelete('accountings', {});
  },
};
