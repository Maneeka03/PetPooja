
import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam"; // Import the react-webcam package
import { 
  Button, 
  Container, 
  Typography, 
  Card, 
  CardContent, 
  IconButton, 
  Tabs, 
  Tab, 
  Box, 
  TextField, 
  Paper, 
  CircularProgress,
  Chip,
  Tooltip,
  Snackbar,
  Alert
} from "@mui/material";
import { 
  CameraAlt, 
  Close, 
  FileUpload, 
  CropFree, 
  FlashOn, 
  FlashOff, 
  Refresh, 
  Analytics,
  ZoomIn,
  ZoomOut,
  Save,
  ContentCopy,
  Download
} from "@mui/icons-material";

const AIPoweredScanner = () => {
  const [cameraActive, setCameraActive] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [image, setImage] = useState(null);
  const [flashMode, setFlashMode] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [zoom, setZoom] = useState(1);
  const [cameraReady, setCameraReady] = useState(false);
  const [facingMode, setFacingMode] = useState("environment"); // Default to back camera
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const dropAreaRef = useRef(null);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    if (newValue === 0) {
      setCameraActive(false);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.match('image.*')) {
        const imageUrl = URL.createObjectURL(file);
        setImage(imageUrl);
        setResults(null);
        setSuccessMessage("Image uploaded successfully!");
      } else {
        setErrorMessage("Please select an image file.");
      }
    }
  };

  // Drag and drop handlers
  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (dropAreaRef.current) {
      dropAreaRef.current.style.borderColor = "#1976d2"; // Changed from green to primary blue
      dropAreaRef.current.style.backgroundColor = "#e3f2fd"; // Lighter blue background
    }
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (dropAreaRef.current) {
      dropAreaRef.current.style.borderColor = "#ccc";
      dropAreaRef.current.style.backgroundColor = "#f5f5f5";
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (dropAreaRef.current) {
      dropAreaRef.current.style.borderColor = "#ccc";
      dropAreaRef.current.style.backgroundColor = "#f5f5f5";
    }
    
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      const file = event.dataTransfer.files[0];
      if (file.type.match('image.*')) {
        const imageUrl = URL.createObjectURL(file);
        setImage(imageUrl);
        setResults(null);
        setSuccessMessage("Image dropped successfully!");
      } else {
        setErrorMessage("Please drop an image file.");
      }
    }
  };

  const startCamera = () => {
    setCameraActive(true);
    setSuccessMessage("Camera started successfully!");
  };

  const stopCamera = () => {
    setCameraActive(false);
    setCameraReady(false);
  };

  // Function to flip between front and back camera
  const toggleCamera = () => {
    setFacingMode(prevMode => 
      prevMode === "environment" ? "user" : "environment"
    );
    setSuccessMessage(`Switched to ${facingMode === "environment" ? "front" : "back"} camera`);
  };

  const toggleFlash = () => {
    // This is a simulated flash toggle as react-webcam doesn't directly support flash control
    // In a real application, you would need to implement device-specific controls
    setFlashMode(!flashMode);
    setSuccessMessage(flashMode ? "Flash turned off" : "Flash turned on");
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.2, 2.0));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.2, 1.0));
  };

  const captureImage = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setImage(imageSrc);
        setSuccessMessage("Image captured successfully!");
      } else {
        setErrorMessage("Failed to capture image. Please try again.");
      }
    } else {
      setErrorMessage("Camera not ready. Please try again.");
    }
  };

  const analyzeImage = () => {
    setAnalyzing(true);
    // Simulate AI analysis with more realistic results
    setTimeout(() => {
      setAnalyzing(false);
      // Provide richer simulated results
      setResults({
        detectedObjects: ['Document', 'Text', 'Signature', 'Handwriting', 'Table'],
        confidence: 0.94,
        extractedText: "Sample extracted text from the image analysis would appear here. The AI has identified key elements with 94% confidence.\n\nDocument appears to be an invoice or receipt with tabular data and signatures.\n\nTimestamp: 2025-03-20\nReference: INV-20250320-001",
        documentType: "Invoice/Receipt",
        metadata: {
          estimatedDate: "March 20, 2025",
          keywords: ["payment", "receipt", "transaction"]
        }
      });
      setSuccessMessage("Analysis completed!");
    }, 2000);
  };

  const copyTextToClipboard = () => {
    if (results && results.extractedText) {
      navigator.clipboard.writeText(results.extractedText)
        .then(() => setSuccessMessage("Text copied to clipboard!"))
        .catch(err => setErrorMessage("Failed to copy text: " + err.message));
    }
  };

  const downloadResults = () => {
    if (results) {
      const resultsBlob = new Blob(
        [JSON.stringify(results, null, 2)], 
        { type: 'application/json' }
      );
      const url = URL.createObjectURL(resultsBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'scan-results.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setSuccessMessage("Results downloaded!");
    }
  };

  const resetAll = () => {
    setImage(null);
    setResults(null);
    setSuccessMessage("Reset completed");
  };

  // Handle Webcam component loaded event
  const handleWebcamUserMedia = (stream) => {
    setCameraReady(true);
  };

  // Handle errors from Webcam component
  const handleWebcamError = (err) => {
    console.error("Webcam error:", err);
    setErrorMessage(`Camera access failed: ${err.message || "Unknown error"}. Make sure camera permissions are granted.`);
    setCameraActive(false);
  };

  // Handle component cleanup on unmount
  useEffect(() => {
    return () => {
      // Clean up when component unmounts
      stopCamera();
      
      // Clean up any object URLs to prevent memory leaks
      if (image && image.startsWith('blob:')) {
        URL.revokeObjectURL(image);
      }
    };
  }, []);

  // Added animation keyframes for the scanner frame
  const scannerAnimationKeyframes = `
    @keyframes pulseScanner {
      0% { opacity: 0.8; }
      50% { opacity: 1; }
      100% { opacity: 0.8; }
    }
  `;

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      {/* Add scanner animation styles */}
      <style>{scannerAnimationKeyframes}</style>
      
      <Paper 
        elevation={3} 
        sx={{ 
          borderRadius: 2, 
          overflow: "hidden",
          border: '1px solid rgba(0,0,0,0.1)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
        }}
      >
        <Box sx={{ 
          background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
          color: "white", 
          p: 3, 
          textAlign: "center" 
        }}>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>AI-Powered Scanner</Typography>
          <Typography variant="subtitle1">
            Analyze documents, images, and objects with computer vision
          </Typography>
        </Box>

        <Tabs 
          value={selectedTab} 
          onChange={handleTabChange} 
          centered 
          sx={{ 
            borderBottom: 1, 
            borderColor: 'divider', 
            bgcolor: 'background.paper'
          }}
          TabIndicatorProps={{
            style: {
              height: 3,
              borderRadius: 3
            }
          }}
        >
          <Tab 
            label="Upload Image" 
            icon={<FileUpload />} 
            iconPosition="start" 
            sx={{ 
              textTransform: 'none', 
              fontWeight: 500,
              py: 2
            }}
          />
          <Tab 
            label="Scan with Camera" 
            icon={<CameraAlt />} 
            iconPosition="start" 
            sx={{ 
              textTransform: 'none', 
              fontWeight: 500,
              py: 2
            }}
          />
        </Tabs>

        <Box sx={{ p: 3, bgcolor: 'background.paper' }}>
          {selectedTab === 0 && (
            <Box sx={{ textAlign: "center" }}>
              <input
                accept="image/*"
                type="file"
                id="upload-button"
                style={{ display: "none" }}
                onChange={handleFileUpload}
              />
              <label htmlFor="upload-button">
                <Button 
                  variant="contained" 
                  component="span" 
                  startIcon={<FileUpload />}
                  size="large"
                  sx={{ 
                    mb: 2,
                    textTransform: 'none',
                    borderRadius: 2,
                    px: 3
                  }}
                >
                  Choose Image
                </Button>
              </label>
              
              {!image && (
                <Box 
                  ref={dropAreaRef}
                  sx={{ 
                    border: '2px dashed #ccc', 
                    borderRadius: 2, 
                    p: 4, 
                    mt: 2,
                    backgroundColor: '#f5f5f5',
                    height: 200,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease'
                  }}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <FileUpload sx={{ fontSize: 48, color: '#1976d2', mb: 2, opacity: 0.7 }} />
                  <Typography variant="body1" color="textSecondary">
                    Drag and drop an image here or click "Choose Image"
                  </Typography>
                </Box>
              )}
            </Box>
          )}

          {selectedTab === 1 && (
            <Box sx={{ textAlign: "center" }}>
              {!cameraActive ? (
                <Button 
                  variant="contained" 
                  startIcon={<CameraAlt />}
                  size="large" 
                  onClick={startCamera}
                  sx={{ 
                    mb: 2,
                    textTransform: 'none',
                    borderRadius: 2,
                    px: 3
                  }}
                >
                  Start Camera
                </Button>
              ) : (
                <Box sx={{ position: "relative", mb: 2 }}>
                  {/* Camera controls with improved styling */}
                  <Box sx={{ 
                    position: "absolute", 
                    top: 10, 
                    right: 10, 
                    zIndex: 2,
                    display: 'flex',
                    gap: 1,
                    backdropFilter: 'blur(5px)',
                    borderRadius: 2,
                    padding: '4px',
                    backgroundColor: 'rgba(255,255,255,0.2)'
                  }}>
                    <Tooltip title="Toggle Flash">
                      <IconButton 
                        sx={{ 
                          bgcolor: 'rgba(25,118,210,0.7)', 
                          color: 'white',
                          '&:hover': {
                            bgcolor: 'rgba(25,118,210,0.9)'
                          }
                        }}
                        onClick={toggleFlash}
                      >
                        {flashMode ? <FlashOff /> : <FlashOn />}
                      </IconButton>
                    </Tooltip>
                    
                    <Tooltip title="Flip Camera">
                      <IconButton 
                        sx={{ 
                          bgcolor: 'rgba(25,118,210,0.7)', 
                          color: 'white',
                          '&:hover': {
                            bgcolor: 'rgba(25,118,210,0.9)'
                          }
                        }}
                        onClick={toggleCamera}
                      >
                        <CameraAlt />
                      </IconButton>
                    </Tooltip>
                    
                    <Tooltip title="Zoom In">
                      <IconButton
                        sx={{ 
                          bgcolor: 'rgba(25,118,210,0.7)', 
                          color: 'white',
                          '&:hover': {
                            bgcolor: 'rgba(25,118,210,0.9)'
                          }
                        }}
                        onClick={handleZoomIn}
                        disabled={zoom >= 2.0}
                      >
                        <ZoomIn />
                      </IconButton>
                    </Tooltip>
                    
                    <Tooltip title="Zoom Out">
                      <IconButton
                        sx={{ 
                          bgcolor: 'rgba(25,118,210,0.7)', 
                          color: 'white',
                          '&:hover': {
                            bgcolor: 'rgba(25,118,210,0.9)'
                          }
                        }}
                        onClick={handleZoomOut}
                        disabled={zoom <= 1.0}
                      >
                        <ZoomOut />
                      </IconButton>
                    </Tooltip>
                    
                    <Tooltip title="Close Camera">
                      <IconButton 
                        sx={{ 
                          bgcolor: 'rgba(211,47,47,0.7)', 
                          color: 'white',
                          '&:hover': {
                            bgcolor: 'rgba(211,47,47,0.9)'
                          }
                        }}
                        onClick={stopCamera}
                      >
                        <Close />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  
                  {/* Improved scanner frame with animation */}
                  <Box sx={{ 
                    position: "absolute", 
                    top: '50%', 
                    left: '50%', 
                    transform: 'translate(-50%, -50%)', 
                    width: '80%', 
                    height: '80%', 
                    border: '2px solid #1976d2',
                    boxShadow: '0 0 0 2000px rgba(0, 0, 0, 0.15)', // Reduced opacity further
                    zIndex: 1,
                    pointerEvents: 'none',
                    borderRadius: 2,
                    display: cameraReady ? 'block' : 'none',
                    animation: 'pulseScanner 2s infinite ease-in-out'
                  }}>
                    <CropFree sx={{ 
                      position: 'absolute', 
                      top: '50%', 
                      left: '50%', 
                      transform: 'translate(-50%, -50%)',
                      fontSize: 60,
                      color: '#1976d2',
                      opacity: 0.8
                    }} />
                  </Box>
                  
                  {!cameraReady && (
                    <Box sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: 300,
                      bgcolor: '#000',
                      borderRadius: 2
                    }}>
                      <CircularProgress color="primary" />
                      <Typography variant="body1" color="white" sx={{ mt: 2 }}>
                        Initializing camera...
                      </Typography>
                    </Box>
                  )}
                  
                  <Box sx={{
                    width: '100%',
                    height: 300,
                    overflow: 'hidden',
                    borderRadius: 2,
                    bgcolor: '#000',
                    display: cameraReady ? 'flex' : 'none',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                    <Webcam
                      ref={webcamRef}
                      audio={false}
                      screenshotFormat="image/jpeg"
                      videoConstraints={{
                        width: 1280,
                        height: 720,
                        facingMode: facingMode
                      }}
                      onUserMedia={handleWebcamUserMedia}
                      onUserMediaError={handleWebcamError}
                      style={{ 
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transform: `scale(${zoom})`,
                        transition: 'transform 0.3s ease'
                      }}
                    />
                  </Box>
                  
                  {/* Improved capture button */}
                  <Box sx={{ mt: 2 }}>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      onClick={captureImage}
                      startIcon={<CameraAlt />}
                      disabled={!cameraReady}
                      sx={{ 
                        textTransform: 'none',
                        borderRadius: 20,
                        px: 4,
                        py: 1.5,
                        fontSize: '1.1rem',
                        boxShadow: '0 4px 10px rgba(25,118,210,0.3)'
                      }}
                    >
                      Capture
                    </Button>
                  </Box>
                  
                  <canvas ref={canvasRef} style={{ display: 'none' }} />
                </Box>
              )}
            </Box>
          )}

          {image && (
            <Box sx={{ 
              mt: 3, 
              p: 2, 
              borderRadius: 2,
              boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
              bgcolor: '#f9fafb'
            }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 500 }}>Preview</Typography>
              <Box sx={{ 
                position: 'relative',
                mt: 1,
                mb: 2,
                display: 'inline-block',
                maxWidth: '100%'
              }}>
                <img 
                  src={image} 
                  alt="Preview" 
                  style={{ 
                    maxWidth: '100%', 
                    maxHeight: 300, 
                    objectFit: "contain",
                    borderRadius: 8,
                    border: '1px solid #ddd'
                  }} 
                />
                <IconButton 
                  sx={{ 
                    position: 'absolute',
                    top: -16,
                    right: -16,
                    bgcolor: 'error.main',
                    color: 'white',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
                    '&:hover': {
                      bgcolor: 'error.dark'
                    }
                  }}
                  size="small"
                  onClick={resetAll}
                >
                  <Close />
                </IconButton>
              </Box>
              
              {!analyzing && !results && (
                <Button 
                  variant="contained" 
                  color="primary" 
                  startIcon={<Analytics />}
                  onClick={analyzeImage}
                  size="large"
                  sx={{ 
                    mt: 1,
                    textTransform: 'none',
                    borderRadius: 2,
                    boxShadow: '0 4px 10px rgba(25,118,210,0.3)'
                  }}
                >
                  Analyze Image
                </Button>
              )}
              
              {analyzing && (
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  mt: 2,
                  p: 3
                }}>
                  <CircularProgress size={48} color="primary" />
                  <Typography variant="body1" sx={{ mt: 2, fontWeight: 500 }}>
                    Processing image with AI...
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                    Detecting objects, extracting text, and analyzing content
                  </Typography>
                </Box>
              )}
            </Box>
          )}
          
          {results && (
            <Box sx={{ 
              mt: 3, 
              p: 3, 
              border: '1px solid #e0e0e0', 
              borderRadius: 2, 
              bgcolor: '#fafafa',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.03)'
            }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 500, color: '#1976d2' }}>
                Analysis Results
              </Typography>
              
              <Paper elevation={0} sx={{ p: 2, mb: 3, bgcolor: 'white', borderRadius: 2, boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                <Typography variant="subtitle2" gutterBottom sx={{ color: 'text.secondary' }}>
                  Detected Elements
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  {results.detectedObjects.map((obj, index) => (
                    <Chip 
                      key={index} 
                      label={obj} 
                      color="primary" 
                      variant="outlined"
                      sx={{ borderRadius: 1 }}
                    />
                  ))}
                </Box>
                
                <Typography variant="subtitle2" gutterBottom sx={{ color: 'text.secondary', mt: 2 }}>
                  Document Type
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {results.documentType}
                </Typography>
                
                <Typography variant="subtitle2" gutterBottom sx={{ color: 'text.secondary', mt: 2 }}>
                  Confidence Score
                </Typography>
                <Box sx={{ 
                  position: 'relative', 
                  height: 8, 
                  bgcolor: '#e0e0e0', 
                  borderRadius: 4,
                  mb: 1
                }}>
                  <Box sx={{ 
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: `${results.confidence * 100}%`,
                    bgcolor: results.confidence > 0.7 ? '#1976d2' : results.confidence > 0.4 ? '#ff9800' : '#f44336',
                    borderRadius: 4
                  }} />
                </Box>
                <Typography variant="body2" gutterBottom>
                  {(results.confidence * 100).toFixed(1)}% - {
                    results.confidence > 0.7 ? 'High confidence' : 
                    results.confidence > 0.4 ? 'Medium confidence' : 'Low confidence'
                  }
                </Typography>
              </Paper>
              
              <Paper elevation={0} sx={{ p: 2, mb: 3, bgcolor: 'white', borderRadius: 2, boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                    Extracted Text
                  </Typography>
                  <Tooltip title="Copy Text">
                    <IconButton size="small" onClick={copyTextToClipboard} color="primary">
                      <ContentCopy fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
                <TextField
                  multiline
                  rows={4}
                  value={results.extractedText}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  InputProps={{
                    readOnly: true,
                    sx: { fontSize: '0.95rem' }
                  }}
                />
              </Paper>
              
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                mt: 3,
                gap: 2
              }}>
                <Button 
                  variant="outlined" 
                  startIcon={<Refresh />}
                  onClick={resetAll}
                  sx={{ textTransform: 'none' }}
                >
                  New Scan
                </Button>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button 
                    variant="outlined" 
                    color="primary"
                    startIcon={<Download />}
                    onClick={downloadResults}
                    sx={{ textTransform: 'none' }}
                  >
                    Download
                  </Button>
                  <Button 
                    variant="contained" 
                    color="primary"
                    startIcon={<Save />}
                    sx={{ 
                      textTransform: 'none',
                      boxShadow: '0 4px 10px rgba(25,118,210,0.2)'
                    }}
                  >
                    Save Results
                  </Button>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </Paper>
      
      {/* Error and success messages */}
      <Snackbar 
        open={!!errorMessage} 
        autoHideDuration={6000} 
        onClose={() => setErrorMessage("")}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert onClose={() => setErrorMessage("")} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
      
      <Snackbar 
        open={!!successMessage} 
        autoHideDuration={3000} 
        onClose={() => setSuccessMessage("")}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert onClose={() => setSuccessMessage("")} severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AIPoweredScanner;