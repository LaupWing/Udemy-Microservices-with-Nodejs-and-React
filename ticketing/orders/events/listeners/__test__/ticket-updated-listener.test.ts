import { TicketUpdatedEvent } from '@ticketservice/common'
import mongoose from 'mongoose'
import { Message } from 'node-nats-streaming'
import { Ticket } from '../../../src/models/ticket'
import { natsWrapper } from '../../../nats-wrapper'
import { TicketUpdatedListener } from '../ticket-updated-listener'

const setup = async ()=>{
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
   const {msg, data, ticket, listener} = await setup()

   await listener.onMessage(data, msg)

   const updatedTicket = await Ticket.findById(ticket.id)

   expect(updatedTicket!.title).toEqual(data.title)
   expect(updatedTicket!.price).toEqual(data.price)
   expect(updatedTicket!.version).toEqual(data.version)
})
it('ack the message', async ()=>{
   const {data, listener, msg} = await setup()

   await listener.onMessage(data, msg)
   expect(msg.ack).toHaveBeenCalled()
})

it('does not call ack if the event has a skipped version', async ()=>{
   const {msg, data, listener, ticket} = await setup()

   data.version = 10
   try{
      await listener.onMessage(data, msg)
   }catch(e){

   }
   expect(msg.ack).not.toHaveBeenCalled()
})