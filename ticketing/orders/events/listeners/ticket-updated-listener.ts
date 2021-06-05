import { Listener, Subjects, TicketUpdatedEvent } from "@ticketservice/common";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../src/models/ticket";
import { queueGroupName } from "./queue-group-name";


export class TicketUpdatedListener extends Listener<TicketUpdatedEvent>{
   subject: Subjects.TicketUpdated = Subjects.TicketUpdated
   queueGroupName = queueGroupName

   async onMessage(data: TicketUpdatedEvent['data'], msg: Message){
      const ticket = await Ticket.findByEvent(data)
     
      if(!ticket){
         throw new Error('Ticket not found')
      }
      
      const {title,price} = data
      ticket.set({title, price})
      await ticket.save()

      msg.ack()
   }
}