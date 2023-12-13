import * as Sequelize from 'sequelize';

export default {
    up: (queryInterface: Sequelize.QueryInterface) => {
        return queryInterface.createTable('calendars', {
            idCalendar: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                field: 'idCalendar',
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
            available: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
                validate: {
                    isIn: [['Livre', 'Agendada', 'Bloqueada']],
                },
            },
            date: Sequelize.DataTypes.DATE,
            time: Sequelize.DataTypes.STRING,
            createdAt: Sequelize.DataTypes.DATE,
            updatedAt: Sequelize.DataTypes.DATE,
        });
    },
    down: (queryInterface: Sequelize.QueryInterface) => {
        return queryInterface.dropTable('calendars');
    }
}