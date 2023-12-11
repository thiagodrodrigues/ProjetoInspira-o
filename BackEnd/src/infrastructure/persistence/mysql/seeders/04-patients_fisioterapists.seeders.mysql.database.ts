import * as Sequelize from 'sequelize';

export default {
  up: (queryInterface: Sequelize.QueryInterface) => {

    return queryInterface.bulkInsert('patients_fisioterapists', [
      {
        idPatientFisioterapist: 1,
        idFisioterapist: 1,
        idPatient: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idPatientFisioterapist: 2,
        idFisioterapist: 1,
        idPatient: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idPatientFisioterapist: 3,
        idFisioterapist: 1,
        idPatient: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idPatientFisioterapist: 4,
        idFisioterapist: 2,
        idPatient: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

  },
  down: (queryInterface: Sequelize.QueryInterface) => {
    return queryInterface.bulkDelete('patients_fisioterapists', {});
  },
};
