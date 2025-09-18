// ImgBB图片上传服务
const IMGBB_API_KEY = '255a9497810ddbabee244e3620bc9267'
const IMGBB_UPLOAD_URL = 'https://api.imgbb.com/1/upload'

export interface UploadResult {
  success: boolean
  url?: string
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
    // 确保base64数据格式正确
    let imageData = base64Data
    if (base64Data.startsWith('data:image')) {
      // 如果包含data URL前缀，提取base64部分
      imageData = base64Data.split(',')[1]
    }

    const formData = new FormData()
    formData.append('image', imageData)
    formData.append('key', IMGBB_API_KEY)
    
    if (fileName) {
      formData.append('name', fileName)
    }

    const response = await fetch(IMGBB_UPLOAD_URL, {
      method: 'POST',
      body: formData
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result: ImgBBResponse = await response.json()

    if (result.success && result.data) {
      return {
        success: true,
        url: result.data.url
      }
    } else {
      return {
        success: false,
        error: result.error?.message || '上传失败'
      }
    }
  } catch (error) {
    console.error('ImgBB upload error:', error)
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
