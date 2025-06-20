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

    // Function to completely remove any analytics scripts from DOM
    const removeAnalyticsScripts = useCallback(() => {
        // Remove Vercel Analytics scripts
        const vercelScripts = document.querySelectorAll('script[src*="vercel"], script[src*="analytics"]');
        vercelScripts.forEach(script => script.remove());
        
        // Clear any analytics globals
        if (window.va) delete window.va;
        if (window.vaq) delete window.vaq;
        
        // Block any new analytics requests
        if (window.va) {
            window.va = () => {}; // Noop function
        }
    }, []);

    const enterSensitiveMode = useCallback(() => {
        if (!isSensitiveMode) { // Only enter if not already in sensitive mode
            setIsSensitiveMode(true);
            removeAnalyticsScripts();
            window.kosignSensitiveMode = true; // Set global flag for AnalyticsService
            console.log('🔒 Entered sensitive mode - analytics disabled');
        }
    }, [isSensitiveMode, removeAnalyticsScripts]);

    const exitSensitiveMode = useCallback(() => {
        if (isSensitiveMode) { // Only exit if currently in sensitive mode
            setIsSensitiveMode(false);
            window.kosignSensitiveMode = false; // Clear global flag
            console.log('🔓 Exited sensitive mode - analytics re-enabled');
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