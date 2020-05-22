const supertest = require('supertest')
const server = require('../api/server')
// const usersTable = require('../database/user-model')

describe('jokes-router', () => {
  const uname = `u${Math.random()}`
  const creds = {
    username: uname,
    password: 'let me in!',
    token: ''
  }

  it('can run tests', () => {
    expect(true).toBeTruthy();
  })

  describe('GET /jokes', () => {
    it('returns success with correct user data', () => {
      // register a user
      return supertest(server)
        .post('/api/auth/register')
        .send({username: creds.username, password: creds.password})
        .then(response => {
          // expect(response.status).toBe(200)
          creds.token = response.headers.authorization
          return supertest(server)
          .get('/api/jokes')
          .set('authorization', creds.token)
          .then(resp => {
            expect(resp.status).toBe(200)
          })
        })
    })

    it('rejects request without proper auth token', () => {
      return supertest(server)
      .get('/api/jokes')
      .then(resp => {
        expect(resp.status).toBe(401)
      })
    })
  })

})