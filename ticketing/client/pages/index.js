import axios from 'axios'

const LandingPage = ({currentUser}) =>{
   console.log(currentUser)
   return (
      <h1>Landing page</h1>
   )
}

LandingPage.getIntialProps = async () =>{
   const response = await axios.get('/api/users/currentuser')
   if(typeof window === 'undefined'){
      // On server
      // Request should be made to ingress nginx
   }else{
      // On browser
      // Base url of ''
   }
   return response.data
}

export default LandingPage