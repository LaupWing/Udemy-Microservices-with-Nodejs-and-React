import mongoose from 'mongoose'

interface UserAttributes {
   email: string
   password: string
}

interface UserModel extends mongoose.Model<any> {
   build(attrs: UserAttributes): any
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

const User = mongoose.model<any, UserModel>('user', userSchema)

userSchema.statics.build = (attrs: UserAttributes) => {
   return new User(attrs)
}

export { User }