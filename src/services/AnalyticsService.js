class AnalyticsService {
    
    static generateSessionId() {
        // Generate a simple session ID for tracking (no PII)
        return 'sess_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now().toString(36);
    }

    static getSessionId() {
        // Get or create session ID for this browser session
        let sessionId = sessionStorage.getItem('kosign_analytics_session');
        if (!sessionId) {
            sessionId = this.generateSessionId();
            sessionStorage.setItem('kosign_analytics_session', sessionId);
        }
        return sessionId;
    }

    static async trackCTAClick(source) {
        try {
            // Check if we're in sensitive mode by looking for the global flag
            // The SensitiveModeContext sets a global variable that we can check
            if (window.kosignSensitiveMode === true) {
                console.log('🔒 Analytics disabled in sensitive mode');
                return;
            }

            const eventData = {
                event: 'cta_click',
                source: source,
                timestamp: new Date().toISOString(),
                session_id: this.getSessionId()
            };

            // Make non-blocking API call using the same pattern as other services
            fetch(global.apiURL + 'analytics/cta-click', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(eventData)
            }).catch(error => {
                // Fail silently - analytics shouldn't break user experience
                console.warn('Analytics tracking failed:', error);
            });

        } catch (error) {
            // Fail silently
            console.warn('Analytics tracking error:', error);
        }
    }
}

export { AnalyticsService }; 