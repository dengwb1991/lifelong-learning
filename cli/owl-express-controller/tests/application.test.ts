import * as express from 'express'
import { Application } from '../src/application'
import * as path from 'path'

describe('application', () => {

  test('application options.root catch', () => {
    try {
      const a = new Application({
        app: express(),
        root: path.resolve('./tests/null'),
      })
    } catch (error) {
      expect(error.message).toMatch('[Controller.createRouter]Check file exceptions.')
    }
  })

  test('application routes.length', done => {
    const app = new Application({
      app: express(),
      root: path.resolve('./tests/routes'),
    })
    app.on('mounted', routes => {
      expect(routes.length).toBe(5)
      done()
    })
  })
})
