import { OrderCreatedEvent, OrderStatus } from "@ticketservice/common"
import { natsWrapper } from "../../../nats-wrapper"
import { OrderCreatedListener } from "../order-created-listener"
import mongoose from 'mongoose'
import { Message } from "node-nats-streaming"

const setup = async () =>{
   const listener = new OrderCreatedListener(natsWrapper.client)

   const data: OrderCreatedEvent['data'] = {
      id: mongoose.Types.ObjectId().toHexString(),
      version: 0,
      expiresAt: 'fasdrfq',
      userId: 'd21321',
      status: OrderStatus.Created,
      ticket:{
         id: 'safwe',
         price: 10
      } 
   }

   // @ts-ignore
   const msg: Message ={
      ack: jest.fn()
   }

   return {listener, data, msg}
}