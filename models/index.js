const User = require('./User');
const Category = require('./Category');
const Idea = require('./Idea');

Category.hasMany(Idea, {
  foreignKey: 'category_id',
});

Idea.belongsTo(Category, {
  foreignKey: 'category_id',
});

User.hasMany(Category, {
  foreignKey: 'user_id',
});

Category.belongsTo(User, {
  foreignKey: 'user_id',
});


module.exports = { User, Category, Idea };
