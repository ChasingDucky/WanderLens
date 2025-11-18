#!/bin/bash

echo "=== WanderLens Deployment Status Check ==="
echo ""

# Check container status
echo "1. Container Status:"
sudo docker ps -a | grep wanderlens

echo ""
echo "2. Container Logs (last 50 lines):"
sudo docker logs --tail=50 wanderlens-app

echo ""
echo "3. Health Check:"
echo "Testing localhost:3666..."
curl -s http://localhost:3666 > /dev/null && echo "✓ Port 3666 is responding" || echo "✗ Port 3666 is not responding"

echo ""
echo "Testing /api/health endpoint..."
curl -s http://localhost:3666/api/health | head -20

echo ""
echo "4. Network Check:"
sudo docker network inspect wanderlens_wanderlens-network | grep -A 5 "Containers"

echo ""
echo "=== Check Complete ==="
