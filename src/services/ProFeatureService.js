class ProFeatureService {
    static get FREE_LIMITS() {
        return global.FREE_PLAN;
    }

    static get PRO_LIMITS() {
        return global.PRO_PLAN;
    }

    static async isProUser() {
        // Check for active pro session first (after payment)
        if (this.hasActiveProSession()) {
            return true;
        }

        // Check if there's a pending license
        const isPending = localStorage.getItem('kosign_pro_pending') === 'true';
        const licenseKey = localStorage.getItem('kosign_pro_pending_key');
        
        if (!isPending || !licenseKey) {
            return false;
        }

        // Validate license with server to ensure it's still valid
        try {
            const { PaymentService } = await import('./PaymentService');
            const data = await PaymentService.validateLicense(licenseKey);
            
            if (!data.result) {
                // License is invalid - clear local storage
                this.clearProStatus();
                return false;
            }
            
            return true;
        } catch (error) {
            console.error('License validation error:', error);
            // On error, assume invalid and clear
            this.clearProStatus();
            return false;
        }
    }

    // Add a synchronous version for immediate checks (but should be used sparingly)
    static isProUserCached() {
        // Check for active pro session first
        if (this.hasActiveProSession()) {
            return true;
        }
        // Fall back to pending license check
        return localStorage.getItem('kosign_pro_pending') === 'true';
    }

    // Check if user has an active pro session (after payment completion)
    static hasActiveProSession() {
        return localStorage.getItem('kosign_pro_session_active') === 'true';
    }

    static getProStatus() {
        const proData = localStorage.getItem('kosign_pro_data');
        if (proData) {
            try {
                return JSON.parse(proData);
            } catch (e) {
                return null;
            }
        }
        return null;
    }

    static async activateLicense(licenseKey) {
        try {
            // Use PaymentService to validate (but not consume) license
            const { PaymentService } = await import('./PaymentService');
            const data = await PaymentService.validateLicense(licenseKey);

            if (data.result) {
                // Store pro status as "pending" until vault is created
                localStorage.setItem('kosign_pro_pending', 'true');
                localStorage.setItem('kosign_pro_pending_key', licenseKey);
                localStorage.setItem('kosign_pro_data', JSON.stringify({
                    licenseKey: licenseKey,
                    activatedAt: new Date().toISOString(),
                    features: data.features,
                    status: 'pending'
                }));

                return { success: true, features: data.features };
            } else {
                return { success: false, error: data.msg };
            }
        } catch (error) {
            console.error('License validation error:', error);
            return { success: false, error: 'Failed to validate license key' };
        }
    }

    static async consumeLicense() {
        try {
            const pendingKey = localStorage.getItem('kosign_pro_pending_key');
            if (!pendingKey) {
                return { success: false, error: 'No pending license to consume' };
            }

            const { PaymentService } = await import('./PaymentService');
            const data = await PaymentService.consumeLicense(pendingKey);

            if (data.result) {
                // Clear the consumable license data
                localStorage.removeItem('kosign_pro_pending');
                localStorage.removeItem('kosign_pro_pending_key');
                localStorage.removeItem('kosign_pro_data');
                
                // Set active pro session (persists until vault creation complete)
                localStorage.setItem('kosign_pro_session_active', 'true');
                
                return { success: true };
            } else {
                return { success: false, error: data.msg };
            }
        } catch (error) {
            console.error('License consumption error:', error);
            return { success: false, error: 'Failed to consume license' };
        }
    }

    static clearProStatus() {
        // Remove all pro-related localStorage items (for license validation failures)
        localStorage.removeItem('kosign_pro_active');
        localStorage.removeItem('kosign_pro_pending');
        localStorage.removeItem('kosign_pro_pending_key');
        localStorage.removeItem('kosign_pro_data');
    }

    static clearProSession() {
        // Clear the pro session (called when vault creation is complete)
        localStorage.removeItem('kosign_pro_session_active');
    }

    static getCurrentLimits() {
        if (this.isProUserCached()) {
            return this.PRO_LIMITS;
        }
        return this.FREE_LIMITS;
    }

    static canCreateShare(currentShares) {
        const limits = this.getCurrentLimits();
        return currentShares < limits.maxShares;
    }

    static canStoreData(dataLength) {
        const limits = this.getCurrentLimits();
        return dataLength <= limits.maxStorage;
    }

    static getUpgradeMessage(type) {
        const messages = {
            shares: `You've reached the free limit of ${this.FREE_LIMITS.maxShares} shares. Upgrade to Pro for up to ${this.PRO_LIMITS.maxShares} shares!`,
            storage: `You've reached the free limit of ${this.FREE_LIMITS.maxStorage} characters. Upgrade to Pro for up to ${this.PRO_LIMITS.maxStorage} characters!`
        };
        return messages[type] || 'Upgrade to Pro for more features!';
    }
}

export { ProFeatureService }; 