// AI批改服务
const AI_API_URL = 'https://aistudio.alibaba-inc.com/api/aiapp/run/dBLyUMmRPox/latest'
const AI_API_KEY = 'cb7a887f0c5be95aeb08148b358d8fc1'

export interface AIRequest {
  empId: string
  question: string
  sessionId: string
  stream: boolean
  returnRunLog: boolean
  variableMap: {
    img: Array<{ content: string }>
    grade: { value: string }
  }
}

export interface AIResponse {
  success: boolean
  errorCode: string | null
  errorMsg: string | null
  data: {
    stream: boolean
    streamEnd: boolean
    appCode: string
    sessionId: string
    messageId: string
    content: string
    nodeDeltaMap: any
    runLog: any
    runStatus: number
    extendMap: any
    delta: any
  }
  errorDesc: string | null
  errorCodeName: string | null
}

export interface PolishResult {
  origin: {
    title: string
    content: string
  }
  polish: {
    title: string
    content: string
  }
}

export interface HighlightsResult {
  highlights: string[]
}

export interface CorrectsResult {
  origin: {
    title: string
    content: string
  }
  corrected: {
    title: string
    content: string
  }
  proof: string
}

export interface ScoreResult {
  language: number
  structure: number
  content: number
  creativity: number
  comment: string
}

export interface StatisticResult {
  wordCount: number
  relevance: string
}

export interface CorrectionResult {
  polish: PolishResult
  higglights: HighlightsResult
  corrects: CorrectsResult
  score: ScoreResult
  statistic: StatisticResult
}

/**
 * 生成UUID
 */
export const generateUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

/**
 * 提交作文进行AI批改
 * @param imageUrl 图片URL
 * @param grade 年级（默认6年级）
 * @returns Promise<CorrectionResult>
 */
export const submitForCorrection = async (
  imageUrl: string, 
  grade: string = '6'
): Promise<CorrectionResult> => {
  try {
    console.log('🤖 开始AI批改...')
    console.log('📷 图片URL:', imageUrl)
    console.log('🎓 年级:', grade)
    
    const sessionId = generateUUID()
    console.log('🆔 会话ID:', sessionId)
    
    const requestData: AIRequest = {
      empId: "222877",
      question: "test",
      sessionId,
      stream: false,
      returnRunLog: false,
      variableMap: {
        img: [{ content: imageUrl }],
        grade: { value: grade }
      }
    }

    console.log('📤 发送AI批改请求...')
    const response = await fetch(AI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-AK': AI_API_KEY
      },
      body: JSON.stringify(requestData)
    })

    console.log('📡 AI API响应状态:', response.status)
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ AI API错误响应:', errorText)
      throw new Error(`AI API错误: ${response.status}`)
    }

    const result: AIResponse = await response.json()
    console.log('📋 AI API原始响应:', result)
    
    if (!result.success) {
      console.error('❌ AI批改失败:', result.errorMsg)
      throw new Error(result.errorMsg || 'AI批改失败')
    }

    if (!result.data?.content) {
      console.error('❌ AI响应中缺少content字段')
      throw new Error('AI响应格式错误')
    }

    // 解析content字段中的JSON数据
    console.log('🔍 解析AI批改结果...')
    const contentData = JSON.parse(result.data.content)
    console.log('📊 解析后的内容:', contentData)

    // 解析各个字段
    const correctionResult: CorrectionResult = {
      polish: JSON.parse(contentData.polish),
      higglights: JSON.parse(contentData.higglights),
      corrects: JSON.parse(contentData.corrects),
      score: JSON.parse(contentData.score),
      statistic: JSON.parse(contentData.statistic)
    }

    console.log('✅ AI批改结果解析完成:', correctionResult)
    return correctionResult

  } catch (error) {
    console.error('❌ AI批改服务错误:', error)
    throw error instanceof Error ? error : new Error('AI批改服务异常')
  }
}

/**
 * 格式化评分结果
 * @param score 评分对象
 * @returns 格式化的评分信息
 */
export const formatScore = (score: ScoreResult) => {
  const totalScore = score.language + score.structure + score.content + score.creativity
  const averageScore = (totalScore / 4).toFixed(1)
  
  return {
    total: totalScore,
    average: parseFloat(averageScore),
    breakdown: {
      language: score.language,
      structure: score.structure,
      content: score.content,
      creativity: score.creativity
    },
    comment: score.comment
  }
}

/**
 * 格式化统计数据
 * @param statistic 统计对象
 * @returns 格式化的统计信息
 */
export const formatStatistic = (statistic: StatisticResult) => {
  return {
    wordCount: statistic.wordCount,
    relevance: statistic.relevance,
    relevancePercent: parseFloat(statistic.relevance.replace('%', ''))
  }
}
