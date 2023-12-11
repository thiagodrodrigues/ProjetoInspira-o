import * as Sequelize from 'sequelize'

export default {
  up: (queryInterface: Sequelize.QueryInterface) => {
    return queryInterface.bulkInsert('fisioterapists', [
      {
        idFisioterapist: 1,
        idUser: 4,
        crefito: "111111",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idFisioterapist: 2,
        idUser: 5,
        crefito: "665544",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },
  down: (queryInterface: Sequelize.QueryInterface) => {
    return queryInterface.bulkDelete('fisioterapists', {})
  },
}