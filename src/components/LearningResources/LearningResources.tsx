import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { ChevronRight, Headphones, BookOpen, Puzzle, FileText } from 'lucide-react'
import { useAppStore } from '@/store/appStore'

const ResourcesContainer = styled.section`
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
`

const ViewAllLink = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  color: #6b7280;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    color: #3b82f6;
    background: #f3f4f6;
  }
`

const ResourcesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`

const ResourceCard = styled(motion.div)<{ $gradient: string }>`
  background: linear-gradient(135deg, ${props => props.$gradient});
  border-radius: 16px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  touch-action: manipulation;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(-2px) scale(0.98);
    transition: all 0.1s ease;
  }

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }
`

const CardIcon = styled.div`
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  color: white;
  backdrop-filter: blur(10px);
`

const CardTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: white;
  margin: 0 0 4px 0;
`

const CardDescription = styled.p`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  line-height: 1.4;
`

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case 'headphones': return Headphones
    case 'book-open': return BookOpen
    case 'puzzle': return Puzzle
    case 'file-text': return FileText
    default: return BookOpen
  }
}

const getGradientColors = (gradient: string) => {
  const gradientMap: Record<string, string> = {
    'from-blue-400 to-purple-500': '#60a5fa, #a855f7',
    'from-green-400 to-blue-500': '#4ade80, #3b82f6',
    'from-purple-400 to-pink-500': '#c084fc, #ec4899',
    'from-orange-400 to-red-500': '#fb923c, #ef4444'
  }
  return gradientMap[gradient] || '#60a5fa, #a855f7'
}

const LearningResources: React.FC = () => {
  const { learningResources } = useAppStore()

  const handleViewAll = () => {
    // TODO: 跳转到学习资料列表页
    console.log('查看全部学习资料')
  }

  const handleResourceClick = (resourceId: string) => {
    // TODO: 跳转到具体的学习资料页面
    console.log('点击学习资料:', resourceId)
  }

  return (
    <ResourcesContainer>
      <SectionHeader>
        <SectionTitle>英语学习资料</SectionTitle>
        <ViewAllLink onClick={handleViewAll}>
          查看全部
          <ChevronRight size={16} />
        </ViewAllLink>
      </SectionHeader>

      <ResourcesGrid>
        {learningResources.map((resource, index) => {
          const IconComponent = getIconComponent(resource.icon)
          const gradientColors = getGradientColors(resource.gradient)
          
          return (
            <ResourceCard
              key={resource.id}
              $gradient={gradientColors}
              onClick={() => handleResourceClick(resource.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <CardIcon>
                <IconComponent size={24} />
              </CardIcon>
              <CardTitle>{resource.title}</CardTitle>
              <CardDescription>{resource.description}</CardDescription>
            </ResourceCard>
          )
        })}
      </ResourcesGrid>
    </ResourcesContainer>
  )
}

export default LearningResources
