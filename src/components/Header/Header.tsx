import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { PenTool, ChevronDown } from 'lucide-react'
import { useAppStore } from '@/store/appStore'

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const AppTitle = styled.h1`
  font-size: 18px;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
`

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

const DropdownContainer = styled.div`
  position: relative;
`

const DropdownButton = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 20px;
  background: #f3f4f6;
  transition: all 0.2s ease;
  min-width: 60px;
  justify-content: center;

  &:hover {
    background: #e5e7eb;
  }
`

const DropdownText = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #374151;
`

const ChevronIcon = styled(ChevronDown)<{ $isOpen?: boolean }>`
  width: 16px;
  height: 16px;
  color: #6b7280;
  transform: ${props => props.$isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
  transition: transform 0.2s ease;
`

const DropdownMenu = styled(motion.div)`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  border: 1px solid #e5e7eb;
  overflow: hidden;
  z-index: 1001;
  min-width: 120px;
  margin-top: 4px;
`

const DropdownItem = styled.div`
  padding: 12px 16px;
  cursor: pointer;
  font-size: 14px;
  color: #374151;
  transition: background-color 0.2s ease;

  &:hover {
    background: #f3f4f6;
  }

  &:first-child {
    border-radius: 12px 12px 0 0;
  }

  &:last-child {
    border-radius: 0 0 12px 12px;
  }
`

const Header: React.FC = () => {
  const { user, setUserRole } = useAppStore()
  const [isRoleOpen, setIsRoleOpen] = useState(false)
  const [isGradeOpen, setIsGradeOpen] = useState(false)
  const [selectedGrade, setSelectedGrade] = useState('三年级')
  
  const roleRef = useRef<HTMLDivElement>(null)
  const gradeRef = useRef<HTMLDivElement>(null)

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (roleRef.current && !roleRef.current.contains(event.target as Node)) {
        setIsRoleOpen(false)
      }
      if (gradeRef.current && !gradeRef.current.contains(event.target as Node)) {
        setIsGradeOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const roles = [
    { value: 'student', label: '学生' },
    { value: 'teacher', label: '老师' },
    { value: 'parent', label: '家长' }
  ]

  const grades = [
    '一年级', '二年级', '三年级', '四年级', 
    '五年级', '六年级', '初一', '初二', '初三',
    '高一', '高二', '高三'
  ]

  const handleRoleSelect = (role: 'student' | 'teacher' | 'parent') => {
    setUserRole(role)
    setIsRoleOpen(false)
  }

  const handleGradeSelect = (grade: string) => {
    setSelectedGrade(grade)
    setIsGradeOpen(false)
  }

  const getRoleDisplayName = (role: string) => {
    const roleObj = roles.find(r => r.value === role)
    return roleObj ? roleObj.label : '学生'
  }

  return (
    <HeaderContainer>
      <LogoSection>
        <PenTool size={24} color="#000" />
        <AppTitle>妙笔小伙伴</AppTitle>
      </LogoSection>
      
      <RightSection>
        {/* 身份选择 */}
        <DropdownContainer ref={roleRef}>
          <DropdownButton onClick={() => setIsRoleOpen(!isRoleOpen)}>
            <DropdownText>{getRoleDisplayName(user.role)}</DropdownText>
            <ChevronIcon $isOpen={isRoleOpen} />
          </DropdownButton>
          
          <AnimatePresence>
            {isRoleOpen && (
              <DropdownMenu
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {roles.map((role) => (
                  <DropdownItem
                    key={role.value}
                    onClick={() => handleRoleSelect(role.value as 'student' | 'teacher' | 'parent')}
                  >
                    {role.label}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            )}
          </AnimatePresence>
        </DropdownContainer>

        {/* 年级选择 */}
        <DropdownContainer ref={gradeRef}>
          <DropdownButton onClick={() => setIsGradeOpen(!isGradeOpen)}>
            <DropdownText>{selectedGrade}</DropdownText>
            <ChevronIcon $isOpen={isGradeOpen} />
          </DropdownButton>
          
          <AnimatePresence>
            {isGradeOpen && (
              <DropdownMenu
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                style={{ maxHeight: '200px', overflowY: 'auto' }}
              >
                {grades.map((grade) => (
                  <DropdownItem
                    key={grade}
                    onClick={() => handleGradeSelect(grade)}
                  >
                    {grade}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            )}
          </AnimatePresence>
        </DropdownContainer>
      </RightSection>
    </HeaderContainer>
  )
}

export default Header
