module.exports = {
  insert,
  getById,
  getByUsername
}

const db = require('./dbConfig')

function insert (data) {
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