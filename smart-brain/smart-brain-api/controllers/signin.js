const handleSignin = (req, res, db, bcrypt) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json('Error processing request')
  }

  db.select('email', 'hash').from('login').where('email', '=', email)

    .then(data => {
      bcrypt.compare(password, data[0].hash)
        .then(response => {
          if (response) {
            return db.select('*').from('users').where('email', '=', email)
              .then(user => {
                res.json(user[0])
              })
              .catch(err => {
                res.status(400).json('Error logging in')
              })
          } else {
            res.status(400).json('Wrong Credentials')
          }
        })
    })
    .catch(err => {
      res.status(400).json('Wrong Credentials')
    })
}

module.exports = {
  handleSignin: handleSignin
}