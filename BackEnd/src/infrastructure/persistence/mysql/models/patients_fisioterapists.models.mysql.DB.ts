import * as Sequelize from "sequelize";
import { MySqlDatabase } from "../mysql.database";

export default MySqlDatabase.getInstance().createModel('patients_fisioterapists', {
  idPatientFisioterapist: {
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
  createdAt: Sequelize.DataTypes.DATE,
  updatedAt: Sequelize.DataTypes.DATE,
});