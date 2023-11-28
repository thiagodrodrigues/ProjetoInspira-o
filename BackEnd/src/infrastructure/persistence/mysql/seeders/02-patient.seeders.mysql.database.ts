import * as Sequelize from 'sequelize'

export default {
  up: (queryInterface: Sequelize.QueryInterface) => {
    return queryInterface.bulkInsert('patients', [
      {
        idPatient: 1,
        idUser: 3,
        phone: '3199999999',
        birth: '01/01/1968',
        sex: 'Feminino',
        profession: 'Funcionário Publico',
        medical: 'Fratura na perna',
        lifestyle: 'Fumante',
        condition: 'Tratamento da fratura na tíbia',
        comments: 'Usuário teste',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },
  down: (queryInterface: Sequelize.QueryInterface) => {
    return queryInterface.bulkDelete('patients', {})
  },
}
