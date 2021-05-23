import { OrderStatus } from '@ticketservice/common'
import mongoose from 'mongoose'

interface TicketAttributes {
   title: string
   price: number
   // ticket: TicketDoc
}

interface TicketModel extends mongoose.Model<TicketDoc> {
   build(attrs: TicketAttributes): TicketDoc
}
interface TicketDoc extends mongoose.Document {
   title: string
   price: number
}


const ticketSchema = new mongoose.Schema({
   title:{
      type: String,
      required: true
   },
   price:{
      type: Number,
      required: true,
      min: 0
   },
}, {
   toJSON:{
      transform(doc, ret){
         ret.id = ret._id
         delete ret._id
      }
   }
})

ticketSchema.statics.build = (attrs: TicketAttributes) =>{
   return new Ticket(attrs)
}

const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', ticketSchema)

export {Ticket, TicketDoc}