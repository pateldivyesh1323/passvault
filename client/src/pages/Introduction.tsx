import { Link } from "react-router-dom"
import { useUserAuth } from "../providers/UserAuthProvider"

const Introduction = () => {

    const { isAuthenticated } = useUserAuth();

    return (
        <div className='flex items-center justify-center h-[80vh] flex-col gap-2 text-[#93B1A6] text-xl px-4'>
            <span>Having problems remembering your passwords! Dont worry we are here.</span>
            <h3 className='sm:text-7xl text-4xl font-extrabold text-white'>Store and Secure</h3>
            <span>your passwords with Passvault.</span>
            <ul className="mb-5">
                <li>✅ Faster service</li>
                <li>✅ Simple UI</li>
                <li>✅ Password encryption</li>
                <li>✅ Open Source</li>
            </ul>
            {isAuthenticated &&
                <Link to="/passwords">
                    <button className="bg-[#93B1A6] p-2 rounded-sm text-black">Go to passwords</button>
                </Link>
            }
        </div >
    )
}

export default Introduction
