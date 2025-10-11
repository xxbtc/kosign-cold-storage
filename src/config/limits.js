// Application limits - technical constraints, not artificial restrictions
export const LIMITS = {
    MAX_KEYS: 20,        // Maximum keys due to cryptographic library constraints
    MAX_STORAGE: 300     // Storage limit to keep QR codes manageable
};

// Helper functions for backward compatibility
export const getCurrentLimits = () => ({
    maxShares: LIMITS.MAX_KEYS,
    maxStorage: LIMITS.MAX_STORAGE
});

export const calculateCost = () => 0; // Everything is free in open source version

export const clearProSession = () => {
    // No-op: no sessions to clear in open source version
};
