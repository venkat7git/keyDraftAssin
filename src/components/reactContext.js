import React, { createContext, useState } from 'react';

// Create a context
const ExcelContext = createContext();

// Create a provider component
const ExcelProvider = ({ children }) => {
    const [data, setData] = useState([]);

    return (
        <ExcelContext.Provider value={{ data, setData }}>
            {children}
        </ExcelContext.Provider>
    );
};

export { ExcelContext, ExcelProvider };