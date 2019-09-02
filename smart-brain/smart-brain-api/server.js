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
  console.log('Registered New User');
  res.json(db.users[db.users.length - 1])
})

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