import React, { useEffect } from 'react'
import { useUserAuth } from '../providers/UserAuthProvider'

const Passwords = (): React.ReactNode => {

    const { getAccessToken } = useUserAuth();

    useEffect(() => {
        const fetchPasswords = async () => {
            const token = await getAccessToken();
            console.log(token);
        }
        fetchPasswords();
    }, [getAccessToken])

    return (
        <div>
            This is passwords page
        </div>
    )
}

export default Passwords
