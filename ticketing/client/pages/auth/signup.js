import {useState} from 'react'
import axios from 'axios'
import useRequest from '../../hooks/use-request'

const Signup = () =>{
   const [email, setEmail] = useState('') 
   const [password, setPassword] = useState('') 
   const [errors, setErrors] = useState([]) 

   const onSubmit = async e =>{
      e.preventDefault()
      try{
         const response = await axios.post('/api/users/signup',{
            email,
            password
         })
      }catch(e){
         setErrors(e.response.data.errors)
      }
   }

   return (
      <form onSubmit={onSubmit}>
         <h1>Signup</h1>
         <div className="form-group">
            <label>Email Adress</label>
            <input 
               type="text" 
               className="form-control"
               value={email}
               onChange={e => setEmail(e.target.value)}
               />
         </div>
         <div className="form-group">
            <label>Password</label>
            <input 
               type="password" 
               className="form-control"
               value={password}
               onChange={e => setPassword(e.target.value)}
            />
         </div>
         {errors.length > 0 && <div className="alert alert-danger">
            <h4>Ooops....</h4>
            <ul className="my-0">
               {errors.map(err=>( 
                  <li key={err.message}>
                     {err.message}
                  </li>
               ))}
            </ul>
         </div>}
         <button className="btn btn-primary">
            Sign up
         </button>
      </form>
   )
}

export default Signup