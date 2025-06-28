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
    
    console.log(`🎯 Building constraints for ${preferBack ? 'back' : 'front'} camera (iOS: ${isIOS})`);
    
    // Base constraints - reduced resolution for better iOS compatibility
    const constraints = {
        audio: false,
        video: {
            width: { ideal: isIOS ? 1280 : (isMobile ? 1920 : 1280) },
            height: { ideal: isIOS ? 720 : (isMobile ? 1080 : 720) },
            frameRate: { ideal: 30, max: 30 }
        }
    };
    
    // Aggressive iOS deviceId approach
    if (isIOS && availableCameras) {
        const targetCamera = preferBack ? availableCameras.back : availableCameras.front;
        
        if (targetCamera?.deviceId) {
            console.log(`📱 iOS: Using exact deviceId for ${preferBack ? 'back' : 'front'} camera:`, targetCamera.label);
            
            // iOS specific: Use exact deviceId with no facingMode fallback
            constraints.video.deviceId = { exact: targetCamera.deviceId };
            
            // Remove any conflicting constraints
            delete constraints.video.facingMode;
            
            console.log('📱 iOS exact deviceId constraints:', JSON.stringify(constraints, null, 2));
            return constraints;
        }
    }
    
    // Non-iOS deviceId approach
    if (!isIOS && availableCameras) {
        const targetCamera = preferBack ? availableCameras.back : availableCameras.front;
        
        if (targetCamera?.deviceId) {
            console.log(`🤖 Android: Using ideal deviceId for ${preferBack ? 'back' : 'front'} camera:`, targetCamera.label);
            constraints.video.deviceId = { ideal: targetCamera.deviceId };
            console.log('🤖 Android deviceId constraints:', constraints);
            return constraints;
        }
    }
    
    // Fallback to facingMode approach
    console.log(`📹 Using facingMode fallback for ${preferBack ? 'back' : 'front'} camera`);
    
    if (isIOS) {
        // iOS: Use exact facingMode as last resort
        constraints.video.facingMode = { exact: preferBack ? 'environment' : 'user' };
        console.log('📱 iOS exact facingMode fallback:', constraints);
    } else {
        // Other devices: Use simple facingMode
        constraints.video.facingMode = preferBack ? 'environment' : 'user';
        console.log('🤖 Standard facingMode fallback:', constraints);
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

    const switchCamera = async () => {
        const oldFacing = cameraFacing;
        const newFacing = cameraFacing === 'back' ? 'front' : 'back';
        
        console.log(`🔄 Switching camera from ${oldFacing} to ${newFacing}`);
        
        // Stop all existing camera streams aggressively
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            stream.getTracks().forEach(track => {
                console.log(`🛑 Stopping active track: ${track.label}`);
                track.stop();
            });
        } catch (e) {
            console.log('📝 No active streams to stop');
        }
        
        // Update state
        setCameraFacing(newFacing);
        setCameraKey(prev => prev + 1);
        
        // Enhanced debug info
        if (availableCameras) {
            const targetCamera = availableCameras[newFacing];
            if (targetCamera) {
                const label = targetCamera.label?.substring(0, 30) || 'Unknown Camera';
                const deviceId = targetCamera.deviceId?.substring(0, 10) || 'No ID';
                setDebugInfo(`🎯 Switching to ${newFacing}: ${label}... (${deviceId}...)`);
                console.log(`📱 Target camera:`, {
                    facing: newFacing,
                    label: targetCamera.label,
                    deviceId: targetCamera.deviceId
                });
            } else {
                setDebugInfo(`⚠️ No ${newFacing} camera found, using facingMode`);
                console.log(`⚠️ No ${newFacing} camera available in devices`);
            }
        } else {
            setDebugInfo(`🔧 Switching to ${newFacing} (cameras not enumerated)`);
        }
        
        // Additional delay to ensure stream cleanup on iOS
        if (isIOSDevice()) {
            setTimeout(() => {
                console.log('📱 iOS: Additional delay for stream cleanup complete');
            }, 200);
        }
    };

    // Enhanced camera constraints with verification
    const getCameraConfig = () => {
        const constraints = getCameraConstraints(cameraFacing === 'back', availableCameras);
        
        // Add verification logging for iOS
        if (isIOSDevice() && availableCameras) {
            const targetCamera = availableCameras[cameraFacing];
            if (targetCamera) {
                console.log(`🔍 iOS Verification - Requested camera:`, {
                    facing: cameraFacing,
                    label: targetCamera.label,
                    deviceId: targetCamera.deviceId,
                    constraintUsed: constraints.video.deviceId ? 'deviceId' : 'facingMode'
                });
            }
        }
        
        return constraints;
    };

    // Add stream verification function
    const verifyStream = (stream) => {
        if (!stream || !isIOSDevice()) return;
        
        const videoTrack = stream.getVideoTracks()[0];
        if (videoTrack) {
            console.log(`🎥 Actual stream info:`, {
                label: videoTrack.label,
                facingMode: videoTrack.getSettings()?.facingMode,
                deviceId: videoTrack.getSettings()?.deviceId,
                width: videoTrack.getSettings()?.width,
                height: videoTrack.getSettings()?.height
            });
            
            // Update debug with actual vs expected
            const expectedCamera = availableCameras?.[cameraFacing];
            const isCorrectCamera = expectedCamera && videoTrack.getSettings()?.deviceId === expectedCamera.deviceId;
            
            if (isCorrectCamera) {
                setDebugInfo(`✅ Correct camera active: ${videoTrack.label.substring(0, 25)}...`);
            } else {
                setDebugInfo(`❌ Wrong camera! Expected: ${expectedCamera?.label.substring(0, 15)}... Got: ${videoTrack.label.substring(0, 15)}...`);
            }
        }
    };

    // Test functions for mobile debugging
    const forceBackCamera = () => {
        console.log('🧪 Force testing back camera');
        setCameraFacing('back');
        setCameraKey(prev => prev + 1);
        
        if (availableCameras?.back) {
            setDebugInfo(`🧪 FORCE BACK: ${availableCameras.back.label.substring(0, 25)}... (deviceId: ${availableCameras.back.deviceId.substring(0, 8)}...)`);
        } else {
            setDebugInfo('🧪 FORCE BACK: No back camera found');
        }
    };
    
    const forceFrontCamera = () => {
        console.log('🧪 Force testing front camera');
        setCameraFacing('front');
        setCameraKey(prev => prev + 1);
        
        if (availableCameras?.front) {
            setDebugInfo(`🧪 FORCE FRONT: ${availableCameras.front.label.substring(0, 25)}... (deviceId: ${availableCameras.front.deviceId.substring(0, 8)}...)`);
        } else {
            setDebugInfo('🧪 FORCE FRONT: No front camera found');
        }
    };

    // Nuclear option for iOS camera switching
    const forceIOSCameraReset = async () => {
        if (!isIOSDevice()) {
            console.log('⚠️ Nuclear reset only for iOS');
            return;
        }
        
        console.log('💥 Nuclear iOS camera reset initiated');
        setDebugInfo('💥 Nuclear reset: forcing iOS camera switch...');
        
        const originalFacing = cameraFacing;
        const oppositeFacing = cameraFacing === 'back' ? 'front' : 'back';
        
        // Step 1: Switch to opposite camera
        console.log(`💥 Step 1: Switch to ${oppositeFacing}`);
        setCameraFacing(oppositeFacing);
        setCameraKey(prev => prev + 1);
        
        // Wait for switch to complete
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Step 2: Switch back to original camera
        console.log(`💥 Step 2: Switch back to ${originalFacing}`);
        setCameraFacing(originalFacing);
        setCameraKey(prev => prev + 1);
        
        setDebugInfo(`💥 Nuclear reset complete - targeting ${originalFacing} camera`);
        console.log('💥 Nuclear reset complete');
    };

    return {
        cameraFacing,
        cameraKey,
        switchCamera,
        getCameraConfig,
        cameraError,
        setCameraError,
        initializeCameras,
        isInitialized,
        debugInfo,
        forceBackCamera,
        forceFrontCamera,
        verifyStream,  // New stream verification function
        forceIOSCameraReset  // New nuclear option function
    };
}; 