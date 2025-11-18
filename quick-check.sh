#!/bin/bash

# Quick check script for WanderLens deployment

echo "Checking WanderLens container..."
CONTAINER_ID=$(sudo docker ps -q -f name=wanderlens-app)

if [ -z "$CONTAINER_ID" ]; then
    echo "❌ Container is not running!"
    echo ""
    echo "Checking if it exited..."
    sudo docker ps -a | grep wanderlens-app
    echo ""
    echo "Last 30 lines of logs:"
    sudo docker logs --tail=30 wanderlens-app
    exit 1
fi

echo "✓ Container is running (ID: $CONTAINER_ID)"
echo ""

# Check if port is responding
if curl -s http://localhost:3666/api/health > /dev/null 2>&1; then
    echo "✓ API is responding on port 3666"
    echo ""
    echo "API Health Check:"
    curl -s http://localhost:3666/api/health | jq . 2>/dev/null || curl -s http://localhost:3666/api/health
else
    echo "❌ API is not responding on port 3666"
    echo ""
    echo "Recent logs:"
    sudo docker logs --tail=20 wanderlens-app
fi

echo ""
echo "To view full logs: sudo docker logs wanderlens-app"
echo "To follow logs: sudo docker logs -f wanderlens-app"
