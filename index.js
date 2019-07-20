const Sequelize = require('sequelize');
const express = require('express')
const bodyParser = require('body-parser');

const app = express()
const port = 4000

// support parsing of application/json type post data
app.use(bodyParser.json());


app.get('/', (req, res) => {
  //res.send('Här kommer det tillbaka från GET "/" ')
  //res.send(req.body)
  
  stoppaInData('exempelnamn1', 'exempeltext1')
})

app.post('/', (req, res) => {
  //res.send('Här kommer det tillbaka från GET "/" ')
  res.send('post testar')
  
  queryTest()
  
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// Option 1: Passing parameters separately
// connect
const sequelize = new Sequelize('new_schema_martin', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
})

//auth
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

//skapar schemat för hur databasen ser ut

  const User = sequelize.define('user', {
    // attributes
    namn: {
      type: Sequelize.STRING,
      allowNull: false
    },
    text: {
      type: Sequelize.STRING,
      allowNull: false
      // allowNull defaults to true
    }
  }, {
    // options
  });


function stoppaInData(namnInput, textInput) {

      // stoppar in data och droppar table if it exist
  // Note: using `force: true` will drop the table if it already exists
User.sync({ force: true }).then(() => {
  // Now the `users` table in the database corresponds to the model definition
  return User.create({
    namn: namnInput,
    text: textInput
  });
});

}

function queryTest() {

User.findAll().then(users => {
  console.log('här börjar users', users);
});

}