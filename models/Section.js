const { Model, DataTypes} = require('sequelize');
const sequelize = require('..config/connection');

class Section extends Model {}

Section.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        contents: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    },
    { 
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'section'
    }
);

module.exorts = Section;

