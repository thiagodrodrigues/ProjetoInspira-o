import * as Sequelize from 'sequelize'

export default {
  up: (queryInterface: Sequelize.QueryInterface) => {
    return queryInterface.bulkInsert('patients', [
      {
        idPatient: 1,
        idUser: 3,
        phone: '3199999999',
        birth: '1968-01-02',
        sex: 'Masculino',
        profession: 'Funcionário Publico',
        medical: 'Fratura na perna',
        lifestyle: 'Fumante',
        condition: 'Tratamento da fratura na tíbia',
        comments: 'Usuário teste',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idPatient: 2,
        idUser: 6,
        phone: '319888888888',
        birth: '1968-01-03',
        sex: 'Masculino',
        profession: 'Funcionário Publico',
        medical: 'Fratura na perna',
        lifestyle: 'Academia 3x na Semana',
        condition: 'Tratamento da fratura na tíbia',
        comments: 'Usuário teste',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idPatient: 3,
        idUser: 7,
        phone: '319777777779',
        birth: '1968-01-04',
        sex: 'Feminino',
        profession: 'Funcionário Publico',
        medical: 'Fratura na perna',
        lifestyle: 'Sedentário',
        condition: 'Tratamento da fratura na tíbia',
        comments: 'Usuário teste',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idPatient: 4,
        idUser: 8,
        phone: '31666666669',
        birth: '1968-01-05',
        sex: 'Masculino',
        profession: 'Funcionário Publico',
        medical: 'Fratura na perna',
        lifestyle: 'Sedentário',
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
