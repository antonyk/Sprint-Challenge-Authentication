module.exports = {
  insert,
  getById,
  getByUsername,
  validateCredentials
}

const db = require('./dbConfig')
const bcryptjs = require('bcryptjs')
const rounds = 2;

function insert (data) {
  data.password = bcryptjs.hashSync(data.password, rounds)

  return db('users')
    .insert(data, 'id')
    .then(result => {
      if (result) {
        return getById(result[0])
      }
      else {
        throw 'database ID error';
      }
    })
}

function getById(id) {
  return db('users')
    .columns({
      id:       'id',
      username: 'username',
      password: 'password'
    })
    .where('id', id)
    .select()
    .first()
}


function getByUsername(username) {
  return db('users')
    .columns({
      id:       'id',
      username: 'username',
      password: 'password'
    })
    .where('username', username)
    .select()
    .first()
}

async function validateCredentials(user) {
  const foundUser = await db('users')
    .columns({
      id:       'id',
      username: 'username',
      password: 'password'
    })
    .where({"username": user.username})
    .select()

  if (foundUser.length > 0) {
    return bcryptjs.compareSync(user.password, foundUser.password)
  }
  else {
    return false
  }
}

function authUser(user) {
  return db('users')
    .columns({
      id:       'id',
      username: 'username',
      password: 'password'
    })
    .where({"username": user.username})
    .select()
    .first()
    .then(result => {
      if (result) {
        return bcryptjs.compareSync(user.password, result.password)
      } else {
        return false;
      }
    })
}