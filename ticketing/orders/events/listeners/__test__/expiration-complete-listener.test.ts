import { natsWrapper } from "../../../nats-wrapper"
import { Order, OrderStatus } from "../../../src/models/order"
import { Ticket } from "../../../src/models/ticket"
import { ExpirationCompleteListener } from "../expiration-complete-listener"
import mongoose from 'mongoose'
import { Message } from "node-nats-streaming"
import { ExpirationCompleteEvent } from "@ticketservice/common"

const setup = async () =>{
   const listener = new ExpirationCompleteListener(natsWrapper.client)

   const ticket = Ticket.build({
      id: mongoose.Types.ObjectId().toHexString(),
      title: 'concert',
      price: 20
   })
   await ticket.save()

   const order = Order.build({
      userId: '21312',
      expiresAt: new Date(),
      status: OrderStatus.Created,
      ticket
   })
   await order.save()

   const data: ExpirationCompleteEvent['data'] = {
      orderId: order.id
   }
   // @ts-ignore
   const msg: Message = {
      ack: jest.fn()
   }

   return {
      data,
      msg,
      listener,
      ticket,
      order
   }
}