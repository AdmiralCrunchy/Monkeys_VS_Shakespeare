const sequelize = require(`../config/connection`);
const {Section} = require(`../models/Book`);

const sectionData = require('./sectionkData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
  
    await Section.bulkCreate(sectionData, {
      individualHooks: true,
      returning: true,
    });
  
    process.exit(0);
  };
  
  seedDatabase();