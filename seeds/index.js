const sequelize = require('../config/connection')
const { User, } = require('../models')

const users = [
  {
    username: "rockstar",
    email: "ningboninja@gmail.com",
    password: "password",

  },
  {
    username: "happyboy",
    email: "cooltown@gmail.com",
    password: "password",
  }
]
const seedMe = async () => {
  await sequelize.sync({ force: true });
  await User.bulkCreate(users, { individualHooks: true });

  console.log("seeding complete!");
  process.exit(0);
}

seedMe();