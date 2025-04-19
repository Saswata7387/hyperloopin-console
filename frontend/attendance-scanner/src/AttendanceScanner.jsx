import React, { useState, useEffect, useRef } from "react";
import { IoQrCodeOutline } from "react-icons/io5";
import { IoIosInformationCircleOutline } from "react-icons/io";

function AttendanceScanner() {
  const [useCamera, setUseCamera] = useState(false);
  const [cameraPermission, setCameraPermission] = useState("prompt");
  const [loading, setLoading] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const fileInputRef = useRef(null);
  const mediaStreamRef = useRef(null);

  const CAMERA_SIZE = 220;

  // Handle camera initialization with better error management
  useEffect(() => {
    let mounted = true;

    const initCamera = async () => {
      // Only try to initialize camera if the toggle is on
      if (!useCamera) {
        // Make sure we clean up any existing streams when toggling off
        if (mediaStreamRef.current) {
          mediaStreamRef.current.getTracks().forEach(track => track.stop());
          mediaStreamRef.current = null;
        }
        return;
      }

      try {
        setCameraError(null);
        setLoading(true);

        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: "environment" } 
        }).catch(err => {
          console.error("GetUserMedia error:", err);
          
          // Handle permission denied specifically
          if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
            throw new Error("Camera permission denied");
          } else {
            throw err;
          }
        });
        
        if (!mounted) {
          // Component unmounted during async operation
          if (stream) {
            stream.getTracks().forEach(track => track.stop());
          }
          return;
        }

        mediaStreamRef.current = stream;
        setCameraPermission("granted");
        setLoading(false);
      } catch (err) {
        console.error("Camera initialization error:", err);
        
        if (!mounted) return;
        
        // Handle specific error cases
        if (err.message === "Camera permission denied") {
          setCameraPermission("denied");
        } else {
          setCameraPermission("error");
        }
        
        setCameraError(err.message || "Failed to access camera");
        setLoading(false);
      }
    };

    initCamera();

    // Cleanup function
    return () => {
      mounted = false;
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
        mediaStreamRef.current = null;
      }
    };
  }, [useCamera]);

  // Safe toggle function that handles errors
  const handleToggleCamera = () => {
    // If we're turning the camera off, clear errors first
    if (useCamera) {
      // First turn off camera - this ensures streams are cleaned up
      setUseCamera(false);
      // Then reset permission state and errors
      setTimeout(() => {
        setCameraError(null);
        setCameraPermission("prompt");
      }, 100);
    } else {
      // Just turn camera on if it was off
      setUseCamera(true);
    }
  };

  // File upload handler
  const handleFileChange = async (event) => {
    setLoading(true);
    const file = event.target.files[0];
    if (!file) {
      setLoading(false);
      return;
    }
    
    const reader = new FileReader();
    reader.onload = function () {
      setLoading(false);
      // Add your QR code processing logic here
      console.log("File loaded");
    };
    reader.onerror = function() {
      setLoading(false);
      setCameraError("Failed to read file");
    };
    reader.readAsDataURL(file);
  };

  // Simple QR Scanner component (placeholder)
  const QRScanner = () => {
    const videoRef = useRef(null);
    
    useEffect(() => {
      if (!videoRef.current) return;
      
      const startVideo = async () => {
        try {
          if (mediaStreamRef.current) {
            videoRef.current.srcObject = mediaStreamRef.current;
          }
        } catch (err) {
          console.error("Video element error:", err);
        }
      };
      
      startVideo();
    }, []);
    
    return (
      <div style={{ position: "relative", width: CAMERA_SIZE, height: CAMERA_SIZE }}>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: 12
          }}
        />
        <RedCorners />
      </div>
    );
  };

  const RedCorners = () => (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {["top", "bottom"].map((vert) =>
        ["left", "right"].map((horiz) => (
          <React.Fragment key={`${vert}-${horiz}`}>
            <div
              style={{
                position: "absolute",
                [vert]: 0,
                [horiz]: 0,
                width: 32,
                height: 4,
                background: "#ff4d4f",
                borderRadius: 2,
              }}
            />
            <div
              style={{
                position: "absolute",
                [vert]: 0,
                [horiz]: 0,
                width: 4,
                height: 32,
                background: "#ff4d4f",
                borderRadius: 2,
              }}
            />
          </React.Fragment>
        ))
      )}
    </div>
  );

  const PhoneIcon = () => <IoQrCodeOutline size={48} color="#555" />;
  const InfoIcon = () => <IoIosInformationCircleOutline size={20} color="#888" />;

  // Render different content based on camera state
  const renderCameraContent = () => {
    if (!useCamera) {
      return (
        <>
          <div style={{ marginBottom: "16px" }}>
            <PhoneIcon />
          </div>
          <div style={{ marginBottom: "8px" }}>
            <div style={{ color: "#555", fontSize: "14px", marginBottom: "12px" }}>
              Toggle switch to use camera scanner
            </div>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                fileInputRef.current.click();
              }}
              style={{
                color: "#1976d2", textDecoration: "none", fontSize: "14px"
              }}
            >
              Scan an Image File
            </a>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </div>
        </>
      );
    }
    
    if (loading) {
      return (
        <div style={{ 
          width: CAMERA_SIZE, height: CAMERA_SIZE, 
          display: "flex", justifyContent: "center", alignItems: "center",
          background: "#f0f0f0", borderRadius: 12
        }}>
          Initializing camera...
        </div>
      );
    }
    
    if (cameraPermission === "denied") {
      return (
        <div style={{ 
          width: CAMERA_SIZE, height: CAMERA_SIZE, 
          display: "flex", justifyContent: "center", alignItems: "center",
          flexDirection: "column",
          background: "#f0f0f0", borderRadius: 12,
          padding: "16px"
        }}>
          <div style={{ color: "#d32f2f", marginBottom: "12px", fontSize: "14px" }}>
            Camera permission denied
          </div>
          <div style={{ fontSize: "12px", color: "#555", textAlign: "center" }}>
            Please allow camera access in your browser settings and refresh the page
          </div>
        </div>
      );
    }
    
    if (cameraError) {
      return (
        <div style={{ 
          width: CAMERA_SIZE, height: CAMERA_SIZE, 
          display: "flex", justifyContent: "center", alignItems: "center",
          flexDirection: "column",
          background: "#f0f0f0", borderRadius: 12,
          padding: "16px"
        }}>
          <div style={{ color: "#d32f2f", marginBottom: "12px", fontSize: "14px" }}>
            Camera error
          </div>
          <div style={{ fontSize: "12px", color: "#555", textAlign: "center" }}>
            {cameraError}
          </div>
        </div>
      );
    }
    
    if (cameraPermission === "granted" && mediaStreamRef.current) {
      return <QRScanner />;
    }
    
    return (
      <div style={{ 
        width: CAMERA_SIZE, height: CAMERA_SIZE, 
        display: "flex", justifyContent: "center", alignItems: "center",
        background: "#f0f0f0", borderRadius: 12
      }}>
        Waiting for camera...
      </div>
    );
  };

  return (
    <div style={{
      display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "#f5f6fa"
    }}>
      <div style={{
        background: "#fff", padding: "28px", borderRadius: "16px", boxShadow: "0 2px 16px rgba(0,0,0,0.08)", width: "340px", maxWidth: "90%"
      }}>
        <h2 style={{ textAlign: "center", marginBottom: "16px", fontSize: "20px", color: "#333", fontWeight: "500" }}>
          Attendance Scanner
        </h2>
        {/* Toggle Switch */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
          <span style={{ marginRight: "12px", color: "#555", fontSize: "14px" }}>Use Physical Scanner</span>
          <label style={{ position: "relative", display: "inline-block", width: "40px", height: "20px" }}>
            <input
              type="checkbox"
              checked={useCamera}
              onChange={handleToggleCamera}
              style={{ opacity: 0, width: 0, height: 0 }}
            />
            <span style={{
              position: "absolute", cursor: "pointer", top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: useCamera ? "#2196F3" : "#ccc", transition: "0.3s", borderRadius: "34px"
            }}>
              <span style={{
                position: "absolute", height: "16px", width: "16px", left: useCamera ? "21px" : "3px",
                bottom: "2px", backgroundColor: "white", transition: "0.3s", borderRadius: "50%"
              }}></span>
            </span>
          </label>
        </div>
        
        {/* Scanner Area */}
        <div style={{
          border: "1px solid #e0e0e0", borderRadius: "8px", padding: "20px", textAlign: "center",
          minHeight: "180px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative"
        }}>
          {/* Info Icon in corner */}
          <div style={{
            position: "absolute", top: "8px", right: "8px", cursor: "pointer"
          }} title="Scan a QR code using camera or image file">
            <InfoIcon />
          </div>
          
          {renderCameraContent()}
          
          {/* Status Messages - Only show if camera is on */}
          {useCamera && cameraPermission === "granted" && !cameraError && !loading && (
            <div style={{ marginTop: "12px", fontSize: "12px", color: "#388e3c" }}>
              Camera Active - Ready to Scan
            </div>
          )}
          
          {loading && !useCamera && (
            <div style={{
              marginTop: "16px", color: "#1976d2", fontSize: "14px"
            }}>
              Processing...
            </div>
          )}
        </div>
        
        {/* Troubleshooting section - Only show when useful */}
        {useCamera && (cameraError || cameraPermission === "denied") && (
          <div style={{
            marginTop: "16px", 
            padding: "12px",
            border: "1px solid #ffcdd2", 
            borderRadius: "8px",
            backgroundColor: "#ffebee"
          }}>
            <h3 style={{ color: "#d32f2f", fontSize: "14px", marginBottom: "8px" }}>Troubleshooting</h3>
            <ul style={{ margin: 0, padding: "0 0 0 16px", fontSize: "12px", color: "#555" }}>
              <li style={{ marginBottom: "4px" }}>Make sure your camera is not being used by another application.</li>
              <li style={{ marginBottom: "4px" }}>Check that you've allowed camera permissions in your browser settings.</li>
              <li style={{ marginBottom: "4px" }}>Try using a different browser (Chrome, Firefox, Safari).</li>
              <li>On mobile, try using the back camera instead.</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default AttendanceScanner;