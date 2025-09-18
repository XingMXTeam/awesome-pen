import React from 'react'
import styled from 'styled-components'

const FooterContainer = styled.footer`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding: 20px;
  padding-bottom: calc(20px + env(safe-area-inset-bottom));
  text-align: center;
  margin-top: auto;
`

const FooterText = styled.p`
  font-size: 14px;
  color: #6b7280;
  margin: 0;
  line-height: 1.5;
`

const FooterLink = styled.a`
  color: #3b82f6;
  text-decoration: none;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`

interface FooterProps {
  className?: string
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <FooterContainer className={className}>
      <FooterText>
        © 2024 Awesome Pen. Built with{' '}
        <FooterLink href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">
          React
        </FooterLink>
        {' '}and{' '}
        <FooterLink href="https://vitejs.dev/" target="_blank" rel="noopener noreferrer">
          Vite
        </FooterLink>
      </FooterText>
    </FooterContainer>
  )
}

export default Footer
