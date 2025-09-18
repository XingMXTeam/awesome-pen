// 测试ImgBB上传功能
import { uploadImageToImgBB, generateFileName } from '@/services/uploadService'

// 创建一个测试用的base64图片
export const createTestImage = (): string => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  
  if (!ctx) return ''
  
  // 设置画布尺寸
  canvas.width = 400
  canvas.height = 300
  
  // 绘制一个简单的测试图片
  ctx.fillStyle = '#3b82f6'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  
  // 添加文字
  ctx.fillStyle = 'white'
  ctx.font = '24px Arial'
  ctx.textAlign = 'center'
  ctx.fillText('测试图片', canvas.width / 2, canvas.height / 2)
  ctx.fillText('Test Image', canvas.width / 2, canvas.height / 2 + 30)
  
  // 转换为base64
  return canvas.toDataURL('image/jpeg', 0.8)
}

// 测试上传功能
export const testUpload = async (): Promise<void> => {
  try {
    console.log('开始测试ImgBB上传...')
    
    // 创建测试图片
    const testImage = createTestImage()
    console.log('测试图片创建完成:', testImage.substring(0, 50) + '...')
    
    // 生成文件名
    const fileName = generateFileName('test')
    console.log('文件名:', fileName)
    
    // 上传到ImgBB
    const result = await uploadImageToImgBB(testImage, fileName)
    
    if (result.success && result.url) {
      console.log('✅ 上传成功!')
      console.log('图片URL:', result.url)
      
      // 在控制台显示图片
      console.log('图片预览:')
      console.log(`<img src="${result.url}" alt="测试图片" style="max-width: 200px;">`)
    } else {
      console.error('❌ 上传失败:', result.error)
    }
  } catch (error) {
    console.error('❌ 测试失败:', error)
  }
}

// 在浏览器控制台中调用
if (typeof window !== 'undefined') {
  (window as any).testUpload = testUpload
  console.log('测试函数已加载，在控制台输入 testUpload() 开始测试')
}
