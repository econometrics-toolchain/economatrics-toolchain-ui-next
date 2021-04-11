import { useState, createContext } from 'react';

export const SupportedToolsContext = createContext(null);

export const SupportedToolsProvider = ({children}) => {
    const [tools, setTools] = useState([])
    return (
        <SupportedToolsContext.Provider value={[tools, setTools]}>
            {children}
        </SupportedToolsContext.Provider>
    );
}