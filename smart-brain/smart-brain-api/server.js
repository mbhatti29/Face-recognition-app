const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs')
const cors = require('cors')
const server = 3001;

const app = express();
const jsonParser = bodyParser.json()
app.use(cors())


const db = {
  users: [
    {
      id: 123,
      name: 'John',
      email: 'john@gmail.com',
      password: 'cookies',
      entries: 0,
      joined: new Date()
    },
    {
      id: 124,
      name: 'MB',
      email: 'MB@gmail.com',
      password: 'cake',
      entries: 2,
      joined: new Date()
    }
  ]
}

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

  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      // Store hash in your password DB.
      console.log(hash)
    });
  });

  if (name && password.length > 3) {
    console.log('Registered New User');

    db.users.push({
      id: db.users[db.users.length - 1].id + 1,
      name: name,
      email: email,
      // password: password,
      entries: 0,
      joined: new Date().toLocaleDateString("en-US")
    })
    res.json(db.users[db.users.length - 1])
    // res.json('succesful registration')
  } else {
    // res.status(400).json('error logging in')
    res.json('Error Registering User')

  }
})


// GET THE USER
app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  let status = false
 
  db.users.forEach(user => {
    if (user.id == id) {
      status = true;
      return res.json(user)
    }
  })
  if (!status) { res.status(400).json('no such user')}
})

// UPDATE ENTRIES
app.put('/image', jsonParser, (req, res) => {
  const { id } = req.body;
  let status = false

  db.users.forEach(user => {
    if (user.id == id) {
      status = true;
      user.entries++
      return res.json(user.entries)
    }
  })
  if (!status) { res.status(400).json('no such user') }
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