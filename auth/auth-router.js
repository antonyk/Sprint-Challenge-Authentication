const router = require('express').Router();
const users = require('../database/user-model')

router.post('/register', (req, res) => {
  const user = req.body
  // validate
  if (user && user.username && user.password) {
    users.insert(user).then(result => {
      // create the jwt and return it

      res.status(200).json({data: result, jwt: result})
    })
    .catch(err => {
      res.status(500).json({message: "Failed to create user", error: err})
    })
  } else {
    res.status(400).json({ message: "Invalid signup data"})
  }

});

router.post('/login', (req, res) => {
  const user = req.body
  // validate
  if (user && user.username && user.password) {
    users.validateCredentials(user).then(isValid => {
      if (isValid) {
        res.status(202).json({data: {username: user.username}})
        // set up jwt
      } else {
        res.status(401).json({message: "Invalid credentials! Shall not pass!"})
      }
    })
    .catch(err => {
      res.status(500).json({message: "Error while logging you in. Try again or contact our support staff", error: err})
    })
  } else {
    res.status(400).json({ message: "Invalid login data"})
  }

});

module.exports = router;
