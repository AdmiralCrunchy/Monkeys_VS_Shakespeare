const { Model, DataTypes} = require('sequelize');
const sequelize = require('..config/connection');

class Enemy extends Model {}

Enemy.init(
    {
        id: {
            type: DataTypes.INTEGER,    
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            validator: {
                isUnique: true,
            }
        },
        combat_Id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        hit_Points: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        attack_Speed: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        book_Id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }

    },
    { 
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'enemy'
    }
);

module.exports = Enemy;