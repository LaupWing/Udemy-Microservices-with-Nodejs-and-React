import { Listener, OrderCreatedEvent, Subjects } from "@ticketservice/common";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/ticket";
import { natsWrapper } from "../../nats-wrapper";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";
import { queueGroupName } from "./queueGroupName";


export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
   subject: Subjects.OrderCreated = Subjects.OrderCreated

   queueGroupName = queueGroupName

   async onMessage(data: OrderCreatedEvent['data'], msg: Message){
      const ticket = await Ticket.findById(data.ticket.id)

      if(!ticket){
         throw new Error('Ticket not found')
      }

      ticket.set({orderId: data.id})
      new TicketUpdatedPublisher(natsWrapper.client)

      await ticket.save()

      msg.ack()
   }
}