const app = require('./app');
const sequelize = require('./config/database');
const User = require('./models/User');
const Book = require('./models/Book');

sequelize.sync({force: false},{ alter: true }).then(() => {
  app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
  });
});
