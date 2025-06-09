import React from 'react';
import { Analytics } from "@vercel/analytics/react";
import { useSensitiveMode } from '../contexts/SensitiveModeContext';

const ConditionalAnalytics = () => {
    const { isSensitiveMode } = useSensitiveMode();
    
    // Only render analytics when NOT in sensitive mode
    if (isSensitiveMode) {
        return null;
    }
    
    return <Analytics />;
};

export default ConditionalAnalytics; 