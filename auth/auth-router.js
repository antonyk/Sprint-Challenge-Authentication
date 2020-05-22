const router = require('express').Router();
const users = require('../database/user-model')
// const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const secret = 'I am a secret!'
// const rounds = 2;
const log = console.log

router.post('/register', (req, res) => {
  const user = req.body
  // validate
  if (user && user.username && user.password) {
    // has the password and asign back to user
    // user.password = bcryptjs.hashSync(user.password, rounds)
    users.insert(user).then(result => {
      // create the jwt and return it
      const token = createToken(result)

      res.status(200).json({data: result, jwt: token})
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
    // user.password = bcryptjs.hashSync(user.password, rounds)

    users.authUser(user).then(isValid => {
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


function createToken(user) {
  const payload = {
    sub: user.id,
    username: user.username
  }

  const options = {
    expiresIn: '1d'
  }

  return jwt.sign(payload, secret, options)
}
