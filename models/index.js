const User = require('./User');
const Category = require('./Category');
const Idea = require('./Idea');

//User to Category associations
User.belongsToMany(Category, {
  through: 'idea',
  foreignKey: 'user_id'
});

Category.belongsToMany(User, {
  through: 'idea',
  foreignKey: 'category_id'
});


//Idea to Category associations
Idea.belongsTo(Category, {
  foreignKey: 'category_id'
});

Category.hasMany(Idea, {
  foreignKey: 'category_id'
});



//Idea to User associations
Idea.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasMany(Idea, {
  foreignKey: 'user_id'
});


module.exports = { User, Category, Idea };
