#!/bin/bash

# 推送到所有远程地址的脚本
echo "🚀 开始推送到所有远程地址..."

# 检查当前分支
CURRENT_BRANCH=$(git branch --show-current)
echo "📋 当前分支: $CURRENT_BRANCH"

# 推送到GitHub
echo "📤 推送到GitHub (origin)..."
git push origin $CURRENT_BRANCH

# 推送到阿里内部GitLab
echo "📤 推送到阿里内部GitLab (origin_ali)..."
git push origin_ali $CURRENT_BRANCH

echo "✅ 推送完成！"
echo "🌐 GitHub: https://github.com/XingMXTeam/awesome-pen"
echo "🏢 阿里内部: git@gitlab.alibaba-inc.com:xunxing.mxx/awesome-pen.git"
