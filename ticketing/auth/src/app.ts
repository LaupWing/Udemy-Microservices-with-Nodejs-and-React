import express from 'express'
import {json} from 'body-parser'
import 'express-async-errors'
import mongoose from 'mongoose'
import cookieSession from 'cookie-session'

import currentUserRouter from './routes/current-user'
import signinRouter from './routes/signin'
import signoutRouter from './routes/signout'
import signupRouter from './routes/signup'

import {errorHandler} from '@ticketservice/common'
import {NotFoundError} from '@ticketservice/common'

const app = express()

app
   .set('trust proxy', true)
   .use(json())
   .use(cookieSession({
      signed: false,
      secure: process.env.NODE_ENV !== 'test'
   }))
   .use(currentUserRouter)
   .use(signinRouter)
   .use(signoutRouter)
   .use(signupRouter)
   .use(errorHandler)
   .all('*', ()=>{
      throw new NotFoundError()
   })
   
export {app}