import * as Sequelize from 'sequelize';

export default {
  up: (queryInterface: Sequelize.QueryInterface) => {
    return queryInterface.bulkInsert('users', [
      {
        idUser: 1,
        name: 'Thiago Daniel Alvim Rodrigues',
        email: 'thiago.alvimrodrigues@gmail.com',
        password: '123456',
        professional: 'Administrador',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idUser: 2,
        name: 'Samantha Smitham Sr.',
        email: 'samantha@gmail.com',
        password: '123456',
        professional: 'Administrador',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idUser: 3,
        name: 'Joy Tremblay',
        email: 'joy.tremblay@gmail.com',
        password: '123456',
        professional: 'Usuário',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idUser: 4,
        name: 'Jeanette Feeney',
        email: 'jeanette.feeney@gmail.com',
        password: '123456',
        professional: 'Fisioterapeuta',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface: Sequelize.QueryInterface) => {
    return queryInterface.bulkDelete('users', {});
  },
};
