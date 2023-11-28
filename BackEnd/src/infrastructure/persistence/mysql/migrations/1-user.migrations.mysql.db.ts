import * as Sequelize from 'sequelize';

export default {
    up: (queryInterface: Sequelize.QueryInterface) => {
        return queryInterface.createTable('users', {
            idUser: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: true,
            },
            name: Sequelize.DataTypes.STRING,
            email: {
                type: Sequelize.DataTypes.STRING,
                unique: true,
            },
            password: Sequelize.DataTypes.STRING,
            professional: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
                validate: {
                    isIn: [['Administrador', 'Usuário', 'Fisioterapeuta']],
                },
            },
            createdAt: Sequelize.DataTypes.DATE,
            updatedAt: Sequelize.DataTypes.DATE,
        });
    },
    down: (queryInterface: Sequelize.QueryInterface) => {
        return queryInterface.dropTable('users');
    }
}