import * as Sequelize from 'sequelize';

export default {
    up: (queryInterface: Sequelize.QueryInterface) => {
        return queryInterface.createTable('blogs', {
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
                type: Sequelize.DataTypes.TEXT('long'),
                allowNull: false
            },
            pictureMain: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false
            },
            createdAt: Sequelize.DataTypes.DATE,
            updatedAt: Sequelize.DataTypes.DATE,
        });
    },
    down: (queryInterface: Sequelize.QueryInterface) => {
        return queryInterface.dropTable('blogs');
    }
}