import * as Sequelize from "sequelize";
import { MySqlDatabase } from "../mysql.database";

export default MySqlDatabase.getInstance().createModel('accountings', {
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
    collected: Sequelize.DataTypes.INTEGER,
    createdAt: Sequelize.DataTypes.DATE,
    updatedAt: Sequelize.DataTypes.DATE,
});