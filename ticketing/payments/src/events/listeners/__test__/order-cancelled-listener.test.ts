import { OrderCancelledEvent, OrderStatus } from "@ticketservice/common"
import { natsWrapper } from "../../../nats-wrapper"
import mongoose from 'mongoose'
import { Message } from "node-nats-streaming"
import { Order } from "../../../models/Order"
import { OrderCancelledListener } from "../order-cancelled-listener"

const setup = async () =>{
   const listener = new OrderCancelledListener(natsWrapper.client)

   const order = Order.build({
      id: mongoose.Types.ObjectId().toHexString(),
      version: 0,
      userId: 'd21321',
      price: 10,
      status: OrderStatus.Created,
   })

   await order.save()

   const data: OrderCancelledEvent['data'] = {
      id: order.id,
      version: 1,
      ticket:{
         id: '342423'
      }
   }
   // @ts-ignore
   const msg: Message ={
      ack: jest.fn()
   }

   return {listener, data, msg, order}
}

it('updates the status of the order', async ()=>{
   const {listener, data, msg, order} = await setup()

   await listener.onMessage(data, msg)

   const updatedOrder = await Order.findById(order.id)

   expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled)
})

it('acks the message', async ()=>{
   const {listener, data, msg} = await setup()

   await listener.onMessage(data, msg)

   expect(msg.ack).toHaveBeenCalled()
})