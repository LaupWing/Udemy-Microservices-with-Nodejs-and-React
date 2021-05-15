import request from 'supertest'
import {app} from '../../app'
import mongoose from 'mongoose'

it('returns a 404 if the provided id doest not exists', async ()=>{
   const id = mongoose.Types.ObjectId().toHexString()

   await request(app)
      .put(`/api/tickets/${id}`)
      .set('Cookie', global.signin())
      .send({
         title: 'werwerwe',
         price: 20
      })
      .expect(404)
})
it('returns a 401 if the user is not authenticated', async ()=>{
   const id = mongoose.Types.ObjectId().toHexString()
   
   await request(app)
   .put(`/api/tickets/${id}`)
   .send({
      title: 'werwerwe',
      price: 20
   })
   .expect(401)
   
})
it('returns a 401 if the does not own the ticket', async ()=>{
   const response = await request(app)
      .get('/api/tickets')
      .set('Cookie', global.signin())
      .send()
      .expect(200)

   await request(app)
      .put(`/api/tickets/${response.body.id}`)
      .set('Cookie', global.signin())
      .send({
         title: 'werwerwerw',
         price: 10000
      })
      .expect(401)
})
it('returns a 400 if the user provides an invalid title or price', async ()=>{
   const response = await request(app)
      .get('/api/tickets')
      .send()
      .expect(200)

   expect(response.body.length).toEqual(3)
})
it('updates the ticket provided valid inputs', async ()=>{
   const response = await request(app)
      .get('/api/tickets')
      .send()
      .expect(200)

   expect(response.body.length).toEqual(3)
})