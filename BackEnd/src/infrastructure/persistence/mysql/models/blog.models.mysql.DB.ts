import * as Sequelize from "sequelize";
import { MySqlDatabase } from "../mysql.database";

export default MySqlDatabase.getInstance().createModel('blogs', {
    idBlog: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
    title: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    text: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    pictureMain: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    createdAt: Sequelize.DataTypes.DATE,
    updatedAt: Sequelize.DataTypes.DATE,
});