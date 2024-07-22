import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getCurrentUser } from "../lib/appwrite";

type GlobalContextProps = {
    isLogedIn: boolean,
    user: any,
    isLoading: boolean,
    setIsLogedIn: (isLogedIn: boolean) => void,
    setUser: (user: any) => void,
    setIsLoading: (isLoading: boolean) => void
}

const GlobalContext = createContext<GlobalContextProps>({} as GlobalContextProps);

export const useGlobalContext = () => useContext(GlobalContext);

export function GlobalProvider({children}: { children: ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);
    const [isLogedIn, setIsLogedIn] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        getCurrentUser()
            .then((resp) => {
                if (resp) {
                    setIsLogedIn(true);
                    //@ts-ignore
                    setUser(resp)
                } else {
                    setIsLogedIn(false);
                    setUser(null)
                }
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                setIsLoading(false)
            });
    },[])

    return (
        <GlobalContext.Provider value={{ isLoading, isLogedIn, user, setIsLogedIn, setUser, setIsLoading }}>
            {children}
        </GlobalContext.Provider>
    )
}
