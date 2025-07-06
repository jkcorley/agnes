"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Camera, Flashlight, X, Settings, Scan } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductResultsModal } from "@/components/product-results-modal"
import { BrowserMultiFormatReader } from "@zxing/library"

export function ScannerPage() {
  const [isScanning, setIsScanning] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [flashOn, setFlashOn] = useState(false)
  const [scannedCode, setScannedCode] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [isCameraActive, setIsCameraActive] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)
  const codeReader = useRef<BrowserMultiFormatReader | null>(null)
  const streamRef = useRef<MediaStream | null>(null)

  useEffect(() => {
    codeReader.current = new BrowserMultiFormatReader()
    return () => {
      stopCamera()
      if (codeReader.current) {
        codeReader.current.reset()
      }
    }
  }, [])

  const startCamera = useCallback(async () => {
    try {
      setError("")
      const constraints = {
        video: {
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      }
      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints)
      streamRef.current = mediaStream
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
        videoRef.current.play()
        setIsCameraActive(true)
      }
    } catch (error) {
      setError("Camera access denied or unavailable.")
    }
  }, [])

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
    setIsCameraActive(false)
  }, [])

  const startScanning = useCallback(async () => {
    if (!codeReader.current || !videoRef.current) return
    setIsScanning(true)
    setError("")
    try {
      const scanInterval = setInterval(async () => {
        try {
          const result = await codeReader.current!.decodeFromVideoElement(videoRef.current!)
          if (result) {
            const code = result.getText()
            setScannedCode(code)
            setIsScanning(false)
            setShowResults(true)
            clearInterval(scanInterval)
            codeReader.current?.reset()
          }
        } catch (error: any) {
          if (error.name !== 'NotFoundException') {
            setError("Scanning error. Please try again.")
            setIsScanning(false)
            clearInterval(scanInterval)
          }
        }
      }, 500)
      setTimeout(() => {
        if (isScanning) {
          clearInterval(scanInterval)
          setIsScanning(false)
          setError("No barcode found. Try again.")
        }
      }, 10000)
    } catch (error) {
      setError("Failed to start scanning")
      setIsScanning(false)
    }
  }, [isScanning])

  const stopScanning = useCallback(() => {
    if (codeReader.current) {
      codeReader.current.reset()
    }
    setIsScanning(false)
  }, [])

  const toggleFlash = async () => {
    if (!streamRef.current) return
    try {
      const track = streamRef.current.getVideoTracks()[0]
      const capabilities = track.getCapabilities()
      if ('torch' in capabilities) {
        await track.applyConstraints({
          advanced: [{ torch: !flashOn } as any]
        })
        setFlashOn(!flashOn)
      }
    } catch (error) {}
  }

  const handleScanButton = () => {
    if (!isCameraActive) {
      startCamera()
    } else if (!isScanning) {
      startScanning()
    } else {
      stopScanning()
    }
  }

  // Height offset for bottom nav (adjust if your nav is taller)
  const bottomNavHeight = 72

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-[#fbe4e5] via-[#fbe7b2] to-[#e7c585] flex flex-col items-center justify-center overflow-hidden">
      {/* Camera Preview as background */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="fixed inset-0 w-full h-full object-cover z-0"
        style={{ background: '#222' }}
      />

      {/* Header */}
      <div className="fixed top-0 left-0 w-full flex items-center justify-between px-4 py-3 z-20 bg-black/60 backdrop-blur-md">
        <Button variant="ghost" size="icon" className="text-white" onClick={() => window.history.back()}>
          <X className="w-6 h-6" />
        </Button>
        <span className="text-base font-semibold text-white tracking-wide">Scan item</span>
        <Button variant="ghost" size="icon" className="text-white" onClick={() => alert('Settings coming soon!')}>
          <Settings className="w-6 h-6" />
        </Button>
      </div>

      {/* Instructions */}
      <div className="fixed top-14 left-0 w-full flex justify-center z-20">
        <span className="text-white font-semibold text-base shadow-lg px-4 py-1 rounded-full bg-black/70">
          Place item inside the frame. Please keep your device steady.
        </span>
      </div>

      {/* Scanning Frame */}
      <div className="absolute top-1/4 left-1/2 z-20" style={{ transform: 'translate(-50%, 0)' }}>
        <div className="relative w-[80vw] max-w-xs aspect-[1/1.1] rounded-2xl border-4 border-white/90 bg-black/30 flex items-center justify-center shadow-2xl">
          {/* Corner accents */}
          <div className="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-2xl" />
          <div className="absolute -top-1 -right-1 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-2xl" />
          <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-2xl" />
          <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-2xl" />
        </div>
      </div>

      {/* Status/Error Message */}
      <div className="fixed left-0 w-full flex justify-center z-30" style={{ top: 'calc(60vh + 10vw)' }}>
        {error ? (
          <div className="flex items-center gap-2 text-red-400 text-lg font-bold bg-black/80 px-4 py-2 rounded-full shadow-xl"><span>{error}</span></div>
        ) : (
          <span className="text-white text-lg font-bold bg-black/80 px-4 py-2 rounded-full shadow-xl">
            {!isCameraActive ? "Camera not active" : isScanning ? "Scanning..." : "Ready to scan"}
          </span>
        )}
      </div>

      {/* Bottom Controls (above nav) */}
      <div
        className="fixed left-0 w-full flex flex-col items-center z-30"
        style={{ bottom: `${bottomNavHeight + 12}px` }}
      >
        <div className="flex items-center justify-center gap-4">
          {/* Flash button */}
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-black/70 text-white border border-white/30 shadow-lg"
            onClick={toggleFlash}
            aria-label="Toggle Flash"
          >
            <Flashlight className={`w-7 h-7 ${flashOn ? 'text-yellow-300' : ''}`} />
          </Button>
          {/* Main scan button */}
          <Button
            onClick={handleScanButton}
            className="w-20 h-20 rounded-full bg-indigo-500 hover:bg-indigo-600 text-white shadow-2xl flex items-center justify-center border-4 border-white text-3xl font-bold"
            style={{ fontSize: 28 }}
            aria-label={isScanning ? 'Stop scanning' : isCameraActive ? 'Start scanning' : 'Start camera'}
          >
            <Scan className="w-10 h-10" />
          </Button>
        </div>
        <div className="mt-2 text-white text-base font-semibold drop-shadow">
          {isCameraActive ? <span><Camera className="inline w-5 h-5 mr-1" />Camera Active</span> : <span>Camera Inactive</span>}
        </div>
      </div>

      {/* Results Modal */}
      {showResults && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md mx-auto">
            <ProductResultsModal
              isOpen={showResults}
              onClose={() => {
                setShowResults(false)
                setScannedCode("")
              }}
              scannedCode={scannedCode}
            />
          </div>
        </div>
      )}
    </div>
  )
}

