const handleProfile  = (req, res, db) => {
  let { id } = req.params;
   
    db.select('*').from('users').where({ id: id }) //both prop and value are the same so you can just use id instead of key:value
      .then(user => {
        user.length ? res.json(user[0]) : res.status(400).json('Not Found')
      })
      .catch(err => {
        res.status(400).json('Error')
      })
}

module.exports = {
  handleProfile: handleProfile
}