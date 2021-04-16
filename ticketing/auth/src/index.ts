import express from 'express'
import {json} from 'body-parser'
import currentUserRouter from './routes/current-user'
import signinRouter from './routes/signin'
import signoutRouter from './routes/signout'
import signupRouter from './routes/signup'
import {errorHandler} from './middlewares/error-handler'
import {NotFoundError} from './errors/not-found-error'
import 'express-async-errors'

const app = express()

app
   .use(json())
   .use(currentUserRouter)
   .use(signinRouter)
   .use(signoutRouter)
   .use(signupRouter)
   .all('*', ()=>{
      throw new NotFoundError()
   })
   .use(errorHandler)
   .listen(3000, ()=>{
      console.log('[Auth] Listening on port 3000!')
   })