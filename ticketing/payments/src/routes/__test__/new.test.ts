import { OrderStatus } from '@ticketservice/common'
import mongoose from 'mongoose'
import request from 'supertest'
import { app } from '../../app'
import { Order } from '../../models/Order'
import { stripe } from '../../stripe'

jest.mock('../../stripe')

it('returns a 404 when purchasing an order that not exists', async()=>{
   await request(app)
      .post('/api/payments')
      .set('Cookie', global.signin())
      .send({
         token:'werwer',
         orderId: mongoose.Types.ObjectId().toHexString()
      })
      .expect(404)
})
it('returns a 401 when purchasing an order that doesnt belong to the user', async()=>{
   const order = await Order.build({
      id: mongoose.Types.ObjectId().toHexString(),
      userId: mongoose.Types.ObjectId().toHexString(),
      version: 0,
      price: 20,
      status: OrderStatus.Created
   })

   await order.save()

   await request(app)
      .post('/api/payments')
      .set('Cookie', global.signin())
      .send({
         token:'werwer',
         orderId: order.id
      })
      .expect(401)
})
it('returns a 400 when purchasing an cancelled order', async()=>{
   const userId = mongoose.Types.ObjectId().toHexString()

   const order = await Order.build({
      id: mongoose.Types.ObjectId().toHexString(),
      userId,
      version: 0,
      price: 20,
      status: OrderStatus.Cancelled
   })
   await order.save()

   await request(app)
      .post('/api/payments')
      .set('Cookie', global.signin(userId))
      .send({
         orderId: order.id,
         token: '23123'
      })
      .expect(400)
})

it('returns a 204 withb valid inputs', async ()=>{
   const userId = mongoose.Types.ObjectId().toHexString()

   const order = await Order.build({
      id: mongoose.Types.ObjectId().toHexString(),
      userId,
      version: 0,
      price: 20,
      status: OrderStatus.Created
   })
   await order.save()

   await request(app)
      .post('/api/payments')
      .set('Cookie', global.signin(userId))
      .send({
         token: 'tok_visa',
         orderId: order.id
      })
      .expect(201)

   const chargeOptions = (stripe.charges.create as jest.Mock).mock.calls[0][0]
   expect(chargeOptions.source).toEqual('tok-visa')
   expect(chargeOptions.amount).toEqual(20 * 100)
   expect(chargeOptions.currency).toEqual('usd')
})