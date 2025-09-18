import React, { useEffect } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react'

const ToastContainer = styled(motion.div)<{ $type: 'success' | 'error' | 'warning' }>`
  position: fixed;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  border-radius: 12px;
  padding: 16px 20px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  z-index: 3000;
  display: flex;
  align-items: center;
  gap: 12px;
  max-width: 90vw;
  min-width: 280px;
  border-left: 4px solid ${props => {
    switch (props.$type) {
      case 'success': return '#10b981'
      case 'error': return '#ef4444'
      case 'warning': return '#f59e0b'
      default: return '#6b7280'
    }
  }};
`

const IconContainer = styled.div<{ $type: 'success' | 'error' | 'warning' }>`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => {
    switch (props.$type) {
      case 'success': return '#10b981'
      case 'error': return '#ef4444'
      case 'warning': return '#f59e0b'
      default: return '#6b7280'
    }
  }};
`

const Message = styled.div`
  flex: 1;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  line-height: 1.4;
`

interface ToastProps {
  message: string
  type: 'success' | 'error' | 'warning'
  duration?: number
  onClose: () => void
}

const Toast: React.FC<ToastProps> = ({ message, type, duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [duration, onClose])

  const getIcon = () => {
    switch (type) {
      case 'success': return <CheckCircle size={20} />
      case 'error': return <XCircle size={20} />
      case 'warning': return <AlertCircle size={20} />
      default: return <AlertCircle size={20} />
    }
  }

  return (
    <AnimatePresence>
      <ToastContainer
        $type={type}
        initial={{ opacity: 0, y: -50, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -50, scale: 0.8 }}
        transition={{ duration: 0.3 }}
      >
        <IconContainer $type={type}>
          {getIcon()}
        </IconContainer>
        <Message>{message}</Message>
      </ToastContainer>
    </AnimatePresence>
  )
}

export default Toast
