import 'bootstrap/dist/css/bootstrap.css'
import buildClient from '../api/buildClient'

const AppComponent =  ({Component, pageProps, currentUser})=>{
   return (
      <div>
         <h1>Header {currentUser.email}</h1>
         <Component {...pageProps}/>
      </div>
   )
}

AppComponent.getInitialProps = async (appCtx) =>{
   const {data} = await buildClient(appCtx.ctx.req).get('/api/users/currentuser')
   let pageProps = {}
   if(appCtx.Component.getInitialProps){
      pageProps = await appCtx.Component.getInitialProps(appCtx.ctx)
   }
   return {
      pageProps,
      currentUser: data.currentUser
   }
}

export default AppComponent