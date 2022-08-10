const sequelize = require(`../config/connection`);
const {Enemy} = require(`../models/Enemy`);

const enemyData = require('./enemyData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
  
    await Enemy.bulkCreate(enemyData, {
      individualHooks: true,
      returning: true,
    });
  
    process.exit(0);
  };
  
  seedDatabase(); 
