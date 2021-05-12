import express from 'express'
import {json} from 'body-parser'
import 'express-async-errors'
import mongoose from 'mongoose'
import cookieSession from 'cookie-session'

import {createTicketRouter} from './routes/new'

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
   .use(errorHandler)
   .use(createTicketRouter)
   .all('*', ()=>{
      throw new NotFoundError()
   })
   
export {app}