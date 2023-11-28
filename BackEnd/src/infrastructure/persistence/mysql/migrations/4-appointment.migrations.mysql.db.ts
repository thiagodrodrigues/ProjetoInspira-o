import * as Sequelize from 'sequelize';

export default {
    up: (queryInterface: Sequelize.QueryInterface) => {
        return queryInterface.createTable('appointments', {
            idAppointment: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                field: 'idAppointment',
                autoIncrement: true
            },
            idPatient: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false,
                references: {
                  model: {
                            tableName: 'patients'
                         },

                  key: 'idPatient'
                }
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
            status: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false
            },
            date: Sequelize.DataTypes.DATE,
            time: Sequelize.DataTypes.STRING,
            activies: Sequelize.DataTypes.STRING,
            comments: Sequelize.DataTypes.STRING,
            createdAt: Sequelize.DataTypes.DATE,
            updatedAt: Sequelize.DataTypes.DATE,
        });
    },
    down: (queryInterface: Sequelize.QueryInterface) => {
        return queryInterface.dropTable('appointments');
    }
}