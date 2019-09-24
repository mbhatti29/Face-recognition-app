const handleUpdate = (req, res, db) => {
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
}

module.exports = {
  handleUpdate: handleUpdate
}