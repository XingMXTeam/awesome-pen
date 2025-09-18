import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import styled, { createGlobalStyle } from 'styled-components'
import { Header } from '@/components'
import Home from '@/pages/Home'

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: transparent;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #f8fafc;
    color: #1f2937;
    line-height: 1.6;
    overflow-x: hidden;
  }

  #root {
    min-height: 100vh;
    position: relative;
  }

  /* 移动端适配 */
  @media (max-width: 768px) {
    html {
      font-size: 14px;
    }
  }

  /* 防止iOS Safari的橡皮筋效果 */
  body {
    position: fixed;
    width: 100%;
    height: 100%;
    overflow: hidden;
    -webkit-overflow-scrolling: touch;
  }

  #root {
    height: 100%;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    overscroll-behavior: contain;
  }

  /* 优化触摸体验 */
  * {
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  /* 允许输入框选择文本 */
  input, textarea {
    -webkit-user-select: text;
    -khtml-user-select: text;
    -moz-user-select: text;
    -ms-user-select: text;
    user-select: text;
  }
`

const AppContainer = styled.div`
  min-height: 100vh;
  position: relative;
`

const MainContent = styled.main`
  padding-top: 60px;
  min-height: calc(100vh - 60px);
`

const App: React.FC = () => {
  return (
    <Router>
      <GlobalStyle />
      <AppContainer>
        <Header />
        <MainContent>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </MainContent>
      </AppContainer>
    </Router>
  )
}

export default App
