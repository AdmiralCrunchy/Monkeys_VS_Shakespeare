const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Section extends Model { }

Section.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
		},
		// book_Id: {
		// 	type: DataTypes.INTEGER,
		// 	allowNull: false,
		// 	references: {
		// 		model: 'book',
		// 		key: 'id',
		// 	},
		// },
		contents: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		time_Allowed: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{
		sequelize,
		timestamps: false,
		freezeTableName: true,
		underscored: true,
		modelName: 'section',
	}
);

module.exports = Section;
