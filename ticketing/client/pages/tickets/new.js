import { useState } from "react"

const NewTicket = () =>{
   const [title, setTitle] = useState('')
   const [price, setPrice] = useState('')

   const onBlur = () =>{
      const value = parseFloat(price)

      if(isNaN(value)){
         return
      }

      setPrice(value.toFixed(2))
   }

   return (
      <div>
         <h1>Create a Ticket</h1>
         <form action="">
            <div className="form-group">
               <label>Title</label>
               <input 
                  value={title} 
                  type="text" 
                  className="form-control"
                  onChange={(e) => setTitle(e.target.value)}  
                  />
            </div>
            <div className="form-group">
               <label>Title</label>
               <input 
                  value={price} 
                  type="text" 
                  className="form-control"
                  onBlur={onBlur}
                  onChange={(e) => setPrice(e.target.value)}  
               />
            </div>
            <button className="btn btn-primary">
               Submit
            </button>
         </form>
      </div>
   )
}

export default NewTicket