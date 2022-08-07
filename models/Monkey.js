const { Model, DataTypes} = require('sequelize');
const sequelize = require('..config/connection');

class Monkey extends Model {}

Monkey.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            unique: true
        },
        owner:{
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'user',
                key: 'id',
            },
        },
        words_Typed: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        games_Won: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        monkey_Job: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'job',
                key: 'id',
            },
        },
    },
    { 
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'monkey'
    }
);
module.exports = Monkey;