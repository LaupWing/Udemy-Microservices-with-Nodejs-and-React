import express, {Request, Response} from 'express'
import {BadRequestError, NotFoundError, OrderStatus, requireAuth, validateRequest} from '@ticketservice/common'
import { body } from 'express-validator'
import mongoose from 'mongoose'
import { Ticket } from '../models/ticket'
import { Order } from '../models/order'

const router = express.Router()

router.post('/api/orders', requireAuth, [
   body('ticketId')
      .not()
      .isEmpty()
      .custom((input: string)=> mongoose.Types.ObjectId.isValid(input))
      .withMessage('Ticketid must be provided')
   ], 
   validateRequest, 
   async (req: Request, res: Response)=>{
      const {ticketId} = req.body

      const ticket = await Ticket.findById(ticketId)
      if(!ticket){
         throw new NotFoundError()
      }
      const isReserved = await ticket.isReserved()
      
      if(isReserved){
         throw new BadRequestError('Ticket is already reserverd')
      }

      res.send({})
   }
)

export {router as newOrderRouter}