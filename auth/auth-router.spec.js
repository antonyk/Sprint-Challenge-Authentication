const supertest = require('supertest')
const server = require('../api/server')
const usersTable = require('../database/user-model')



describe('auth-router', () => {
  it('can run tests', () => {
    expect(true).toBeTruthy();
  })

  describe('POST /register', () => {
    const uname = `u${Math.random()}`
    const pass = 'let me in!'
    it('returns error when trying to signup with invalid data', () => {
      return supertest(server)
        .post('/api/auth/register')
        .send({username: uname})
        .then(response => {
          expect(response.status).toBe(400)
        })
    })

    it('returns success with correct user data', () => {
      return supertest(server)
        .post('/api/auth/register')
        .send({username: uname, password: pass})
        .then(response => {
          expect(response.status).toBe(200)
        })
    })

    it('returns error when trying to signup with invalid data', () => {
      return supertest(server)
        .post('/api/auth/register')
        .send({username: uname, password: pass})
        .then(response => {
          expect(response.status).toBe(500)
        })
    })
  })
})