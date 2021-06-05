import { OrderCreatedEvent, OrderStatus } from '@ticketservice/common'
import { Ticket } from '../../../models/ticket'
import {natsWrapper} from '../../../nats-wrapper'
import { OrderCreatedListener } from '../order-created-listener'
import mongoose from 'mongoose'
import { Message } from 'node-nats-streaming'

const setup = async ()=>{
   const listener = new OrderCreatedListener(natsWrapper.client)

   const ticket = Ticket.build({
      title: 'concert',
      price: 99,
      userId: 'test'
   })

   await ticket.save()

   const data:OrderCreatedEvent['data'] = {
      id: mongoose.Types.ObjectId().toHexString(),
      version: 0,
      status: OrderStatus.Created,
      userId: 'ewrew',
      expiresAt: 'fewrew',
      ticket:{
         id: ticket.id,
         price: ticket.price
      }
   }

   // @ts-ignore
   const msg: Message ={
      ack: jest.fn()
   }

   return {
      listener,
      ticket,
      data,
      msg
   }
}

it('sets the userId of the ticket', async()=>{
   const {listener, ticket, data, msg} = await setup()

   await listener.onMessage(data, msg)

   const updatedTicket = await Ticket.findById(ticket.id)

   expect(updatedTicket!.orderId).toEqual(data.id)
})