import React, { useEffect } from 'react'
import styled from 'styled-components'
import { 
  Header, 
  BottomNavigation, 
  WelcomeSection, 
  UploadSection, 
  LearningResources 
} from '@/components'
import { useAppStore } from '@/store/appStore'

const PageContainer = styled.div`
  min-height: 100vh;
  background: #f8fafc;
  padding-bottom: 80px; /* 为底部导航留出空间 */
`

const ContentWrapper = styled.div`
   /*  padding-top: 60px; 为固定头部留出空间 */
`

const Home: React.FC = () => {
  const { resetDailyCount } = useAppStore()

  // 检查是否需要重置每日次数
  useEffect(() => {
    resetDailyCount()
  }, [resetDailyCount])

  return (
    <PageContainer>
      <Header />
      
      <ContentWrapper>
        <WelcomeSection />
        <UploadSection />
        <LearningResources />
      </ContentWrapper>
      
      <BottomNavigation currentPath="/" />
    </PageContainer>
  )
}

export default Home
