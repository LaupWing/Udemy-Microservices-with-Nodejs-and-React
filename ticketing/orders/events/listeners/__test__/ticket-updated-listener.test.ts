import { TicketUpdatedEvent } from '@ticketservice/common'
import mongoose from 'mongoose'
import { Message } from 'node-nats-streaming'
import { Ticket } from '../../../src/models/ticket'
import { natsWrapper } from '../../../__mocks__/nats-wrapper'
import { TicketUpdatedListener } from '../ticket-updated-listener'

const setup = async ()=>{
   // @ts-ignore
   const listener = new TicketUpdatedListener(natsWrapper.client)

   const ticket = Ticket.build({
      id: mongoose.Types.ObjectId().toHexString(),
      title: 'concert',
      price: 20
   })

   await ticket.save()
   const data: TicketUpdatedEvent['data'] = {
      version: ticket.version + 1,
      id: ticket.id,
      title: 'new concert',
      price: 10,
      userId: new mongoose.Types.ObjectId().toHexString()   
   }
   // @ts-ignore
   const msg: Message = {
      ack: jest.fn()
   }
   return {
      listener,
      data,
      msg,
      ticket
   }
}

it('finds, updates, and saves a ticket', async ()=>{
   
})
it('ack the message', async ()=>{

})