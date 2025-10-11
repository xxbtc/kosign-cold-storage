import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const SensitiveModeContext = createContext();

export const useSensitiveMode = () => {
    const context = useContext(SensitiveModeContext);
    if (!context) {
        throw new Error('useSensitiveMode must be used within SensitiveModeProvider');
    }
    return context;
};

export const SensitiveModeProvider = ({ children }) => {
    const [isSensitiveMode, setIsSensitiveMode] = useState(false);

    const enterSensitiveMode = useCallback(() => {
        if (!isSensitiveMode) { // Only enter if not already in sensitive mode
            setIsSensitiveMode(true);
            console.log('🔒 Entered sensitive mode - enhanced privacy protection');
        }
    }, [isSensitiveMode]);

    const exitSensitiveMode = useCallback(() => {
        if (isSensitiveMode) { // Only exit if currently in sensitive mode
            setIsSensitiveMode(false);
            console.log('🔓 Exited sensitive mode');
        }
    }, [isSensitiveMode]);

    return (
        <SensitiveModeContext.Provider value={{
            isSensitiveMode,
            enterSensitiveMode,
            exitSensitiveMode
        }}>
            {children}
        </SensitiveModeContext.Provider>
    );
}; 