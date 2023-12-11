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