const sequelize = require("../config/connection");
const { User, Category, Idea} = require('../models');
const userData = require('./userData.json');
const categoryData = require('./projectData.json');
const ideaData = require('./ideaData.json');


const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData);
    const categories = await Category.bulkCreate(categoryData);
    const ideas = await Idea.bulkCreate(ideaData);

}

seedDatabase();