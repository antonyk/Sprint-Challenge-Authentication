/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const { jwtsecret } = require('../vars')
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const token = req.headers.authorization

  if (token) {
    jwt.verify(token, jwtsecret, (error, decodedToken) => {
      if (error) {
        res.status(401).json({ message: "Invalid token"})
      } else {
        req.jwt = decodedToken
        next()
      }
    })
  } else {
    res.status(401).json({ message: "Please authenticate yourself" })
  }
}
