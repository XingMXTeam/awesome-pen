import React from 'react'
import styled from 'styled-components'

const ButtonContainer = styled.button<{ variant?: 'primary' | 'secondary' | 'outline' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 48px;
  
  ${({ variant = 'primary' }) => {
    switch (variant) {
      case 'primary':
        return `
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          color: white;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
          
          &:hover {
            transform: translateY(-1px);
            box-shadow: 0 6px 16px rgba(59, 130, 246, 0.4);
          }
          
          &:active {
            transform: translateY(0);
          }
        `
      case 'secondary':
        return `
          background: #f3f4f6;
          color: #374151;
          
          &:hover {
            background: #e5e7eb;
          }
        `
      case 'outline':
        return `
          background: transparent;
          color: #3b82f6;
          border: 2px solid #3b82f6;
          
          &:hover {
            background: #3b82f6;
            color: white;
          }
        `
    }
  }}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none !important;
  }
`

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, ...props }) => {
  return (
    <ButtonContainer variant={variant} {...props}>
      {children}
    </ButtonContainer>
  )
}

export default Button
