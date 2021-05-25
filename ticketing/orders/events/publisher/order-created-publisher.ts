import { OrderCreatedEvent, Publisher, Subjects } from "@ticketservice/common";


export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent>{
   subject: Subjects.OrderCreated = Subjects.OrderCreated
}