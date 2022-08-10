const sequelize = require(`../config/connection`);
const { Book } = require(`../models/Book`);

const bookData = require('./bookData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Book.bulkCreate(bookData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();