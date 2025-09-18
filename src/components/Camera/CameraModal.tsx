import React, { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Camera, RotateCcw, Upload } from 'lucide-react'
import { uploadImageToImgBB, generateFileName } from '@/services/uploadService'

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`

const ModalContent = styled(motion.div)`
  background: white;
  border-radius: 20px;
  width: 100%;
  max-width: 400px;
  max-height: 80vh;
  overflow: hidden;
  position: relative;
`

const CameraContainer = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const Canvas = styled.canvas`
  display: none;
`

const ControlsContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const ButtonRow = styled.div`
  display: flex;
  gap: 12px;
`

const ControlButton = styled(motion.button)<{ $variant?: 'primary' | 'secondary' | 'danger' }>`
  flex: 1;
  height: 48px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s ease;

  ${props => {
    switch (props.$variant) {
      case 'primary':
        return `
          background: #3b82f6;
          color: white;
          &:hover {
            background: #2563eb;
          }
        `
      case 'danger':
        return `
          background: #ef4444;
          color: white;
          &:hover {
            background: #dc2626;
          }
        `
      default:
        return `
          background: #f3f4f6;
          color: #374151;
          &:hover {
            background: #e5e7eb;
          }
        `
    }
  }}
`

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 40px;
  height: 40px;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }
`

const ErrorMessage = styled.div`
  padding: 16px;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
  color: #dc2626;
  font-size: 14px;
  text-align: center;
`

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #f3f4f6;
  border-top: 4px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`

const UploadProgressContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 20px;
  color: white;
`

const UploadIcon = styled.div`
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: pulse 2s infinite;
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }
`

const ProgressText = styled.div`
  font-size: 16px;
  font-weight: 500;
  text-align: center;
`

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  overflow: hidden;
`

const ProgressFill = styled.div<{ $progress: number }>`
  height: 100%;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  width: ${props => props.$progress}%;
  transition: width 0.3s ease;
  border-radius: 4px;
`

const ProgressPercent = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
`

const RetryButton = styled.button`
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 8px;
  transition: background-color 0.2s ease;

  &:hover {
    background: #dc2626;
  }
`

interface CameraModalProps {
  isOpen: boolean
  onClose: () => void
  onCapture: (imageData: string, publicUrl?: string) => void
}

const CameraModal: React.FC<CameraModalProps> = ({ isOpen, onClose, onCapture }) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  
  const [isLoading, setIsLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment')
  const [capturedImage, setCapturedImage] = useState<string | null>(null)

  const startCamera = async () => {
    try {
      setIsLoading(true)
      setError(null)

      // 停止之前的流
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop())
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      })

      streamRef.current = stream
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    } catch (err) {
      console.error('Camera error:', err)
      setError('无法访问相机，请检查权限设置')
    } finally {
      setIsLoading(false)
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
  }

  const capturePhoto = async () => {
    if (!videoRef.current || !canvasRef.current) return

    const video = videoRef.current
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    if (!context) return

    // 设置canvas尺寸
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    // 绘制视频帧到canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height)

    // 转换为base64
    const imageData = canvas.toDataURL('image/jpeg', 0.8)
    setCapturedImage(imageData)
    
    // 开始上传
    await uploadPhoto(imageData)
  }

  const uploadPhoto = async (imageData: string) => {
    try {
      setIsUploading(true)
      setUploadProgress(0)
      setError(null)

      // 模拟上传进度
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return prev
          }
          return prev + Math.random() * 20
        })
      }, 200)

      // 生成文件名
      const fileName = generateFileName('essay_photo')
      
      // 上传到ImgBB
      const result = await uploadImageToImgBB(imageData, fileName)
      
      clearInterval(progressInterval)
      setUploadProgress(100)

      if (result.success && result.url) {
        // 上传成功，调用回调函数
        onCapture(imageData, result.url)
        
        // 显示成功状态
        setTimeout(() => {
          onClose()
        }, 1000)
      } else {
        throw new Error(result.error || '上传失败')
      }
    } catch (error) {
      console.error('Upload error:', error)
      setError(error instanceof Error ? error.message : '上传失败')
    } finally {
      setIsUploading(false)
    }
  }

  const retryUpload = () => {
    if (capturedImage) {
      uploadPhoto(capturedImage)
    }
  }

  const switchCamera = () => {
    setFacingMode(prev => prev === 'user' ? 'environment' : 'user')
  }

  useEffect(() => {
    if (isOpen) {
      startCamera()
    } else {
      stopCamera()
    }

    return () => {
      stopCamera()
    }
  }, [isOpen, facingMode])

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <ModalContent
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <CloseButton
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={20} />
            </CloseButton>

            <CameraContainer>
              {isLoading ? (
                <LoadingSpinner />
              ) : isUploading ? (
                <UploadProgressContainer>
                  <UploadIcon>
                    <Upload size={40} />
                  </UploadIcon>
                  <ProgressText>正在上传图片...</ProgressText>
                  <ProgressBar>
                    <ProgressFill $progress={uploadProgress} />
                  </ProgressBar>
                  <ProgressPercent>{Math.round(uploadProgress)}%</ProgressPercent>
                </UploadProgressContainer>
              ) : (
                <Video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                />
              )}
              <Canvas ref={canvasRef} />
            </CameraContainer>

            <ControlsContainer>
              {error && (
                <ErrorMessage>
                  {error}
                  {capturedImage && (
                    <RetryButton onClick={retryUpload}>
                      重试上传
                    </RetryButton>
                  )}
                </ErrorMessage>
              )}

              {!isUploading && (
                <ButtonRow>
                  <ControlButton
                    $variant="secondary"
                    onClick={switchCamera}
                    disabled={isLoading}
                  >
                    <RotateCcw size={20} />
                    切换摄像头
                  </ControlButton>
                  
                  <ControlButton
                    $variant="primary"
                    onClick={capturePhoto}
                    disabled={isLoading || !!error}
                  >
                    <Camera size={20} />
                    拍照
                  </ControlButton>
                </ButtonRow>
              )}

              <ControlButton
                $variant="danger"
                onClick={onClose}
                disabled={isUploading}
              >
                {isUploading ? '上传中...' : '取消'}
              </ControlButton>
            </ControlsContainer>
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  )
}

export default CameraModal
