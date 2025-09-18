import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Home, FileText, History, Crown } from 'lucide-react'

const NavContainer = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: white;
  border-top: 1px solid #e5e7eb;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0 20px;
`

const NavItem = styled(motion.button)<{ $isActive?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 8px;
  transition: all 0.2s ease;
  color: ${props => props.$isActive ? '#3b82f6' : '#6b7280'};

  &:hover {
    background: #f3f4f6;
  }
`

const NavIcon = styled.div<{ $isActive?: boolean }>`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const NavLabel = styled.span<{ $isActive?: boolean }>`
  font-size: 12px;
  font-weight: ${props => props.$isActive ? '600' : '400'};
  color: ${props => props.$isActive ? '#3b82f6' : '#6b7280'};
`

interface NavItemData {
  id: string
  label: string
  icon: React.ComponentType<any>
  path: string
}

const navItems: NavItemData[] = [
  { id: 'home', label: '首页', icon: Home, path: '/' },
  { id: 'essay', label: '作文', icon: FileText, path: '/essay' },
  { id: 'history', label: '历史批改', icon: History, path: '/history' },
  { id: 'examples', label: '优秀范文', icon: Crown, path: '/examples' }
]

interface BottomNavigationProps {
  currentPath?: string
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ currentPath = '/' }) => {
  return (
    <NavContainer>
      {navItems.map((item) => {
        const isActive = currentPath === item.path
        const IconComponent = item.icon
        
        return (
          <NavItem
            key={item.id}
            $isActive={isActive}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
          >
            <NavIcon $isActive={isActive}>
              <IconComponent size={20} />
            </NavIcon>
            <NavLabel $isActive={isActive}>
              {item.label}
            </NavLabel>
          </NavItem>
        )
      })}
    </NavContainer>
  )
}

export default BottomNavigation
