const router = require('express').Router();
const users = require('../database/user-model')

router.post('/register', (req, res) => {
  const user = req.body;
  // validate
  if (user && user.username && user.password) {
    users.insert(user).then(result => {
      // create the jwt and return it

      res.status(200).json({})
    })
    .catch(err => {
      res.status(500).json({message: "Failed to create user", error: err})
    })
  } else {
    res.status(400).json({ message: "Invalid signup data"})
  }

  // implement registration
});

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;
