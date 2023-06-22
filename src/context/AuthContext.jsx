import { onAuthStateChanged } from "firebase/auth";
import { createContext, useState, useEffect } from "react";
import { auth } from "../firebase";

// Create a new context for the authentication
export const AuthContext = createContext();

// Create a provider component for the authentication context
export const AuthContextProvider = ({ children }) => {
    // Define a state to store the current user
    const [currentUser, setCurrentUser] = useState({});

    // Use useEffect to listen for changes in the authentication state
    useEffect(()=>{
        // Subscribe to the onAuthStateChanged event using the auth object from firebase
        const unsub = onAuthStateChanged(auth, (user)=>{
            // Update the currentUser state with the user object
            setCurrentUser(user);
            // console.log(user)
        });

        // Unsubscribe from the onAuthStateChanged event when the component unmounts
        return () => {
            unsub();
        };
    },[]);

    // Provide the currentUser state through the AuthContext.Provider component
    return(
    <AuthContext.Provider value={{currentUser}}>
        {children}
    </AuthContext.Provider>
    );
}
