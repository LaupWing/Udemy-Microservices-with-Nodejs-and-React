import buildClient from '../api/buildClient'

const LandingPage = ({currentUser}) =>{
   console.log(currentUser)
   return (
      <h1>Landing page</h1>
   )
}

LandingPage.getIntialProps = async ({req}) =>{
   const {data} = await buildClient(req).get('/api/users/currentuser')
}

export default LandingPage