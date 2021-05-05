const LandingPage = ({color}) =>{
   return (
      <h1>Landing page</h1>
   )
}

LandingPage.getIntialProps = () =>{
   console.log('Serverside')
   return {color: 'red'}
}

export default LandingPage