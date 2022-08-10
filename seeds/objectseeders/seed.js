const sequelize = require('../config/connection');
const { Book, Enemy, Section } = require('../models');

const bookData = require('./bookData.json');
const enemyData = require('./enemyData.json');
const sectionData = require('./sectionData.json')

const seedDatabase = async () => {

    await sequelize.sync({ force: true });

    await Enemy.bulkCreate(enemyData, {
        individualHooks: true,
        returning: true,
    });

    await Book.bulkCreate(bookData, {
        individualHooks: true,
        returning: true,
    });

    await Section.bulkCreate(sectionData, {
        individualHooks: true,
        returning: true,
    });

    process.exit(0);
};

seedDatabase();
