const sequelize = require('../config/connection');
const seedBook = require('./book');
const seedPaintings = require('./paintingData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedBook();

  await seedPaintings();

  process.exit(0);
};

seedAll();
