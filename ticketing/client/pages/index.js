import buildClient from '../api/buildClient'

const LandingPage = ({currentUser}) =>{
   return currentUser ? <h1>You are signed in</h1> : <h1>You are not signed in</h1>
}

LandingPage.getIntialProps = async ({req}) =>{
   const {data} = await buildClient(req).get('/api/users/currentuser')
   return data
}

export default LandingPage