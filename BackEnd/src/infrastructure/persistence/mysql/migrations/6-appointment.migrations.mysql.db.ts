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
            idPatientFisioterapist: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false,
                references: {
                  model: {
                            tableName: 'patients_fisioterapists'
                         },
        
                  key: 'idPatientFisioterapist'
                }
            },
            idCalendar: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false,
                references: {
                  model: {
                            tableName: 'calendars'
                         },
        
                  key: 'idCalendar'
                }
            },
            activies: Sequelize.DataTypes.STRING,
            notes: Sequelize.DataTypes.STRING,
            comments: Sequelize.DataTypes.STRING,
            createdAt: Sequelize.DataTypes.DATE,
            updatedAt: Sequelize.DataTypes.DATE,
        });
    },
    down: (queryInterface: Sequelize.QueryInterface) => {
        return queryInterface.dropTable('appointments');
    }
}