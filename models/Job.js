const { Model, DataTypes} = require('sequelize');
const sequelize = require('..config/connection');

class Job extends Model {}

Job.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        job_Level: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        health_Points:{
            type: Datatypes.INTEGER,
            allowNull: false,
        },
        attack_damage: {
            type: Datatypes.INTEGER,
            allowNull: false,
        },
        special_Points: {
            type: Datatypes.INTEGER,
            allowNull: false,
        },
        is_Hasted: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
    },
    { 
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'job'
    }
);

module.exports = Job;