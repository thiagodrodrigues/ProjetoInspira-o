import * as Sequelize from 'sequelize';

export default {
    up: (queryInterface: Sequelize.QueryInterface) => {
        return queryInterface.createTable('accountings', {
            idAccounting: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            idFisioterapist: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false,
                references: {
                  model: {
                            tableName: 'fisioterapists'
                         },

                  key: 'idFisioterapist'
                }
            },
            month: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false
            },
            year: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false
            },
            appointments: Sequelize.DataTypes.INTEGER,
            collected: Sequelize.DataTypes.DECIMAL(8, 2),
            createdAt: Sequelize.DataTypes.DATE,
            updatedAt: Sequelize.DataTypes.DATE,
        });
    },
    down: (queryInterface: Sequelize.QueryInterface) => {
        return queryInterface.dropTable('accountings');
    }
}