import { randomBytes } from 'crypto'
import nats, {Message} from 'node-nats-streaming'

console.clear()

const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
   url: 'http://localhost:4222'
})

stan.on('connect', ()=>{
   console.log('Listener connected to NATS')

   const subscription = stan.subscribe('ticket:created', 'order-service-queu-group')

   subscription.on('message', (msg: Message)=>{
      const data = msg.getData()

      if(typeof data === 'string'){
         console.log(`Received event #${msg.getSequence()} data ${data}`)
      }
   })
})