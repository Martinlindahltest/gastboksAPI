const Sequelize = require('sequelize');
const express = require('express')
const bodyParser = require('body-parser');

const app = express()
const port = 4000



// support parsing of application/json type post data
app.use(bodyParser.json());

app.use((req, res, next) => { 
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();

});


app.post('/', (req, res) => {

  
  //stoppaInData('exempelnamn12', 'exempeltext1')
  stoppaInData(req.body.namn, req.body.text)
  //console.log(req.body.namn, req.body.text)
  res.send({
    metod: 'post',
    namn: req.body.namn,
    text: req.body.text
  })

})

app.get('/', (req, res) => {
  // här frågas databasen om all data Det som skickas tillbaka är det som skrivs i funktionen nedan 
  User.findAll().then(val => {
    //res.send(val[0].dataValues.namn)
    res.send(val)

  });
  
  
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
User.sync(
  //{ force: true }
  ).then(() => {
  // Now the `users` table in the database corresponds to the model definition
  return User.create({
    namn: namnInput,
    text: textInput
  });
});

}
/*
function queryTest() {


User.findAll().then(val => {
  //console.log('här börjar users', users[0].dataValues.namn);
  return val[0].dataValues.namn
});

}
* */