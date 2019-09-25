const Clarifai = require('clarifai')

const clarifai = new Clarifai.App({
  apiKey: '45ab6d95aa8b40e6bfe3fd0bd397068d'
})

const handleImageApi = (req, res) => {
  clarifai.models
    .predict('a403429f2ddf4b49b307e318f00e528b', req.body.input)
    .then(data => {
      res.json(data)
    })
    .catch(err => { res.status(400).json('Unable to work with API')})
}


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
  handleUpdate,
  handleImageApi

}