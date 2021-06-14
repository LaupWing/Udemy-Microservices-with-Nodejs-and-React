import {MongoMemoryServer} from 'mongodb-memory-server'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

declare global{
   namespace NodeJS{
      interface Global{
         signin(id?:string): string[]
      }
   }
}

jest.mock('../nats-wrapper')

let mongo: any
beforeAll(async ()=>{
   mongo = new MongoMemoryServer()
   const mongoUri = await mongo.getUri()
   process.env.JWT_KEY = 'testtest'
   await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
   })
})

beforeEach(async ()=>{
   const collections = await mongoose.connection.db.collections()
   jest.clearAllMocks()
   for(let collection of collections){
      await collection.deleteMany({})
   }
})

afterAll(async ()=>{
   await mongo.stop()
   await mongoose.connection.close()
})

global.signin = (id?: string) =>{
   const payload = {
      id: id || mongoose.Types.ObjectId().toHexString(),
      email: 'test@test.com'
   }

   const token = jwt.sign(payload, process.env.JWT_KEY!)
   const session = { jwt: token}
   const sessionJSON = JSON.stringify(session)

   const base64 = Buffer.from(sessionJSON).toString('base64')
   return [`express:sess=${base64}`]
}