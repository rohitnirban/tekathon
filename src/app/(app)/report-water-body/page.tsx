'use client'

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import axios from 'axios'
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface CameraDevice {
  deviceId: string;
  label: string;
}

const ReportWaterBody: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [mobile, setMobile] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('');
  const [image, setImage] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [locationDenied, setLocationDenied] = useState<boolean>(false);
  const [cameraDenied, setCameraDenied] = useState<boolean>(false);
  const [cameras, setCameras] = useState<CameraDevice[]>([]);
  const [selectedCamera, setSelectedCamera] = useState<string | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const fetchCameras = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices
          .filter((device) => device.kind === 'videoinput')
          .map((device, index) => ({
            deviceId: device.deviceId,
            label: device.label || `Camera ${index + 1}`,
          }));
        setCameras(videoDevices);
        if (videoDevices.length > 0) {
          setSelectedCamera(videoDevices[0].deviceId);
        }
      } catch (error) {
        console.error('Error fetching cameras:', error);
        setCameraDenied(true);
      }
    };

    fetchCameras();
  }, []);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error retrieving coordinates:', error);
          setLocationDenied(true);
        }
      );
    }
  }, []);

  const handleStartCamera = async () => {
    if (!selectedCamera) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: selectedCamera },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setIsCameraOpen(true);
    } catch (error) {
      console.error('Error accessing the camera:', error);
      setCameraDenied(true);
    }
  };

  const handleCaptureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        const dataUrl = canvasRef.current.toDataURL('image/png');
        setImage(dataUrl);
        stopCamera();
      }
    }
  };

  const stopCamera = () => {
    const tracks = (videoRef.current?.srcObject as MediaStream)?.getTracks();
    tracks?.forEach(track => track.stop());
    setIsCameraOpen(false);
  };

  const handleRecapture = () => {
    setImage(null);
    handleStartCamera();
  };

  const handleUpload = async () => {
    if (!image) {
      console.error('No image to upload');
      return;
    }

    try {
      // Convert data URL to File object
      const response = await fetch(image);
      const blob = await response.blob();
      const file = new File([blob], 'image.png', { type: 'image/png' });

      // Create a FormData object
      const formData = new FormData();
      formData.append('image', file);

      // Make a POST request to your server endpoint
      const uploadResponse = await axios.post('/api/upload-report-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setUploadedImage(uploadResponse.data.imageUrl);
      console.log('Upload successful:', uploadResponse.data);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleSendReport = async () => {
    if (!uploadedImage || !name || !email || !mobile || !feedback || !coordinates) {
      console.error('All fields are required');
      return;
    }

    try {
      const coordinatesString = `Lat: ${coordinates.latitude.toFixed(6)}, Long: ${coordinates.longitude.toFixed(6)}`;

      // Create a report object
      const reportData = {
        name,
        email,
        mobile,
        feedback,
        imageUrl: uploadedImage,
        coordinates: coordinatesString,
        timestamp: new Date(),
      };

      console.log(reportData);

      // Save to Firestore
      const docRef = await addDoc(collection(db, "waterReports"), reportData);
      console.log("Report saved with ID: ", docRef.id);
    } catch (error) {
      console.error("Error saving report: ", error);
    }
  };

  if (locationDenied) {
    return (
      <div className="max-w-lg mx-auto p-4">
        <h1 className="text-xl font-semibold mb-4">Location Access Required</h1>
        <p>Please enable location access to report a water body.</p>
      </div>
    );
  }

  if (cameraDenied) {
    return (
      <div className="max-w-lg mx-auto p-4">
        <h1 className="text-xl font-semibold mb-4">Camera Access Required</h1>
        <p>Please enable camera access to capture an image of the water body.</p>
      </div>
    );
  }

  if (!coordinates) {
    return (
      <div className="max-w-lg mx-auto p-4">
        <h1 className="text-xl font-semibold mb-4">Retrieving Location...</h1>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto p-4 my-10">
      <h1 className="text-xl font-semibold mb-4">Report a Water Body</h1>

      <div className="mb-4">
        <Label htmlFor="camera-select" className="mb-2 block">Select Camera:</Label>
        <Select onValueChange={(value) => setSelectedCamera(value)} value={selectedCamera || ''}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a camera" />
          </SelectTrigger>
          <SelectContent>
            {cameras.length > 0 ? (
              cameras.map((camera) => (
                <SelectItem
                  key={camera.deviceId}
                  value={camera.deviceId}
                >
                  {camera.label || 'Unnamed Camera'}
                </SelectItem>
              ))
            ) : (
              <SelectItem value="no-camera" disabled>
                No cameras available
              </SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>

      {!image && !isCameraOpen && (
        <Button onClick={handleStartCamera} className="mb-4">Open Camera</Button>
      )}

      <div>
        {image ? (
          <>
            <img src={image} alt="Captured Water Body" className="mt-4 w-full" />
            <div className="mt-4 flex justify-between">
              <Button onClick={handleRecapture}>Recapture Photo</Button>
              <Button onClick={handleUpload}>Upload Image</Button>
            </div>
          </>
        ) : (
          <>
            <video ref={videoRef} className="w-full h-auto" />
            {isCameraOpen && (
              <Button onClick={handleCaptureImage} className="mt-4">Capture Image</Button>
            )}
          </>
        )}
      </div>

      <canvas ref={canvasRef} className="hidden" />

      {uploadedImage && (
        <div className="mt-4">
          <Label>Uploaded Image URL:</Label>
          <Input value={uploadedImage} readOnly />
        </div>
      )}

      <div className="mt-4">
        <Label htmlFor="name">Your Name:</Label>
        <Input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-2"
          required
        />
      </div>

      <div className="mt-4">
        <Label htmlFor="email">Email:</Label>
        <Input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-2"
          required
        />
      </div>

      <div className="mt-4">
        <Label htmlFor="mobile">Mobile Number:</Label>
        <Input
          type="tel"
          id="mobile"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className="mt-2"
          required
        />
      </div>

      <div className="mt-4">
        <Label htmlFor="feedback">Feedback/Observation:</Label>
        <Input
          type="text"
          id="feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className="mt-2"
          required
        />
      </div>

      <div className="mt-4">
        <Label>Coordinates:</Label>
        <Input
          type="text"
          value={`Lat: ${coordinates.latitude.toFixed(6)}, Long: ${coordinates.longitude.toFixed(6)}`}
          readOnly
          className="mt-2"
        />
      </div>

      <Button onClick={handleSendReport} className="mt-6">
        Send Report
      </Button>
    </div>
  );
};

export default ReportWaterBody;
