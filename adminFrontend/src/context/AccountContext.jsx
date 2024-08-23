import { createContext, useState } from "react";


const AccountContext = createContext();

const AccountProvider = ({children}) =>{
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [admin, setAdmin] = useState({})

    const value = {
        isAuthenticated,
        setIsAuthenticated,
        admin,
        setAdmin
    }

    return(
        <AccountContext.Provider value={value}>
            {children}
        </AccountContext.Provider>
    )
}

export default AccountProvider;
export {AccountContext};