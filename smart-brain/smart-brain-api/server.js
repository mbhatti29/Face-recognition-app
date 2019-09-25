const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs')
const cors = require('cors')
const knex = require('knex')

const register = require('./controllers/register')
const signin = require('./controllers/signin')
const update = require('./controllers/update')
const profile = require('./controllers/profile')

const server = 3001;
const app = express();
const jsonParser = bodyParser.json()
app.use(cors())

const db = knex({
  client: 'pg',
  connection: {
    host: 'localhost',
    port: '3002', // change port and db values for main
    user: 'postgres',
    password: 'Hello.9123',
    database: 'smart-brain'
  }
})

// GET USERS
// SIGN-IN USER
// REGISTER USER
// UPDATE ENTRIES
// GET SINGLE USER
app.get('/', (req, res) => { res.send(db.users) })
app.post('/signin', jsonParser, (req, res) =>  { signin.handleSignin(req, res, db, bcrypt) })
app.post('/register', jsonParser, (req, res) =>  { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) })
app.put('/image', jsonParser, (req, res) => { update.handleUpdate(req, res, db) })
app.post('/imageurl', jsonParser, (req, res) => { update.handleImageApi(req, res) })

app.listen(server, () => {
  console.log('Server Started:', server);
})


// app.post('/register', jsonParser, (req, res) => {
//   const { email, name, password } = req.body
  
//   if (!email || !name || !password) {
//     return res.status(400).json('Error processing request')
//   }
//   bcrypt.genSalt(10, function (err, salt) {
//     bcrypt.hash(password, salt, function (err, hash) {
//       // Store hash in your password DB.
//       db.transaction(trx => {
//         trx.insert({
//           hash: hash,
//           email: email
//         })
//         .into('login')
//         .returning('email')
//         .then(loginEmail => {
//           return trx('users')
//             .returning('*')
//             .insert({
//               name: name,
//               email: loginEmail[0],
//               joined: new Date()
//             })
//             .then(user => {
//               res.json(user[0])
//             })
//             .catch(err => {
//               res.json('Error registering User')
//             })
//         })
//         .then(trx.commit)
//         .catch(trx.rollback)
//       })
//       // res.status(400).json('Unable to Register!')
//     });
//   });
// })


/*
  /         ==> this is working
  /signIn   ==> POST  - success/fail
  /register ==> POST - user
  /profile/:userID ==> GET = user
  /image ==>   PUT - user
*/