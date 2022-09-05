import React, {useState,} from "react";
import { GlobalContext } from "./GlobalContext";

export const GlobalContextProvide: React.FC<any> = (props) => {
    const [currentUser, setCurrentUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    return (
        <GlobalContext.Provider
            value={{
                user: currentUser,
                loading: isLoading,
                setAuthInfo: setCurrentUser,
                destroyAuthInfo: () => null,
                isAuthenticated: () => null,
                setLoading: setIsLoading,
            }}
        >
            {props.children}
        </GlobalContext.Provider>
    );
};
