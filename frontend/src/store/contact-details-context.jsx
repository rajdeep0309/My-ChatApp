import React,{ createContext,useState } from "react";

export const ContactContext = createContext();

export const ContactProvider = ({children}) => {
    const [chatObject, setChatObject] = useState({});

    return(
        <ContactContext.Provider value={{chatObject, setChatObject}}>
            {children}
        </ContactContext.Provider>
    );
}