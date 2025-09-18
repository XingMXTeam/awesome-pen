import React from 'react'
import styled from 'styled-components'

const CardContainer = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  }
`

const CardHeader = styled.div`
  padding: 20px 20px 0;
`

const CardContent = styled.div`
  padding: 20px;
`

const CardFooter = styled.div`
  padding: 0 20px 20px;
`

interface CardProps {
  children: React.ReactNode
  className?: string
}

interface CardSubComponents {
  Header: React.FC<{ children: React.ReactNode }>
  Content: React.FC<{ children: React.ReactNode }>
  Footer: React.FC<{ children: React.ReactNode }>
}

const Card: React.FC<CardProps> & CardSubComponents = ({ children, className }) => {
  return (
    <CardContainer className={className}>
      {children}
    </CardContainer>
  )
}

Card.Header = ({ children }) => <CardHeader>{children}</CardHeader>
Card.Content = ({ children }) => <CardContent>{children}</CardContent>
Card.Footer = ({ children }) => <CardFooter>{children}</CardFooter>

export default Card
