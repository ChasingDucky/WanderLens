# WanderLens 部署指南

## 服务器部署问题排查

### 1. API无法访问 / CORS错误

**问题症状**:
- 前端无法连接到API
- 浏览器控制台显示CORS错误
- API请求返回403或404

**解决方案**:

#### a. 检查端口配置
确保服务器监听正确的端口（默认3333）：
```bash
npm run start  # 生产环境，监听3333端口
npm run dev    # 开发环境，监听3333端口
```

#### b. 防火墙设置
确保服务器防火墙允许3333端口：
```bash
# Ubuntu/Debian
sudo ufw allow 3333/tcp

# CentOS/RHEL
sudo firewall-cmd --permanent --add-port=3333/tcp
sudo firewall-cmd --reload
```

#### c. Nginx反向代理配置
如果使用Nginx作为反向代理，添加以下配置：

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3333;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;

        # CORS headers
        add_header 'Access-Control-Allow-Origin' '*' always;
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS' always;
        add_header 'Access-Control-Allow-Headers' 'Content-Type, Authorization' always;
    }

    location /api/ {
        proxy_pass http://localhost:3333/api/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

        # CORS for API
        add_header 'Access-Control-Allow-Origin' '*' always;
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS' always;
        add_header 'Access-Control-Allow-Headers' 'Content-Type, Authorization' always;

        # Handle preflight
        if ($request_method = 'OPTIONS') {
            return 204;
        }
    }
}
```

### 2. Gemini API连接失败

**问题症状**:
- AI助手无法回复
- 错误信息："Network connection failed"
- 服务器日志显示"ENOTFOUND"或"ECONNREFUSED"

**解决方案**:

#### a. 检查网络连接
确保服务器可以访问Google API：
```bash
curl -I https://generativelanguage.googleapis.com
```

#### b. 防火墙规则
允许出站HTTPS连接：
```bash
# Ubuntu/Debian
sudo ufw allow out 443/tcp

# CentOS/RHEL
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload
```

#### c. 代理配置（如需要）
如果服务器需要通过代理访问外网：
```bash
# 设置环境变量
export HTTP_PROXY="http://proxy-server:port"
export HTTPS_PROXY="http://proxy-server:port"

# 在.env文件中添加
HTTP_PROXY=http://proxy-server:port
HTTPS_PROXY=http://proxy-server:port
```

### 3. API Token问题

**问题症状**:
- 错误信息："Invalid API token"
- 错误信息："API quota exceeded"

**解决方案**:

#### a. 验证API Token
1. 访问 https://makersuite.google.com/app/apikey
2. 确认API密钥有效且未过期
3. 检查API密钥权限

#### b. 检查配额
1. 访问 Google Cloud Console
2. 查看Gemini API配额使用情况
3. 如需要，升级配额限制

### 4. 健康检查

#### 测试API是否正常工作：
```bash
# 健康检查端点
curl http://your-server:3333/api/health

# 预期返回：
{
  "status": "healthy",
  "timestamp": "2025-11-18T...",
  "environment": "production",
  "version": "1.0.0",
  "services": {
    "api": "operational"
  }
}
```

#### 测试CORS：
```bash
curl -X OPTIONS http://your-server:3333/api/agents/chat \
  -H "Origin: http://example.com" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type" \
  -v
```

### 5. 日志查看

#### 查看服务器日志：
```bash
# 使用PM2
pm2 logs wanderlens

# 使用Docker
docker logs wanderlens-container

# 直接运行
# 查看控制台输出
```

#### 浏览器控制台
1. 打开浏览器开发者工具 (F12)
2. 查看Console标签页
3. 查看Network标签页，检查API请求详情

### 6. 环境变量

确保生产环境设置了正确的环境变量：

```bash
# .env.production
NODE_ENV=production
PORT=3333
```

### 7. 常见错误码

| 错误码 | 说明 | 解决方案 |
|--------|------|----------|
| 400 | 请求参数错误 | 检查前端发送的数据格式 |
| 401 | 未提供API Token | 在设置页面配置Gemini API Token |
| 404 | Agent未找到 | 检查agentId是否正确 |
| 500 | 服务器内部错误 | 查看服务器日志，检查Gemini API连接 |

### 8. 性能优化

#### a. 构建优化
```bash
# 生产构建
npm run build

# 使用standalone模式（已在next.config.mjs中配置）
# 这会生成优化的独立部署包
```

#### b. PM2部署（推荐）
```bash
# 安装PM2
npm install -g pm2

# 启动应用
pm2 start npm --name "wanderlens" -- start

# 设置开机自启
pm2 startup
pm2 save

# 查看状态
pm2 status

# 查看日志
pm2 logs wanderlens
```

#### c. Docker部署
```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3333
CMD ["node", "server.js"]
```

### 9. 调试技巧

#### 启用详细日志：
在`app/api/agents/chat/route.ts`中已包含详细的错误日志。查看服务器控制台输出：

```
=== Gemini API Error ===
Error type: ...
Error message: ...
Error stack: ...
```

#### 前端调试：
浏览器控制台会显示：
```
Sending request to /api/agents/chat...
Response status: 200
Response data: {...}
```

### 10. 联系支持

如果问题仍未解决：
1. 查看服务器完整日志
2. 检查浏览器Network标签中的请求详情
3. 确认所有配置文件设置正确
4. 提供错误信息截图和日志

## 快速启动命令

```bash
# 开发环境
npm run dev

# 生产环境
npm run build
npm run start

# 使用PM2（推荐生产环境）
pm2 start npm --name "wanderlens" -- start
```

## 端口说明

- **默认端口**: 3333
- **修改端口**: 编辑 `package.json` 中的 `-p 3333` 参数
