export default () =>(
   <form>
      <h1>Signup</h1>
      <div className="form-group">
         <label>Email Adress</label>
         <input type="text" className="form-control"/>
      </div>
      <div className="form-group">
         <label>Password</label>
         <input type="password" className="form-control"/>
      </div>
      <button className="btn btn-primary">
         Sign up
      </button>
   </form>
)