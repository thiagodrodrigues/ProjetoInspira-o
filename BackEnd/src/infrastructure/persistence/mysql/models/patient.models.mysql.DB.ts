import * as Sequelize from "sequelize";
import { MySqlDatabase } from "../mysql.database";

export default MySqlDatabase.getInstance().createModel('patients', {
    idPatient: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true,
    },
    idUser: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: {
                    tableName: 'users'
                 },

          key: 'idUser'
        }
    },
    phone: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    birth: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false
    }, 
    sex: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    profession: Sequelize.DataTypes.STRING,
    medical: Sequelize.DataTypes.STRING,
    lifestyle: Sequelize.DataTypes.STRING,
    condition: Sequelize.DataTypes.STRING,
    comments: Sequelize.DataTypes.STRING,
    createdAt: Sequelize.DataTypes.DATE,
    updatedAt: Sequelize.DataTypes.DATE,
});