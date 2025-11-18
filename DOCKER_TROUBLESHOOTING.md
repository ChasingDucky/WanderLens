# Docker部署故障排查指南

## 快速检查

```bash
# 方法1：使用快速检查脚本
./quick-check.sh

# 方法2：手动检查容器状态
sudo docker ps | grep wanderlens

# 方法3：查看最近的日志
sudo docker logs --tail=50 wanderlens-app
```

## 常见问题

### 1. 容器构建成功但无法访问

**症状**：构建完成，但访问 http://localhost:3666 失败

**检查步骤**：

```bash
# 1. 检查容器是否在运行
sudo docker ps | grep wanderlens

# 2. 如果没有运行，查看为什么退出了
sudo docker ps -a | grep wanderlens
sudo docker logs wanderlens-app

# 3. 检查端口映射
sudo docker port wanderlens-app

# 4. 检查应用日志
sudo docker logs -f wanderlens-app
```

**常见原因**：
- 端口3666已被占用
- 应用启动失败（检查日志）
- 依赖问题

**解决方案**：

```bash
# 检查端口占用
sudo lsof -i :3666
# 或
sudo netstat -tulpn | grep 3666

# 如果端口被占用，修改 docker-compose.yml 中的端口映射
# ports:
#   - "3667:3666"  # 改为3667或其他可用端口

# 重新启动
sudo docker-compose down
sudo docker-compose up -d
```

### 2. "Module not found" 或依赖错误

**症状**：日志显示无法找到某个模块

**解决方案**：

```bash
# 清理并重新构建
sudo docker-compose down -v
sudo docker system prune -f
sudo docker-compose up -d --build
```

### 3. 数据库连接错误（如果使用）

**检查**：
```bash
# 查看网络
sudo docker network ls
sudo docker network inspect wanderlens_wanderlens-network

# 检查所有容器状态
sudo docker-compose ps
```

### 4. ENV格式警告

**已修复**：Dockerfile中的ENV格式已更新为推荐格式
- ✅ `ENV KEY=value` (推荐)
- ❌ `ENV KEY value` (旧格式)

### 5. 内存不足

**症状**：构建过程中卡住或失败

**解决方案**：

```bash
# 增加Docker内存限制（如果使用Docker Desktop）
# 或者减小构建并发

# 清理未使用的镜像和容器
sudo docker system prune -a
```

## 有用的命令

```bash
# 查看实时日志
sudo docker logs -f wanderlens-app

# 进入容器shell
sudo docker exec -it wanderlens-app sh

# 检查容器资源使用
sudo docker stats wanderlens-app

# 重启容器
sudo docker restart wanderlens-app

# 完全重建
sudo docker-compose down -v
sudo docker-compose build --no-cache
sudo docker-compose up -d

# 查看环境变量
sudo docker exec wanderlens-app env

# 测试API
curl http://localhost:3666/api/health
```

## 端口说明

- **3666**: 对外访问端口（可在docker-compose.yml修改）
- **3333**: 容器内部Next.js运行端口（package.json定义）

注意：docker-compose.yml将外部3666端口映射到容器内部3333端口

## 查看构建日志

```bash
# 查看完整构建输出
sudo docker-compose build --progress=plain

# 仅构建不启动
sudo docker-compose build
```

## 健康检查

```bash
# API健康检查
curl http://localhost:3666/api/health

# 预期响应：
# {
#   "status": "healthy",
#   "timestamp": "...",
#   "environment": "production",
#   "version": "1.0.0"
# }

# 如果无响应，检查：
# 1. 容器是否运行
# 2. 防火墙是否阻止
# 3. 端口映射是否正确
```

## 性能优化

```bash
# 多阶段构建已启用（减小最终镜像大小）
# 当前配置：
# - deps: 安装依赖
# - builder: 构建应用
# - runner: 运行应用（仅包含生产依赖）

# 查看镜像大小
sudo docker images | grep wanderlens
```

## 生产部署检查清单

- [ ] 容器正常运行
- [ ] API响应正常 (http://localhost:3666/api/health)
- [ ] 日志无错误
- [ ] 端口可访问
- [ ] 内存使用正常
- [ ] Nginx反向代理配置（如使用）
- [ ] SSL证书配置（如使用HTTPS）
- [ ] 防火墙规则正确
- [ ] 环境变量设置

## 紧急回滚

```bash
# 停止当前版本
sudo docker-compose down

# 使用之前的镜像
sudo docker images | grep wanderlens  # 找到之前的image ID
sudo docker tag <old-image-id> wanderlens_wanderlens:latest
sudo docker-compose up -d
```

## 获取帮助

如果问题持续：

1. 收集日志：`sudo docker logs wanderlens-app > logs.txt`
2. 检查系统资源：`free -h` 和 `df -h`
3. 查看Docker版本：`sudo docker --version`
4. 查看docker-compose版本：`sudo docker-compose --version`
