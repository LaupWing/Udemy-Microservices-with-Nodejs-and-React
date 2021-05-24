import express, {Request, Response} from 'express'
import {NotFoundError, requireAuth, validateRequest} from '@ticketservice/common'
import { body } from 'express-validator'
import mongoose from 'mongoose'
import { Ticket } from '../models/ticket'

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
      res.send({})
   }
)

export {router as newOrderRouter}