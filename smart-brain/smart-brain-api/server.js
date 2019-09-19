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

//! Select and get all users
// db.select().table('users')
//   .then(data => {
//     console.log(data)
//   })
//   .catch(err => {
//     console.log("Error occured", err)
//   })



// GET USERS
app.get('/', (req, res) => {
  // res.send('<h1>App is working<h1>')
  res.send(db.users)
})


// SIGN-IN USERS
app.post('/signin', jsonParser, (req, res) => {

  // bcrypt.compare("hello", "$2a$10$pW1aWzcAlT4Rcndt2hQexeqIGHj9PButssqyozdumpzVL4GUdemMG", function (err, res) {
  //   // res === true
  //   console.log('first guess', res)
  // });
  // bcrypt.compare("baon", "$2a$10$pW1aWzcAlT4Rcndt2hQexeqIGHj9PButssqyozdumpzVL4GUdemMG", function (err, res) {
  //   // res === false
  //   console.log('second guess', res)
  // });

  if (req.body.email === db.users[0].email &&
   req.body.password === db.users[0].password) {
     res.json(db.users[0])
    // res.json('success')
    // console.log(req.body);
    console.log('SignIn Succesful - ', db.users[0].name)
   } else {
    res.status(400).json('error logging in')
   }
})


// REGISTER USERS
app.post('/register', jsonParser, (req, res) => {
  const { email, name, password } = req.body

  db.transaction((trx => {
    trx.insert({
      hash: hash,
      email: email
    })

  }))

  db.transaction(trx => {
    
    .into('users')
    .returning('email')
    .then(loginEmail => {

    })
  })

  db('users')
    .returning('*')
    .insert({
      name: name,
      email: email,
      joined: new Date()
  })
  .then(user => {
    res.json(user)
  })
  .catch(err => {
    res.status(400).json("Unable to register")
  })

  // password hash
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      // Store hash in your password DB.
      console.log(hash)
    });
  });


  // if (name && password.length > 3) {
  //   console.log('Registered New User');

    // db.users.push({
    //   id: db.users[db.users.length - 1].id + 1,
    //   name: name,
    //   email: email,
    //   // password: password,
    //   entries: 0,
    //   joined: new Date().toLocaleDateString("en-US")
    // })
    // res.json(db.users[db.users.length - 1]) 
    // res.json('succesful registration')
  // } else {
    // res.status(400).json('error logging in')
  //   res.json('Error Registering User')

  // }
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
      res.json('User entry updated')
      console.log(entry[0])
    })
    .catch(err => {
      res.status(400).json("Error updating entry")
    })

  // if (!status) { res.status(400).json('no such user') }
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