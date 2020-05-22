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

    // it('returns jokes when authenticated', () => {

    // })

    // it('returns an error when not authenticated', () => {

    // })

  })

  // describe('POST /login', () => {
  //   it('returns error when trying to login with invalid data', () => {
  //     return supertest(server)
  //       .post('/api/auth/login')
  //       .send({password: pass})
  //       .then(response => {
  //         expect(response.status).toBe(400)
  //       })
  //   })

  //   it('returns error when trying to login with incorrect credentials', () => {
  //     return supertest(server)
  //       .post('/api/auth/login')
  //       .send({username: uname, password: 'I am the wrong pass'})
  //       .then(response => {
  //         expect(response.status).toBe(401)
  //       })
  //   })

  //   it('returns returns successfully if correct credentials are passed', () => {
  //     return supertest(server)
  //       .post('/api/auth/login')
  //       .send({username: uname, password: pass})
  //       .then(response => {
  //         expect(response.status).toBe(202)
  //       })
  //   })

  // })

})