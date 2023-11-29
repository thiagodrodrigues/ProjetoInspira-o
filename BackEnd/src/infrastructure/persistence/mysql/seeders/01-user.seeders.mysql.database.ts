import * as Sequelize from 'sequelize';
import bcrypt from 'bcrypt';


let pass = "123456";
let shufflePass = bcrypt.hashSync(pass,10);
export default {
  up: (queryInterface: Sequelize.QueryInterface) => {
    return queryInterface.bulkInsert('users', [
      {
        idUser: 1,
        name: 'Thiago Daniel Alvim Rodrigues',
        email: 'thiago.alvimrodrigues@gmail.com',
        password: shufflePass,
        professional: 'Administrador',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idUser: 2,
        name: 'Samantha Smitham Sr.',
        email: 'samantha@gmail.com',
        password: shufflePass,
        professional: 'Administrador',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idUser: 3,
        name: 'Joy Tremblay',
        email: 'joy.tremblay@gmail.com',
        password: shufflePass,
        professional: 'Usuário',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idUser: 4,
        name: 'Jeanette Feeney',
        email: 'jeanette.feeney@gmail.com',
        password: shufflePass,
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
