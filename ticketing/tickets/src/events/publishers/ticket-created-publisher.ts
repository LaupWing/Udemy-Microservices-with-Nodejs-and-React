import { Publisher, Subjects, TicketCreatedEvent } from "@ticketservice/common";


export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
   subject: Subjects.TicketCreated = Subjects.TicketCreated
   
}