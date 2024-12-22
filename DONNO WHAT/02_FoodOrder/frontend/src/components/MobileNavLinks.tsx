
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { useAuth0 } from '@auth0/auth0-react'

function MobileNavLinks() {
    const { logout } = useAuth0();
  return (
    <>
        <Link 
        className="flex flex-col bg-white items-center font-bold hover:text-orange-500" to="/user-profile">
            User Profile
        </Link>

        <Button 
        className='flex flex-1 items-center font-bold hover:bg-gray-500'
        onClick={() => logout()}>
            Log Out
        </Button>
        
    </>
  )
}

export default MobileNavLinks
