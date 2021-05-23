import express, {Request, Response} from 'express'
import {requireAuth, validateRequest} from '@ticketservice/common'
import { body } from 'express-validator'
import mongoose from 'mongoose'

const router = express.Router()

router.post('/api/orders', requireAuth, [
   body('ticketId')
      .not()
      .isEmpty()
      .custom((input: string)=> mongoose.Types.ObjectId.isValid(input))
      .withMessage('Ticketid must be provided')
], validateRequest, async (req: Request, rest: Response)=>{

})

export {router as newOrderRouter}