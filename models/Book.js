const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Book extends Model {}

Book.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			validator: {
				isUnique: true,
			},
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		enemy_Id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'Enemy',
				key: 'id',
				defaultValue: 1,
			},
		},
	},
	{
		sequelize,
		timestamps: false,
		freezeTableName: true,
		underscored: true,
		modelName: 'book',
	}
);

module.exports = Book;
