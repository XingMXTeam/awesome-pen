import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Zap, Clock, Sparkles } from 'lucide-react'
import { useAppStore } from '@/store/appStore'

const WelcomeContainer = styled.section`
  padding: 24px 20px;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  position: relative;
  overflow: hidden;
`

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
`

const Title = styled(motion.h1)`
  font-size: 24px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 8px 0;
  text-align: center;
`

const Subtitle = styled(motion.p)`
  font-size: 16px;
  color: #6b7280;
  margin: 0 0 24px 0;
  text-align: center;
  line-height: 1.5;
`

const IllustrationContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
`

const Illustration = styled.div`
  width: 200px;
  height: 120px;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`

const ChildrenIllustration = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`

const Child = styled.div<{ $color: string }>`
  width: 40px;
  height: 50px;
  background: ${props => props.$color};
  border-radius: 8px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 8px;
    left: 50%;
    transform: translateX(-50%);
    width: 20px;
    height: 20px;
    background: #fbbf24;
    border-radius: 50%;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 8px;
    left: 50%;
    transform: translateX(-50%);
    width: 30px;
    height: 20px;
    background: #ef4444;
    border-radius: 4px;
  }
`

const Book = styled.div<{ $color: string }>`
  width: 20px;
  height: 30px;
  background: ${props => props.$color};
  border-radius: 2px;
  position: absolute;
  top: 15px;
  right: -8px;
`

const StatsContainer = styled(motion.div)`
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
`

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

const StatIcon = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3b82f6;
`

const StatText = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #374151;
`

const SparkleIcon = styled(motion.div)`
  position: absolute;
  top: 20px;
  right: 20px;
  color: #fbbf24;
  z-index: 3;
`

const WelcomeSection: React.FC = () => {
  const { user } = useAppStore()

  return (
    <WelcomeContainer>
      <SparkleIcon
        animate={{ 
          rotate: [0, 10, -10, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <Sparkles size={24} />
      </SparkleIcon>
      
      <ContentWrapper>
        <Title
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          欢迎使用妙笔小伙伴
        </Title>
        
        <Subtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          AI 助你写出好作文
        </Subtitle>

        <IllustrationContainer
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Illustration>
            <ChildrenIllustration>
              <Child $color="#3b82f6">
                <Book $color="#10b981" />
              </Child>
              <Child $color="#ef4444">
                <Book $color="#3b82f6" />
              </Child>
            </ChildrenIllustration>
          </Illustration>
        </IllustrationContainer>

        <StatsContainer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <StatItem>
            <StatIcon>
              <Zap size={16} />
            </StatIcon>
            <StatText>今日剩余{user.remainingCount}次</StatText>
          </StatItem>
          
          <StatItem>
            <StatIcon>
              <Clock size={16} />
            </StatIcon>
            <StatText>智能批改仅需3秒</StatText>
          </StatItem>
        </StatsContainer>
      </ContentWrapper>
    </WelcomeContainer>
  )
}

export default WelcomeSection
