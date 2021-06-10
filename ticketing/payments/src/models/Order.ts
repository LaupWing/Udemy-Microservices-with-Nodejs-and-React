import mongoose from 'mongoose'

interface OrderAttrs {
   id: string
   version: number
   userId: string
   price: number
   status: 
}

interface OrderDoc extends mongoose.Do