const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')
const bcrypt = require("bcrypt")

class User extends Model { }

User.init(
    {
        // add properites here, ex:
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            validate: {
                len: [8],
            },
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
        hooks: {
            beforeCreate: userObj => {
                userObj.password = bcrypt.hashSync(userObj.password, 4);
                return userObj;
            }
        }
    }
);

module.exports = User;