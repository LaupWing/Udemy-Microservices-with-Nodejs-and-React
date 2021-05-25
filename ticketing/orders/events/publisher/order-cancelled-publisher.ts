import { OrderCancelledEvent, Publisher, Subjects } from "@ticketservice/common";


export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent>{
   subject: Subjects.OrderCancelled = Subjects.OrderCancelled
}