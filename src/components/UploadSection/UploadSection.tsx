import React, { useState } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Camera, Keyboard } from 'lucide-react'
import CameraModal from '../Camera/CameraModal'
import Toast from '../Toast/Toast'
import CorrectionResultModal from '../CorrectionResult/CorrectionResult'
import { useAppStore, UploadRecord } from '@/store/appStore'
import { CorrectionResult } from '@/services/aiCorrectionService'

const UploadContainer = styled.section`
  padding: 24px 20px;
  background: white;
`

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
`

const AITag = styled.span`
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  color: white;
  font-size: 12px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
`

const SmartRecognition = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #6b7280;
  font-size: 14px;
  font-weight: 500;
`

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`

const UploadCard = styled(motion.div)`
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 16px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  touch-action: manipulation;

  &:hover {
    border-color: #3b82f6;
    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.15);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0) scale(0.98);
    transition: all 0.1s ease;
  }
`

const CardIcon = styled.div`
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  color: white;
`

const CardTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 4px 0;
`

const CardDescription = styled.p`
  font-size: 12px;
  color: #6b7280;
  margin: 0 0 12px 0;
  line-height: 1.4;
`

const CardImage = styled.div<{ $bgColor: string }>`
  width: 100%;
  height: 60px;
  background: ${props => props.$bgColor};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`

const HandIllustration = styled.div`
  width: 30px;
  height: 30px;
  background: #fbbf24;
  border-radius: 50% 50% 50% 0;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 8px;
    left: 8px;
    width: 8px;
    height: 8px;
    background: #374151;
    border-radius: 50%;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 4px;
    right: 4px;
    width: 20px;
    height: 2px;
    background: #374151;
    border-radius: 1px;
  }
`

const TabletIllustration = styled.div`
  width: 40px;
  height: 30px;
  background: #1f2937;
  border-radius: 4px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 4px;
    left: 4px;
    right: 4px;
    height: 20px;
    background: #3b82f6;
    border-radius: 2px;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 4px;
    left: 4px;
    right: 4px;
    height: 2px;
    background: #6b7280;
    border-radius: 1px;
  }
`

const UploadSection: React.FC = () => {
  const [isCameraOpen, setIsCameraOpen] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'warning' } | null>(null)
  const [showCorrectionResult, setShowCorrectionResult] = useState(false)
  const [currentCorrectionResult, setCurrentCorrectionResult] = useState<CorrectionResult | null>(null)
  const { decrementRemainingCount, addUploadRecord, user } = useAppStore()

  const showToast = (message: string, type: 'success' | 'error' | 'warning') => {
    setToast({ message, type })
  }

  const handlePhotoUpload = () => {
    if (user.remainingCount <= 0) {
      showToast('今日使用次数已用完，请明天再来！', 'warning')
      return
    }
    setIsCameraOpen(true)
  }

  const handleTextUpload = () => {
    if (user.remainingCount <= 0) {
      showToast('今日使用次数已用完，请明天再来！', 'warning')
      return
    }
    // TODO: 实现文本输入功能
    showToast('文本输入功能开发中...', 'warning')
  }

  const handlePhotoCapture = (imageData: string, publicUrl?: string, correctionResult?: CorrectionResult) => {
    try {
      // 添加上传记录
      const record: Omit<UploadRecord, 'id' | 'timestamp'> = {
        type: 'photo',
        content: publicUrl || imageData, // 优先使用公开URL
        status: publicUrl ? 'completed' : 'pending',
        ...(correctionResult && { correctionResult }) // 条件性添加批改结果
      }
      addUploadRecord(record)
      
      // 减少剩余次数
      decrementRemainingCount()
      
      if (publicUrl && correctionResult) {
        showToast('AI批改完成！点击查看详细结果', 'success')
        console.log('✅ 完整流程完成:')
        console.log('📷 图片URL:', publicUrl)
        console.log('🤖 AI批改结果:', correctionResult)
        
        // 显示批改结果弹窗
        setCurrentCorrectionResult(correctionResult)
        setShowCorrectionResult(true)
      } else if (publicUrl) {
        showToast('照片上传成功，正在AI批改...', 'success')
        console.log('📷 图片上传成功，URL:', publicUrl)
      } else {
        showToast('照片已保存，正在上传...', 'warning')
      }
    } catch (error) {
      console.error('❌ 处理照片失败:', error)
      showToast('处理失败，请重试', 'error')
    }
  }

  return (
    <UploadContainer>
      <SectionHeader>
        <SectionTitle>
          上传作文
          <AITag>
            <Zap size={12} />
            AI加持
          </AITag>
        </SectionTitle>
        <SmartRecognition>
          <Zap size={14} />
          智能识别
        </SmartRecognition>
      </SectionHeader>

      <CardsContainer>
        <UploadCard
          onClick={handlePhotoUpload}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <CardIcon>
            <Camera size={24} />
          </CardIcon>
          <CardTitle>拍照上传</CardTitle>
          <CardDescription>支持手写体识别</CardDescription>
          <CardImage $bgColor="linear-gradient(135deg, #f3f4f6, #e5e7eb)">
            <HandIllustration />
          </CardImage>
        </UploadCard>

        <UploadCard
          onClick={handleTextUpload}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <CardIcon>
            <Keyboard size={24} />
          </CardIcon>
          <CardTitle>文本输入</CardTitle>
          <CardDescription>支持复制粘贴</CardDescription>
          <CardImage $bgColor="linear-gradient(135deg, #dbeafe, #bfdbfe)">
            <TabletIllustration />
          </CardImage>
        </UploadCard>
      </CardsContainer>

      <CameraModal
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onCapture={handlePhotoCapture}
      />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <AnimatePresence>
        {showCorrectionResult && currentCorrectionResult && (
          <CorrectionResultModal
            result={currentCorrectionResult}
            onClose={() => {
              setShowCorrectionResult(false)
              setCurrentCorrectionResult(null)
            }}
          />
        )}
      </AnimatePresence>
    </UploadContainer>
  )
}

export default UploadSection
