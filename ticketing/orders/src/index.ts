import mongoose from 'mongoose'
import { ExpirationCompleteListener } from '../events/listeners/expiration-complete-listener'
import { TicketCreatedListener } from '../events/listeners/ticket-created-listener'
import { TicketUpdatedListener } from '../events/listeners/ticket-updated-listener'
import {app} from './app'
import { natsWrapper } from './nats-wrapper'

const start = async () =>{
   if(!process.env.JWT_KEY){
      throw new Error('No key')
   }
   if(!process.env.MONGO_URI){
      throw new Error('MONGO_URI must be defined')
   }
   if(!process.env.NATS_URL){
      throw new Error('NATS_URL must be defined')
   }
   if(!process.env.NATS_CLIENT_ID){
      throw new Error('NATS_CLIENT_ID must be defined')
   }
   if(!process.env.NATS_CLUSTER_ID){
      throw new Error('NATS_CLUSTER_ID must be defined')
   }
   try{
      await natsWrapper.connect(
         process.env.NATS_CLUSTER_ID, 
         process.env.NATS_CLIENT_ID, 
         process.env.NATS_URL
      )
      natsWrapper.client.on('close', ()=>{
         console.log('NATS connection closed!')
         process.exit()
      })
      process.on('SIGINT', ()=>natsWrapper.client.close())
      process.on('SIGTERM', ()=>natsWrapper.client.close())

      new TicketCreatedListener(natsWrapper.client)
      new TicketUpdatedListener(natsWrapper.client)
      new ExpirationCompleteListener(natsWrapper.client)

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