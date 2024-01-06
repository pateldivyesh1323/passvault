/* eslint-disable react-refresh/only-export-components */
import { FC, ReactNode, createContext, useContext, useEffect, useState } from "react";
import { UserInterface } from "../models/user";
import { useAuth0 } from "@auth0/auth0-react";
import enviroment from "../enviroment";
import axios from "axios";
import { getErrorMsg } from "../utils/error";
import { useNavigate } from "react-router-dom";

interface UserAuthContextInterface {
    user?: UserInterface;
    error?: string;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: () => Promise<void>;
    logout: () => Promise<void>;
    getAccessToken: () => Promise<string>;
}

type PropsType = {
    children: ReactNode
}

const UserAuthContext = createContext<UserAuthContextInterface | null>(null);

export const UserAuthProvider: FC<PropsType> = ({ children }) => {

    const { loginWithPopup, logout, isAuthenticated, isLoading, error: auth0Error, getAccessTokenSilently, user: auth0User } = useAuth0();
    const navigate = useNavigate();

    const [user, setUser] = useState<UserInterface | undefined>();
    const [error, setError] = useState<string | undefined>();

    useEffect(() => {
        if (auth0Error?.message) {
            setError(auth0Error.message);
            setUser(undefined);
        }
    }, [auth0Error]);

    const login = async () => {
        try {
            await loginWithPopup();
            navigate("/passwords");
            if (auth0User) {
                const token = await getAccessTokenSilently();
                const res = await axios.post(`${enviroment.server_url}/user/login`,
                    auth0User,
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                )
                setUser(res.data);
                setError(undefined);
            }
        } catch (error: unknown) {
            setUser(undefined);
            setError(getErrorMsg(error));
        }
    }

    const value: UserAuthContextInterface = {
        logout,
        login,
        getAccessToken: getAccessTokenSilently,
        isAuthenticated: isAuthenticated,
        isLoading,
        error,
        user,
    };

    return (
        <UserAuthContext.Provider value={value}>{children}</UserAuthContext.Provider>
    )
}

export function useUserAuth() {
    const context = useContext(UserAuthContext);

    if (!context) {
        throw new Error(
            "useUserAuth must be used within a UserAuthProvider",
        );
    }

    return context;
}