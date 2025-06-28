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
    console.log('📹 Starting camera enumeration...');
    
    try {
        // Request permissions first to get device labels
        console.log('🔐 Requesting camera permissions for enumeration...');
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        
        // Stop the stream immediately since we only needed it for permissions
        stream.getTracks().forEach(track => track.stop());
        console.log('✅ Camera permissions granted, enumerating devices...');
        
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        
        console.log('📋 Total video devices found:', videoDevices.length);
        videoDevices.forEach((device, index) => {
            console.log(`📷 Device ${index + 1}:`, {
                deviceId: device.deviceId,
                label: device.label,
                groupId: device.groupId
            });
        });
        
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
        
        console.log('🔍 Camera identification results:');
        console.log('   Back camera:', backCamera?.label || 'Not found by label');
        console.log('   Front camera:', frontCamera?.label || 'Not found by label');
        
        // If we can't identify by label, assume first device is front, second is back (common mobile pattern)
        const fallbackFront = !frontCamera && videoDevices.length > 0 ? videoDevices[0] : frontCamera;
        const fallbackBack = !backCamera && videoDevices.length > 1 ? videoDevices[1] : backCamera;
        
        if (!frontCamera && videoDevices.length > 0) {
            console.log('🔄 Using fallback: Device 1 as front camera:', fallbackFront?.label);
        }
        if (!backCamera && videoDevices.length > 1) {
            console.log('🔄 Using fallback: Device 2 as back camera:', fallbackBack?.label);
        }
        
        const result = {
            front: fallbackFront,
            back: fallbackBack,
            all: videoDevices
        };
        
        console.log('📹 Final camera assignment:', {
            frontCamera: result.front?.label || 'None',
            backCamera: result.back?.label || 'None',
            totalDevices: result.all.length
        });
        
        return result;
    } catch (error) {
        console.error('❌ Camera enumeration failed:', error);
        return { front: null, back: null, all: [] };
    }
};

const getCameraConstraints = (preferBack = true, availableCameras = null) => {
    const isMobile = isMobileDevice();
    const isIOS = isIOSDevice();
    
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
            
            // For iOS, try both exact and ideal constraints
            if (isIOS) {
                constraints.video.deviceId = { exact: targetCamera.deviceId };
            } else {
                constraints.video.deviceId = { ideal: targetCamera.deviceId };
            }
            
            console.log('Final constraints with deviceId:', constraints);
            return constraints;
        }
    }
    
    // Fallback to facingMode approach with iOS-specific handling
    console.log(`Using facingMode fallback for ${preferBack ? 'back' : 'front'} camera`);
    
    if (isIOS) {
        // iOS: Try exact facingMode for more reliable switching
        constraints.video.facingMode = { exact: preferBack ? 'environment' : 'user' };
        console.log('iOS exact facingMode constraints:', constraints);
    } else {
        // Other devices: Use ideal facingMode
        constraints.video.facingMode = preferBack ? 'environment' : 'user';
        console.log('Standard facingMode constraints:', constraints);
    }
    
    return constraints;
};

export const useCameraManager = () => {
    const [cameraFacing, setCameraFacing] = useState('back'); // 'back' or 'front'
    const [cameraKey, setCameraKey] = useState(0); // Force QR Reader remount
    const [availableCameras, setAvailableCameras] = useState(null); // Camera device enumeration
    const [cameraError, setCameraError] = useState(null);
    const [isInitialized, setIsInitialized] = useState(false);
    const [debugInfo, setDebugInfo] = useState(''); // On-screen debug info

    // Initialize cameras when needed (lazy initialization)
    const initializeCameras = async () => {
        if (isInitialized) return; // Already initialized
        
        setDebugInfo('🔧 Initializing cameras...');
        const cameras = await enumerateCameras();
        setAvailableCameras(cameras);
        setIsInitialized(true);
        
        // Update debug info with results
        const frontLabel = cameras.front?.label || 'None found';
        const backLabel = cameras.back?.label || 'None found';
        setDebugInfo(`📹 Cameras: Front: ${frontLabel.substring(0, 20)}... | Back: ${backLabel.substring(0, 20)}... | Total: ${cameras.all.length}`);
        
        console.log('Cameras enumerated:', cameras);
    };

    const switchCamera = () => {
        const newFacing = cameraFacing === 'back' ? 'front' : 'back';
        
        // Initialize cameras if not done yet (user is actively trying to use camera)
        if (!isInitialized) {
            setDebugInfo('🔧 Initializing cameras for switch...');
            initializeCameras();
        }
        
        // Update debug info about what's happening
        if (availableCameras) {
            const targetCamera = newFacing === 'back' ? availableCameras.back : availableCameras.front;
            
            if (targetCamera) {
                setDebugInfo(`🔄 Switching to ${newFacing} camera: ${targetCamera.label.substring(0, 30)}...`);
            } else {
                setDebugInfo(`⚠️ No ${newFacing} camera found, using facingMode fallback`);
            }
        } else {
            setDebugInfo(`📝 Using facingMode: ${newFacing} (no enumeration)`);
        }
        
        setCameraError(null); // Clear any existing errors when switching
        
        // Switch camera facing
        setCameraFacing(newFacing);
        
        // Force QR Reader remount by updating key
        const newKey = cameraKey + 1;
        setCameraKey(newKey);
        
        // Update final debug info
        setTimeout(() => {
            const constraints = getCameraConstraints(newFacing === 'back', availableCameras);
            const method = constraints.video.deviceId ? 'deviceId' : 'facingMode';
            const value = constraints.video.deviceId ? 
                `${constraints.video.deviceId.exact || constraints.video.deviceId.ideal}` : 
                constraints.video.facingMode;
            setDebugInfo(`✅ ${newFacing} camera active (${method}: ${value.substring ? value.substring(0, 15) + '...' : value})`);
        }, 100);
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
        debugInfo,
        
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
        
        // Emergency fallback for testing
        forceExactFacingMode: (facing) => {
            setDebugInfo(`🚨 Force mode: ${facing} (exact)`);
            setCameraFacing(facing);
            setCameraKey(prev => prev + 1);
        },
    };
}; 