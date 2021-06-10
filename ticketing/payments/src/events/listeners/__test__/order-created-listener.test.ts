import { OrderCreatedEvent } from "@ticketservice/common"
import { natsWrapper } from "../../../nats-wrapper"
import { OrderCreatedListener } from "../order-created-listener"
import mongoose from 'mongoose'

const setup = async () =>{
   const listener = new OrderCreatedListener(natsWrapper.client)

   const data: OrderCreatedEvent['data'] = {
      id: mongoose.Types.ObjectId().toHexString(),
      version: 0,
      expiresAt 
   }
}