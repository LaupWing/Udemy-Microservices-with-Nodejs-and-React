import mongoose from 'mongoose'

interface UserAttributes {
   email: string
   password: string
}

interface UserModel extends mongoose.Model<UserDoc> {
   build(attrs: UserAttributes): UserDoc
}
interface UserDoc extends mongoose.Document {
   email: string
   password: string
}

const userSchema = new mongoose.Schema({
   email:{
      type: String,
      required: true
   },
   password:{
      type: String,
      required: true
   },
})

userSchema.statics.build = (attrs: UserAttributes) => {
   return new User(attrs)
}
const User = mongoose.model<UserDoc, UserModel>('user', userSchema)


export { User }