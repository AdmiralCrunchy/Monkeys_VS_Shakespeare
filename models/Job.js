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
        }
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