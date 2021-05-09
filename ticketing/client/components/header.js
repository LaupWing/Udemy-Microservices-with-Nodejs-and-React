import Link from 'next/link'

const AppHeader = ({currentUser})=>{
   const links = [
      !currentUser && {
         label: 'Sign up', 
         href: '/auth/signup'
      },
      !currentUser && {
         label: 'Sign up', 
         href: '/auth/signup'
      },
      currentUser && {
         label: 'Sign up', 
         href: '/auth/signup'
      },
   ]
      .filter(x=>x)
      .map(({label, href})=>(
         <li 
            key={href}
            className="nav-item"
         >
            <Link href={href}>
               <a className="nav-link">{label}</a>
            </Link>
         </li>
      ))


   return (
      <nav className="navbar navbar-light bg-light">
         <Link href="/">
            <a className="navbar-brand">GitTix</a>
         </Link>
         <div className="d-flex justify-content-end">
            <ul className="nav d-flex align-items-center">
               {currentUser? 'Signout' : 'Signin'}
            </ul>
         </div>
      </nav>
   )
}

export default AppHeader