import { Publisher, Subjects, TicketUpdatedEvent } from "@ticketservice/common";


export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent>{
   subject: Subjects.TicketUpdated = Subjects.TicketUpdated
   
}