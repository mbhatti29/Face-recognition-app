const handleRegister = (req, res, db, bcrypt) => {
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
}

module.exports = {
  handleRegister: handleRegister
}