import React from 'react'
import { useUserAuth } from '../providers/UserAuthProvider'

const Navbar = (): React.ReactNode => {

    const { isAuthenticated, login, logout, isLoading } = useUserAuth();

    return (
        <div className="h-20 text-white flex justify-between items-center px-10 shadow-2xl">
            <span className='font-bold text-2xl'>Passvault</span>
            {isAuthenticated || isLoading ?
                <button className='text-lg hover:bg-[#93B1A6] hover:text-black p-2 rounded transition-all duration-300' onClick={logout}>Logout</button>
                :
                <button className='text-lg hover:bg-[#93B1A6] hover:text-black p-2 rounded transition-all duration-300' onClick={login}>Signin/Signup</button>
            }
        </div>
    )
}

export default Navbar
