#!/usr/bin/env node

// 构建测试脚本
const { execSync } = require('child_process');
const fs = require('fs');

console.log('🔍 开始构建测试...');

try {
  // 检查Node.js版本
  const nodeVersion = process.version;
  console.log(`📦 Node.js版本: ${nodeVersion}`);
  
  if (parseInt(nodeVersion.slice(1).split('.')[0]) < 18) {
    console.error('❌ 需要Node.js 18或更高版本');
    process.exit(1);
  }

  // 清理之前的构建
  if (fs.existsSync('dist')) {
    console.log('🧹 清理之前的构建文件...');
    fs.rmSync('dist', { recursive: true, force: true });
  }

  // 安装依赖
  console.log('📥 安装依赖...');
  execSync('npm ci', { stdio: 'inherit' });

  // 类型检查
  console.log('🔍 类型检查...');
  execSync('npx tsc --noEmit', { stdio: 'inherit' });

  // 构建项目
  console.log('🏗️ 构建项目...');
  execSync('npm run build', { stdio: 'inherit' });

  // 检查构建输出
  if (fs.existsSync('dist/index.html')) {
    console.log('✅ 构建成功！');
    console.log('📁 构建文件:');
    const files = fs.readdirSync('dist', { recursive: true });
    files.forEach(file => console.log(`  - ${file}`));
  } else {
    console.error('❌ 构建失败：未找到dist/index.html');
    process.exit(1);
  }

} catch (error) {
  console.error('❌ 构建失败:', error.message);
  process.exit(1);
}
