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
            status: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
                validate: {
                    isIn: [['Realizada', 'Agendada', 'Cancelada']],
                },
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