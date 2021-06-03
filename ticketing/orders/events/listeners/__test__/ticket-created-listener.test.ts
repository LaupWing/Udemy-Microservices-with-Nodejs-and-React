import mongoose from 'mongoose'
import { TicketUpdatedEvent } from "@ticketservice/common"
import { natsWrapper } from "../../../__mocks__/nats-wrapper"
import { TicketCreatedListener } from "../ticket-created-listener"
import { Ticket } from '../../../src/models/ticket'

const setup = async ()=>{
   // @ts-ignore
   const listener = new TicketCreatedListener(natsWrapper.client)
   const data: TicketUpdatedEvent['data'] = {
      version: 0,
      id: new mongoose.Types.ObjectId().toHexString(),
      title: 'concert',
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
      msg
   }
}

it('creates and saves a ticket', async ()=>{
   const {listener, msg, data} = await setup()

   await listener.onMessage(data, msg)
   const ticket = await Ticket.findById(data.id)
   expect(ticket).toBeDefined()
   expect(ticket!.title).toEqual(data.title)
   expect(ticket!.price).toEqual(data.price)
})

it('acks the message', async ()=>{

})