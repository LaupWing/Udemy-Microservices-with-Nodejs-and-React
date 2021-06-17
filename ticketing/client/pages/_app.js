import 'bootstrap/dist/css/bootstrap.css'
import buildClient from '../api/buildClient'
import AppHeader from '../components/header'

const AppComponent =  ({Component, pageProps, currentUser})=>{
   return (
      <div>
         <AppHeader currentUser={currentUser}/>
         <div className="container">
            <Component currentUser={currentUser} {...pageProps}/>
         </div>
      </div>
   )
}

AppComponent.getInitialProps = async (appCtx) =>{
   const {data} = await buildClient(appCtx.ctx.req).get('/api/users/currentuser')
   let pageProps = {}
   if(appCtx.Component.getInitialProps){
      pageProps = await appCtx.Component.getInitialProps(appCtx.ctx, client, data.currentUser)
   }
   return {
      pageProps,
      currentUser: data.currentUser
   }
}

export default AppComponent