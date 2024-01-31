import * as Sequelize from "sequelize";
import { MySqlDatabase } from "../mysql.database";

export default MySqlDatabase.getInstance().createModel('appointments', {
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
                    tableName: 'idCalendar'
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