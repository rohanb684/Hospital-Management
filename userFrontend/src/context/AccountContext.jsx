import { createContext, useState } from "react";

const AccountContext = createContext();

const AccountProvider = ({children}) =>{
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [user, setUser] = useState({})

    const value = {
        isAuthenticated,
        setIsAuthenticated,
        user, 
        setUser
    }

    return (
        <AccountContext.Provider value={value}>
            {children}
        </AccountContext.Provider>
    )
}

export default AccountProvider;
export {AccountContext}