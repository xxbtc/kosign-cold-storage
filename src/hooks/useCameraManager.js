import { useState, useEffect } from 'react';

// Camera utility functions
const isMobileDevice = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
           (navigator.maxTouchPoints && navigator.maxTouchPoints > 2);
};

const isIOSDevice = () => {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) || 
           (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
};

// Enumerate camera devices to get specific deviceIds
const enumerateCameras = async () => {
    try {
        // Request permissions first to get device labels
        await navigator.mediaDevices.getUserMedia({ video: true });
        
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        
        console.log('Available video devices:', videoDevices);
        
        // Try to identify front and back cameras
        const backCamera = videoDevices.find(device => 
            device.label.toLowerCase().includes('back') || 
            device.label.toLowerCase().includes('environment') ||
            device.label.toLowerCase().includes('rear')
        );
        
        const frontCamera = videoDevices.find(device =>
            device.label.toLowerCase().includes('front') ||
            device.label.toLowerCase().includes('user') ||
            device.label.toLowerCase().includes('selfie') ||
            device.label.toLowerCase().includes('face')
        );
        
        // If we can't identify by label, assume first device is front, second is back (common mobile pattern)
        const fallbackFront = !frontCamera && videoDevices.length > 0 ? videoDevices[0] : frontCamera;
        const fallbackBack = !backCamera && videoDevices.length > 1 ? videoDevices[1] : backCamera;
        
        return {
            front: fallbackFront,
            back: fallbackBack,
            all: videoDevices
        };
    } catch (error) {
        console.log('Camera enumeration failed:', error);
        return { front: null, back: null, all: [] };
    }
};

const getCameraConstraints = (preferBack = true, availableCameras = null) => {
    const isMobile = isMobileDevice();
    
    // Base constraints
    const constraints = {
        audio: false,
        video: {
            width: { ideal: isMobile ? 1920 : 1280 },
            height: { ideal: isMobile ? 1080 : 720 },
            frameRate: { ideal: 30, max: 30 }
        }
    };
    
    // Use deviceId if we have specific camera devices, otherwise fall back to facingMode
    if (availableCameras) {
        const targetCamera = preferBack ? availableCameras.back : availableCameras.front;
        
        if (targetCamera?.deviceId) {
            console.log(`Using deviceId for ${preferBack ? 'back' : 'front'} camera:`, targetCamera.label);
            constraints.video.deviceId = { exact: targetCamera.deviceId };
            return constraints;
        }
    }
    
    // Fallback to facingMode approach
    console.log(`Using facingMode fallback for ${preferBack ? 'back' : 'front'} camera`);
    constraints.video.facingMode = preferBack ? 'environment' : 'user';
    
    return constraints;
};

export const useCameraManager = () => {
    const [cameraFacing, setCameraFacing] = useState('back'); // 'back' or 'front'
    const [cameraKey, setCameraKey] = useState(0); // Force QR Reader remount
    const [availableCameras, setAvailableCameras] = useState(null); // Camera device enumeration
    const [cameraError, setCameraError] = useState(null);
    const [isInitialized, setIsInitialized] = useState(false);

    // Initialize cameras when needed (lazy initialization)
    const initializeCameras = async () => {
        if (isInitialized) return; // Already initialized
        
        const cameras = await enumerateCameras();
        setAvailableCameras(cameras);
        setIsInitialized(true);
        console.log('Cameras enumerated:', cameras);
    };

    const switchCamera = () => {
        const newFacing = cameraFacing === 'back' ? 'front' : 'back';
        console.log('Switching camera from', cameraFacing, 'to', newFacing);
        
        // Initialize cameras if not done yet (user is actively trying to use camera)
        if (!isInitialized) {
            initializeCameras();
        }
        
        // Log available camera info for debugging
        if (availableCameras) {
            const targetCamera = newFacing === 'back' ? availableCameras.back : availableCameras.front;
            console.log('Target camera device:', targetCamera);
        }
        
        setCameraError(null); // Clear any existing errors when switching
        
        // Switch camera facing
        setCameraFacing(newFacing);
        
        // Force QR Reader remount by updating key
        setCameraKey(prev => prev + 1);
        
        console.log('Camera switched to:', newFacing);
    };

    const getCameraConfig = () => {
        // Will work with or without camera enumeration (falls back to facingMode)
        return getCameraConstraints(cameraFacing === 'back', availableCameras);
    };

    return {
        // State
        cameraFacing,
        cameraKey,
        availableCameras,
        cameraError,
        isInitialized,
        
        // Functions
        switchCamera,
        getCameraConfig,
        setCameraError,
        initializeCameras, // Manual initialization when needed
        
        // Utility functions (in case components need them)
        isMobileDevice: isMobileDevice(),
        isIOSDevice: isIOSDevice(),
        
        // For backward compatibility with existing prop structure
        getCameraConstraints,
    };
}; 