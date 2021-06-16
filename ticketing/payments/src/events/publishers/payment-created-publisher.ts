import { PaymentCreatedEvent, Publisher, Subjects } from "@ticketservice/common";


export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent>{
   subject: Subjects.PaymentCreated = Subjects.PaymentCreated
}