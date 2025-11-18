# 🐳 WanderLens Docker Deployment Guide

This guide provides comprehensive instructions for deploying WanderLens using Docker.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Deployment Methods](#deployment-methods)
- [Configuration](#configuration)
- [Monitoring](#monitoring)
- [Troubleshooting](#troubleshooting)
- [Production Best Practices](#production-best-practices)

## Prerequisites

### Required Software

- **Docker**: Version 20.10 or higher
- **Docker Compose**: Version 2.0 or higher
- **Git**: For cloning the repository

### System Requirements

- **RAM**: Minimum 2GB, Recommended 4GB
- **Storage**: Minimum 2GB free space
- **CPU**: 2+ cores recommended
- **OS**: Linux, macOS, or Windows with WSL2

### Verify Installation

```bash
# Check Docker version
docker --version

# Check Docker Compose version
docker-compose --version

# Verify Docker is running
docker info
```

## Quick Start

### 1. Clone and Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd WanderLens

# Make helper script executable
chmod +x docker-start.sh
```

### 2. Build and Run

```bash
# Using docker-compose
docker-compose up -d

# OR using helper script
./docker-start.sh build
./docker-start.sh start

# OR using Makefile
make build
make start
```

### 3. Access Application

Open your browser and navigate to:
- **Local**: http://localhost:3666
- **Network**: http://<your-ip>:3666

### 4. Verify Deployment

```bash
# Check container status
docker-compose ps

# View logs
docker-compose logs -f wanderlens

# Check health
docker inspect --format='{{.State.Health.Status}}' wanderlens-app
```

## Deployment Methods

### Method 1: Docker Compose (Recommended)

Best for development and small-scale deployments.

```bash
# Start in background
docker-compose up -d

# Start with build
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

### Method 2: Helper Script

Simplified commands with user-friendly output.

```bash
# Available commands
./docker-start.sh help

# Build image
./docker-start.sh build

# Start container
./docker-start.sh start

# Stop container
./docker-start.sh stop

# Restart container
./docker-start.sh restart

# View logs
./docker-start.sh logs

# Check status
./docker-start.sh status

# Full rebuild
./docker-start.sh rebuild

# Clean up
./docker-start.sh clean
```

### Method 3: Makefile

For users familiar with Make.

```bash
# Show available commands
make help

# Development
make install      # Install dependencies
make dev          # Run dev server
make build-app    # Build Next.js app

# Docker
make build        # Build Docker image
make start        # Start container
make stop         # Stop container
make restart      # Restart container
make logs         # View logs
make status       # Check status
make rebuild      # Rebuild and restart
make clean        # Clean up resources
```

### Method 4: Manual Docker Commands

For advanced users who need fine-grained control.

```bash
# Build image
docker build -t wanderlens:latest .

# Run container
docker run -d \
  --name wanderlens-app \
  -p 3666:3666 \
  -e NODE_ENV=production \
  -e PORT=3666 \
  --restart unless-stopped \
  wanderlens:latest

# View logs
docker logs -f wanderlens-app

# Stop container
docker stop wanderlens-app

# Remove container
docker rm wanderlens-app
```

## Configuration

### Port Configuration

The default port is **3666**. To change it:

**docker-compose.yml:**
```yaml
services:
  wanderlens:
    ports:
      - "8080:3666"  # External:Internal
```

**Dockerfile (if needed):**
```dockerfile
ENV PORT 3666
EXPOSE 3666
```

### Environment Variables

Configure via `docker-compose.yml`:

```yaml
environment:
  # Application
  - NODE_ENV=production
  - PORT=3666
  - HOSTNAME=0.0.0.0

  # Next.js
  - NEXT_TELEMETRY_DISABLED=1

  # Custom (add as needed)
  # - API_KEY=your_key
  # - DATABASE_URL=your_db_url
```

### Resource Limits

Add resource constraints:

```yaml
services:
  wanderlens:
    deploy:
      resources:
        limits:
          cpus: '2'
          memory: 2G
        reservations:
          cpus: '1'
          memory: 1G
```

## Monitoring

### Health Checks

Built-in health check configuration:

```yaml
healthcheck:
  test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost:3666"]
  interval: 30s
  timeout: 10s
  retries: 3
  start_period: 40s
```

Check health status:
```bash
docker inspect --format='{{json .State.Health}}' wanderlens-app | jq
```

### Logs

```bash
# Follow logs
docker-compose logs -f

# Last 100 lines
docker-compose logs --tail=100

# Specific service
docker-compose logs wanderlens

# Save logs to file
docker-compose logs > wanderlens.log
```

### Container Stats

```bash
# Real-time stats
docker stats wanderlens-app

# One-time snapshot
docker stats --no-stream wanderlens-app
```

## Troubleshooting

### Common Issues

#### 1. Port Already in Use

```bash
# Find process using port 3666
lsof -i :3666
# or
netstat -tlnp | grep 3666

# Kill the process
kill -9 <PID>

# Or change the port in docker-compose.yml
```

#### 2. Build Fails

```bash
# Clean build with no cache
docker-compose build --no-cache

# Remove old images
docker image prune -a

# Check disk space
df -h
```

#### 3. Container Exits Immediately

```bash
# Check logs for errors
docker-compose logs

# Run in foreground to see errors
docker-compose up

# Check container exit code
docker inspect wanderlens-app | grep ExitCode
```

#### 4. Can't Connect to Application

```bash
# Verify container is running
docker ps | grep wanderlens

# Check port mapping
docker port wanderlens-app

# Test from inside container
docker exec wanderlens-app wget -O- http://localhost:3666

# Check firewall
sudo ufw status
```

#### 5. Out of Memory

```bash
# Check memory usage
docker stats wanderlens-app

# Increase memory limit in docker-compose.yml
# Add under deploy.resources.limits

# Restart Docker daemon
sudo systemctl restart docker
```

### Debug Mode

Run container in debug mode:

```bash
# Override entrypoint
docker run -it --rm \
  -p 3666:3666 \
  wanderlens:latest \
  /bin/sh

# Check files
ls -la /app

# Test node server
node server.js
```

## Production Best Practices

### 1. Use Multi-Stage Builds

Already implemented in Dockerfile for optimal image size.

### 2. Security

```bash
# Run as non-root user (already configured)
# Scan for vulnerabilities
docker scan wanderlens:latest

# Keep base images updated
docker pull node:20-alpine
docker-compose build
```

### 3. Persistent Data

Add volumes for data persistence:

```yaml
volumes:
  - ./data:/app/data
  - ./logs:/app/logs
```

### 4. Reverse Proxy

Use Nginx or Traefik for production:

**nginx.conf example:**
```nginx
server {
    listen 80;
    server_name wanderlens.example.com;

    location / {
        proxy_pass http://localhost:3666;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 5. SSL/TLS

Add HTTPS with Let's Encrypt:

```yaml
services:
  wanderlens:
    environment:
      - VIRTUAL_HOST=wanderlens.example.com
      - LETSENCRYPT_HOST=wanderlens.example.com
      - LETSENCRYPT_EMAIL=admin@example.com
```

### 6. Automated Backups

```bash
# Backup script
#!/bin/bash
docker exec wanderlens-app tar czf - /app/data | \
  gzip > backup-$(date +%Y%m%d).tar.gz
```

### 7. Monitoring

Consider adding:
- **Prometheus** for metrics
- **Grafana** for visualization
- **Loki** for log aggregation

### 8. Auto-restart

Already configured in docker-compose.yml:
```yaml
restart: unless-stopped
```

## Performance Optimization

### 1. Image Size

Current optimizations:
- Multi-stage build
- Alpine base image
- .dockerignore file
- Standalone output mode

### 2. Caching

```bash
# Build with BuildKit for better caching
DOCKER_BUILDKIT=1 docker build -t wanderlens:latest .
```

### 3. Layer Optimization

Layers are ordered for optimal caching:
1. System dependencies
2. Package files
3. Dependencies
4. Application code

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Docker Build and Push

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: Build Docker image
        run: docker build -t wanderlens:latest .

      - name: Test container
        run: |
          docker run -d -p 3666:3666 --name test wanderlens:latest
          sleep 10
          curl http://localhost:3666
          docker stop test
```

## Support

For issues or questions:
- Create an issue on GitHub
- Check the main README.md
- Review CHANGELOG.md for updates

---

**Happy Deploying! 🚀**
