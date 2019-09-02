const express = require('express')
const bodyParser = require('body-parser')
const server = 3000;

const app = express();
const jsonParser = bodyParser.json()


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

app.get('/', (req, res) => {
  // res.send('<h1>App is working<h1>')
  res.send(db.users)
})

app.post('/signin', jsonParser, (req, res) => {
  if (req.body.email === db.users[0].email &&
   req.body.password === db.users[0].password) {
    res.json('success')
    console.log(req.body);
   } else {
    res.status(400).json('error logging in')
   }
})

app.post('/register', jsonParser, (req, res) => {
  const { email, name, password } = req.body
  db.users.push({
    id: db.users[db.users.length - 1].id + 1,
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date().toLocaleDateString("en-US")
  })
  res.json(db.users[db.users.length - 1] )
  res.json('Registered User')
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