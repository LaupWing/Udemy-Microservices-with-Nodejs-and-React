import express from 'express'
import {json} from 'body-parser'
import currentUserRouter from './routes/current-user'
import signinRouter from './routes/signin'
import signoutRouter from './routes/signout'
import signupRouter from './routes/signup'
import {errorHandler} from './middlewares/error-handler'
import {NotFoundError} from './errors/not-found-error'
import 'express-async-errors'
import mongoose from 'mongoose'

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
   
const start = async () =>{
   try{
      await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
         useNewUrlParser: true,
         useUnifiedTopology: true,
         useCreateIndex: true
      })
   }catch(err){
      console.log(err)
   }
   app.listen(3000, ()=>{
      console.log('[Auth] Listening on port 3000!')
   })
}
start()