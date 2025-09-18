import React from 'react'
import styled from 'styled-components'

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  padding-top: env(safe-area-inset-top);
`

const Title = styled.h1`
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
`

interface HeaderProps {
  title?: string
}

const Header: React.FC<HeaderProps> = ({ title = 'Awesome Pen' }) => {
  return (
    <HeaderContainer>
      <Title>{title}</Title>
    </HeaderContainer>
  )
}

export default Header
