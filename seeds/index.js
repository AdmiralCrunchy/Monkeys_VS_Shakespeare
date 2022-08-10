const sequelize = require('../config/connection')
const { User, Enemy } = require('../models')

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

const enemys = [
  {
    name: "William Shakespeare",
    hit_Points: 100,
    attack_Speed: 10000,
    damage_High: 15,
    damage_Low: 8,
    description: "William Shakespeare, Shakespeare also spelled Shakspeare, byname Bard of Avon or Swan of Avon, English poet, dramatist, and actor often called the English national poet and considered by many to be the greatest dramatist of all time."
  },
  {
    name: "Oscar Wilde",
    description: "Poet, and supporter of greek independence.",
    hit_Points: 80,
    attack_Speed: 10000,
    damage_High: 15,
    damage_Low: 8
  },
  {
    name: "Mary Shelly",
    description: " This lady wrote a book about a monster but its not THE monster, its the guy who made it! ",
    hit_Points: 60,
    attack_Speed: 12000,
    damage_High: 10,
    damage_Low: 4
  }
]
const seedMe = async () => {
  await sequelize.sync({ force: true });
  await User.bulkCreate(users, { individualHooks: true });
  await Enemy.bulkCreate(enemys, { individualHooks: true, });

  console.log("seeding complete!");
  process.exit(0);
}

seedMe();