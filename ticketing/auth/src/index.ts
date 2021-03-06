import mongoose from 'mongoose'
import {app} from './app'

const start = async () =>{
   if(!process.env.JWT_KEY){
      throw new Error('No key')
   }
   if(!process.env.MONGO_URI){
      throw new Error('MONGO_URI not provided')
   }
   try{
      await mongoose.connect(process.env.MONGO_URI, {
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