import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface LearningResource {
  id: string
  title: string
  description: string
  icon: string
  gradient: string
  type: 'listening' | 'vocabulary' | 'grammar' | 'exam'
}

export interface UploadRecord {
  id: string
  type: 'photo' | 'text'
  content: string
  timestamp: number
  status: 'pending' | 'processing' | 'completed' | 'failed'
}

export interface AppState {
  // 用户信息
  user: {
    role: 'student' | 'teacher' | 'parent'
    remainingCount: number
    lastResetDate: string
  }
  
  // 学习资料
  learningResources: LearningResource[]
  
  // 上传历史
  uploadHistory: UploadRecord[]
  
  // 应用设置
  settings: {
    theme: 'light' | 'dark'
    language: 'zh' | 'en'
  }
  
  // Actions
  setUserRole: (role: 'student' | 'teacher' | 'parent') => void
  decrementRemainingCount: () => void
  resetDailyCount: () => void
  addUploadRecord: (record: Omit<UploadRecord, 'id' | 'timestamp'>) => void
  updateUploadRecord: (id: string, updates: Partial<UploadRecord>) => void
  setLearningResources: (resources: LearningResource[]) => void
}

// 默认学习资料数据
const defaultLearningResources: LearningResource[] = [
  {
    id: '1',
    title: '每日听力训练',
    description: '轻松掌握地道口语',
    icon: 'headphones',
    gradient: 'from-blue-400 to-purple-500',
    type: 'listening'
  },
  {
    id: '2',
    title: '重点词汇记忆',
    description: '科学高效背单词',
    icon: 'book-open',
    gradient: 'from-green-400 to-blue-500',
    type: 'vocabulary'
  },
  {
    id: '3',
    title: '语法练习题库',
    description: '巩固语法基础',
    icon: 'puzzle',
    gradient: 'from-purple-400 to-pink-500',
    type: 'grammar'
  },
  {
    id: '4',
    title: '考试真题解析',
    description: '名师精讲详解',
    icon: 'file-text',
    gradient: 'from-orange-400 to-red-500',
    type: 'exam'
  }
]

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // 初始状态
      user: {
        role: 'student',
        remainingCount: 5,
        lastResetDate: new Date().toDateString()
      },
      
      learningResources: defaultLearningResources,
      
      uploadHistory: [],
      
      settings: {
        theme: 'light',
        language: 'zh'
      },
      
      // Actions
      setUserRole: (role) => set((state) => ({
        user: { ...state.user, role }
      })),
      
      decrementRemainingCount: () => set((state) => {
        if (state.user.remainingCount > 0) {
          return {
            user: { ...state.user, remainingCount: state.user.remainingCount - 1 }
          }
        }
        return state
      }),
      
      resetDailyCount: () => {
        const today = new Date().toDateString()
        const state = get()
        
        if (state.user.lastResetDate !== today) {
          set((state) => ({
            user: {
              ...state.user,
              remainingCount: 5,
              lastResetDate: today
            }
          }))
        }
      },
      
      addUploadRecord: (record) => set((state) => ({
        uploadHistory: [
          {
            ...record,
            id: Date.now().toString(),
            timestamp: Date.now()
          },
          ...state.uploadHistory
        ]
      })),
      
      updateUploadRecord: (id, updates) => set((state) => ({
        uploadHistory: state.uploadHistory.map(record =>
          record.id === id ? { ...record, ...updates } : record
        )
      })),
      
      setLearningResources: (resources) => set({ learningResources: resources })
    }),
    {
      name: 'awesome-pen-storage',
      partialize: (state) => ({
        user: state.user,
        uploadHistory: state.uploadHistory,
        settings: state.settings
      })
    }
  )
)
