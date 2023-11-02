import React, { createContext, useState, useContext } from 'react';

const FileContext = createContext();

export const useFileContext = () => {
    return useContext(FileContext);
};

export const FileProvider = ({ children }) => {
    const [selectedFiles, setSelectedFiles] = useState({
        infraestructura: null,
        flota: null,
        bloqueos: null,
        mantenimiento: null,
    });

    const setFile = (fieldName, file) => {
        setSelectedFiles({
            ...selectedFiles,
            [fieldName]: file,
        });
    };

    return (
        <FileContext.Provider value={{ selectedFiles, setFile }}>
            {children}
        </FileContext.Provider>
    );
};
