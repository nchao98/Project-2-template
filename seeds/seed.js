const sequelize = require("../config/connection");
const { User, Category, Idea } = require('../models');
const userData = require('./userData.json');
const categoryData = require('./categoryData.json');
const ideaData = require('./ideaData.json');


const seedDatabase = async () => {
    await sequelize.sync({ force: true });


    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });


    await Category.bulkCreate(categoryData);
    await Idea.bulkCreate(ideaData);

    process.exit(0);
};

seedDatabase();