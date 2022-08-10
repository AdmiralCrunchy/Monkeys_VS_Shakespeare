const Enemy = require('./Enemy');
const Book = require('./Book');
const Section = require('./Section');
const User = require('./User');
const Job = require('./Job');
const Monkey = require('./Monkey');

Enemy.hasMany(Book, {
	onDelete: 'CASCADE',
	foreignKey: {
		allowNull: false,
		defaultValue: 1,
	},
});
Book.belongsTo(Enemy);

Book.hasMany(Section, {
	onDelete: 'CASCADE',
	foreignKey: {
		allowNull: false,
		defaultValue: 1,
	},
});
Section.belongsTo(Book);

module.exports = {
	Enemy,
	Book,
	Section,
	User,
	Job,
	Monkey,
};
