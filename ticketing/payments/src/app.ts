import express from 'express'
import {json} from 'body-parser'
import 'express-async-errors'
import cookieSession from 'cookie-session'


import {
   NotFoundError, 
   errorHandler, 
   currentUser
} from '@ticketservice/common'

const app = express()

app
   .set('trust proxy', true)
   .use(json())
   .use(cookieSession({
      signed: false,
      secure: process.env.NODE_ENV !== 'test'
   }))
   .use(errorHandler)
   .use(currentUser)
   .all('*', ()=>{
      throw new NotFoundError()
   })
   
export {app}