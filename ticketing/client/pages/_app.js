import 'bootstrap/dist/css/bootstrap.css'
import buildClient from '../api/buildClient'

const AppComponent =  ({Component, pageProps})=>{
   return (
      <div>
         <h1>Header</h1>
         <Component {...pageProps}/>
      </div>
   )
}

AppComponent.getInitialProps = async ({ctx:{req}}) =>{
   const {data} = await buildClient(req).get('/api/users/currentuser')
   return data
}

export default AppComponent