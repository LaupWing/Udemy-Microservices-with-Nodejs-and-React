import express from 'express'
import {json} from 'body-parser'
import currentUserRouter from './routes/current-user'


const app = express()
app
   .use(json())
   .use(currentUserRouter)
   .listen(3000, ()=>{
      console.log('[Auth] Listening on port 3000!')
   })