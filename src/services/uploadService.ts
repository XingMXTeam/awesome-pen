// ImgBB图片上传服务
const IMGBB_API_KEY = '255a9497810ddbabee244e3620bc9267'
const IMGBB_UPLOAD_URL = 'https://api.imgbb.com/1/upload'

// 导入AI批改服务
import { submitForCorrection, CorrectionResult } from './aiCorrectionService'

export interface UploadResult {
  success: boolean
  url?: string
  error?: string
}

export interface UploadWithCorrectionResult {
  success: boolean
  url?: string
  correctionResult?: CorrectionResult
  error?: string
}

export interface ImgBBResponse {
  success: boolean
  data?: {
    url: string
    display_url: string
    delete_url: string
    size: number
    time: string
  }
  error?: {
    message: string
    code: number
  }
}

/**
 * 上传图片到ImgBB
 * @param base64Data base64格式的图片数据
 * @param fileName 文件名（可选）
 * @returns Promise<UploadResult>
 */
export const uploadImageToImgBB = async (
  base64Data: string, 
  fileName?: string
): Promise<UploadResult> => {
  try {
    console.log('🔧 uploadImageToImgBB 开始处理...')
    console.log('📊 原始base64数据长度:', base64Data.length)
    console.log('📄 原始base64前100字符:', base64Data.substring(0, 100))
    
    // 确保base64数据格式正确
    let imageData = base64Data
    if (base64Data.startsWith('data:image')) {
      // 如果包含data URL前缀，提取base64部分
      imageData = base64Data.split(',')[1]
      console.log('✂️ 提取纯base64数据，长度:', imageData.length)
    } else {
      console.log('ℹ️ 数据不包含data URL前缀，直接使用')
    }

    if (!imageData || imageData.length === 0) {
      console.error('❌ 处理后的imageData为空')
      return {
        success: false,
        error: '图片数据为空'
      }
    }

    const formData = new FormData()
    formData.append('image', imageData)
    formData.append('key', IMGBB_API_KEY)
    
    if (fileName) {
      formData.append('name', fileName)
      console.log('📝 添加文件名到FormData:', fileName)
    }

    console.log('🌐 发送请求到ImgBB...')
    const response = await fetch(IMGBB_UPLOAD_URL, {
      method: 'POST',
      body: formData
    })

    console.log('📡 收到响应，状态码:', response.status)
    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ HTTP错误响应:', errorText)
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result: ImgBBResponse = await response.json()
    console.log('📋 ImgBB响应:', result)

    if (result.success && result.data) {
      console.log('✅ 上传成功，返回URL:', result.data.url)
      return {
        success: true,
        url: result.data.url
      }
    } else {
      console.error('❌ ImgBB返回失败:', result.error)
      return {
        success: false,
        error: result.error?.message || '上传失败'
      }
    }
  } catch (error) {
    console.error('❌ ImgBB上传错误:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : '网络错误'
    }
  }
}

/**
 * 生成唯一的文件名
 * @param prefix 文件名前缀
 * @returns 格式化的文件名
 */
export const generateFileName = (prefix: string = 'essay'): string => {
  const now = new Date()
  const timestamp = now.getTime()
  const dateStr = now.toISOString().split('T')[0].replace(/-/g, '')
  return `${prefix}_${dateStr}_${timestamp}.jpg`
}

/**
 * 上传图片并进行AI批改
 * @param base64Data base64格式的图片数据
 * @param fileName 文件名（可选）
 * @param grade 年级（默认6年级）
 * @returns Promise<UploadWithCorrectionResult>
 */
export const uploadImageAndCorrect = async (
  base64Data: string, 
  fileName?: string,
  grade: string = '6'
): Promise<UploadWithCorrectionResult> => {
  try {
    console.log('🚀 开始上传图片并进行AI批改...')
    
    // 第一步：上传图片到ImgBB
    console.log('📤 步骤1: 上传图片到ImgBB...')
    const uploadResult = await uploadImageToImgBB(base64Data, fileName)
    
    if (!uploadResult.success || !uploadResult.url) {
      console.error('❌ 图片上传失败:', uploadResult.error)
      return {
        success: false,
        error: uploadResult.error || '图片上传失败'
      }
    }
    
    console.log('✅ 图片上传成功，URL:', uploadResult.url)
    
    // 第二步：调用AI批改服务
    console.log('🤖 步骤2: 调用AI批改服务...')
    const correctionResult = await submitForCorrection(uploadResult.url, grade)
    
    console.log('✅ AI批改完成')
    
    return {
      success: true,
      url: uploadResult.url,
      correctionResult
    }
    
  } catch (error) {
    console.error('❌ 上传和批改流程错误:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : '上传和批改失败'
    }
  }
}

/**
 * 压缩图片（可选功能）
 * @param file 图片文件
 * @param maxWidth 最大宽度
 * @param maxHeight 最大高度
 * @param quality 压缩质量 (0-1)
 * @returns Promise<string> base64数据
 */
export const compressImage = (
  file: File,
  maxWidth: number = 1920,
  maxHeight: number = 1080,
  quality: number = 0.8
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()

    img.onload = () => {
      // 计算压缩后的尺寸
      let { width, height } = img
      
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height)
        width *= ratio
        height *= ratio
      }

      canvas.width = width
      canvas.height = height

      // 绘制压缩后的图片
      ctx?.drawImage(img, 0, 0, width, height)
      
      // 转换为base64
      const base64 = canvas.toDataURL('image/jpeg', quality)
      resolve(base64)
    }

    img.onerror = () => reject(new Error('图片加载失败'))
    img.src = URL.createObjectURL(file)
  })
}
