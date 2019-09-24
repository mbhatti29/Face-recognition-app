const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs')
const cors = require('cors')
const knex = require('knex')

const server = 3001;
const app = express();
const jsonParser = bodyParser.json()
app.use(cors())

const db = knex({
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'postgres',
    password: 'Hello.9123',
    database: 'smartbrain'
  }
})

// GET USERS
app.get('/', (req, res) => {
  res.send(db.users)
})

// SIGN-IN USERS
app.post('/signin', jsonParser, (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json('Error processing request')
  }

  db.select('email', 'hash').from('login').where('email', '=', email)

    .then(data => {
      bcrypt.compare(password, data[0].hash)
      .then(response => {
        if(response) {
          return db.select('*').from('users').where('email', '=', email)
            .then(user => {
              res.json(user[0])
            })
            .catch(err => { res.status(400).json('Error logging in') })
        } else {
          res.status(400).json('Wrong Credentials')
        }
      })  
    })
    .catch(err => {
      res.status(400).json('Wrong Credentials')
    })

})


// REGISTER USERS
app.post('/register', jsonParser, (req, res) => {
  const { email, name, password } = req.body
  
  if (!email || !name || !password) {
    return res.status(400).json('Error processing request')
  }
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      // Store hash in your password DB.
      db.transaction(trx => {
        trx.insert({
          hash: hash,
          email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
          return trx('users')
            .returning('*')
            .insert({
              name: name,
              email: loginEmail[0],
              joined: new Date()
            })
            .then(user => {
              res.json(user[0])
            })
            .catch(err => {
              res.json('Error registering User')
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
      })
      // res.status(400).json('Unable to Register!')
    });
  });
})


// GET THE USER
app.get('/profile/:id', (req, res) => {
  let { id } = req.params;
 
  db.select('*').from('users').where({ id: id }) //both prop and value are the same so you can just use id instead of key:value
    .then(user => {
      user.length ? res.json(user[0]) : res.status(400).json('Not Found')
    })
    .catch(err => {
      res.status(400).json('Error')
    })
})


// UPDATE ENTRIES
app.put('/image', jsonParser, (req, res) => {
  let { id } = req.body;
  db("users").where("id", "=", id) 
    .increment('entries', 1)
    .returning('entries')
    .then(entry => {
      res.json(entry)
    })
    .catch(err => {
      res.status(400).json("Error updating entry")
    })
})

app.listen(server, () => {
  console.log('Server Started:', server);
})

/*
  /         ==> this is working
  /signIn   ==> POST  - success/fail
  /register ==> POST - user
  /profile/:userID ==> GET = user
  /image ==>   PUT - user
*/