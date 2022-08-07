const { Model, DataTypes } = require('sequelize');
const bcrypt = require("bcrypt")
const sequelize = require('../config/connection');


class User extends Model { }

User.init({
    // id: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     autoIncrement: true,
    //     primaryKey: true,
    // },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [8]
        }
    },
    // words_Typed: {
    //     type: DataTypes.INTEGER,
    //     allowNull: true,
    // },
    // user_WPM: {
    //     type: DataTypes.INTEGER,
    //     allowNull: true,
    // },
    // favorite_Book: {
    //     type: DataTypes.INTEGER,
    //     allowNull: true,
    //     references:{
    //          model: 'book',
    //          key: 'id',
    //      },
    // },
    // games_won: {
    //     type: DataTypes.INTEGER,
    //     allowNull: true,
    // }
}, {
    sequelize,
    // timestamps: false,
    // freezeTableName: true,
    // underscored: true,
    // modelName: 'user',
    hooks: {
        beforeCreate: userObj => {
            userObj.password = bcrypt.hashSync(userObj.password, 4);
            return userObj;
        }
    }
});

module.exports = User