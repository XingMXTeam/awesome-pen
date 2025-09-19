import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { X, Star, CheckCircle, AlertCircle, BarChart3 } from 'lucide-react'
import { CorrectionResult, formatScore, formatStatistic } from '@/services/aiCorrectionService'

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
  max-width: 500px;
  max-height: 80vh;
  overflow: hidden;
  position: relative;
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

const Content = styled.div`
  padding: 24px;
  overflow-y: auto;
  max-height: calc(80vh - 48px);
`

const Section = styled.div`
  margin-bottom: 24px;
  
  &:last-child {
    margin-bottom: 0;
  }
`

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 12px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`

const ScoreContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 16px;
`

const ScoreItem = styled.div`
  background: #f8fafc;
  border-radius: 12px;
  padding: 16px;
  text-align: center;
`

const ScoreValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #3b82f6;
  margin-bottom: 4px;
`

const ScoreLabel = styled.div`
  font-size: 12px;
  color: #6b7280;
  font-weight: 500;
`

const Comment = styled.div`
  background: #f0f9ff;
  border: 1px solid #bae6fd;
  border-radius: 12px;
  padding: 16px;
  font-size: 14px;
  line-height: 1.6;
  color: #0c4a6e;
`

const ComparisonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`

const TextBox = styled.div`
  background: #f8fafc;
  border-radius: 12px;
  padding: 16px;
  border: 1px solid #e2e8f0;
`

const TextTitle = styled.h4`
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin: 0 0 8px 0;
`

const TextContent = styled.div`
  font-size: 13px;
  line-height: 1.5;
  color: #4b5563;
  white-space: pre-wrap;
`

const HighlightsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

const HighlightItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 8px 0;
  border-bottom: 1px solid #f1f5f9;
  
  &:last-child {
    border-bottom: none;
  }
`

const HighlightIcon = styled.div`
  width: 20px;
  height: 20px;
  background: #10b981;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 2px;
`

const HighlightText = styled.div`
  font-size: 14px;
  line-height: 1.5;
  color: #374151;
`

const StatisticContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`

const StatisticItem = styled.div`
  background: #f8fafc;
  border-radius: 12px;
  padding: 16px;
  text-align: center;
`

const StatisticValue = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #059669;
  margin-bottom: 4px;
`

const StatisticLabel = styled.div`
  font-size: 12px;
  color: #6b7280;
  font-weight: 500;
`

interface CorrectionResultProps {
  result: CorrectionResult
  onClose: () => void
}

const CorrectionResultModal: React.FC<CorrectionResultProps> = ({ result, onClose }) => {
  const score = formatScore(result.score)
  const statistic = formatStatistic(result.statistic)

  return (
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

        <Content>
          {/* 综合评分 */}
          <Section>
            <SectionTitle>
              <BarChart3 size={20} />
              综合评分
            </SectionTitle>
            <ScoreContainer>
              <ScoreItem>
                <ScoreValue>{score.average}</ScoreValue>
                <ScoreLabel>平均分</ScoreLabel>
              </ScoreItem>
              <ScoreItem>
                <ScoreValue>{score.total}</ScoreValue>
                <ScoreLabel>总分</ScoreLabel>
              </ScoreItem>
            </ScoreContainer>
            <Comment>{score.comment}</Comment>
          </Section>

          {/* 详细评分 */}
          <Section>
            <SectionTitle>
              <Star size={20} />
              详细评分
            </SectionTitle>
            <ScoreContainer>
              <ScoreItem>
                <ScoreValue>{score.breakdown.language}</ScoreValue>
                <ScoreLabel>语言表达</ScoreLabel>
              </ScoreItem>
              <ScoreItem>
                <ScoreValue>{score.breakdown.structure}</ScoreValue>
                <ScoreLabel>结构组织</ScoreLabel>
              </ScoreItem>
              <ScoreItem>
                <ScoreValue>{score.breakdown.content}</ScoreValue>
                <ScoreLabel>内容质量</ScoreLabel>
              </ScoreItem>
              <ScoreItem>
                <ScoreValue>{score.breakdown.creativity}</ScoreValue>
                <ScoreLabel>创新思维</ScoreLabel>
              </ScoreItem>
            </ScoreContainer>
          </Section>

          {/* 一键润色对比 */}
          <Section>
            <SectionTitle>
              <CheckCircle size={20} />
              一键润色对比
            </SectionTitle>
            <ComparisonContainer>
              <TextBox>
                <TextTitle>原文</TextTitle>
                <TextContent>{result.polish.origin.content}</TextContent>
              </TextBox>
              <TextBox>
                <TextTitle>润色后</TextTitle>
                <TextContent>{result.polish.polish.content}</TextContent>
              </TextBox>
            </ComparisonContainer>
          </Section>

          {/* 亮点挖掘 */}
          <Section>
            <SectionTitle>
              <AlertCircle size={20} />
              亮点挖掘
            </SectionTitle>
            <HighlightsList>
              {result.higglights.highlights.map((highlight, index) => (
                <HighlightItem key={index}>
                  <HighlightIcon>
                    <CheckCircle size={12} color="white" />
                  </HighlightIcon>
                  <HighlightText>{highlight}</HighlightText>
                </HighlightItem>
              ))}
            </HighlightsList>
          </Section>

          {/* 数据统计 */}
          <Section>
            <SectionTitle>
              <BarChart3 size={20} />
              数据统计
            </SectionTitle>
            <StatisticContainer>
              <StatisticItem>
                <StatisticValue>{statistic.wordCount}</StatisticValue>
                <StatisticLabel>字数统计</StatisticLabel>
              </StatisticItem>
              <StatisticItem>
                <StatisticValue>{statistic.relevance}</StatisticValue>
                <StatisticLabel>主题相关度</StatisticLabel>
              </StatisticItem>
            </StatisticContainer>
          </Section>
        </Content>
      </ModalContent>
    </ModalOverlay>
  )
}

export default CorrectionResultModal
