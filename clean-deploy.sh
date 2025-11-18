#!/bin/bash

echo "=== Clean Docker Deployment ==="
echo ""
echo "This script will completely clean and rebuild the container"
echo ""

# Step 1: Stop and remove all containers
echo "1. Stopping and removing all containers..."
sudo docker-compose down -v
sudo docker stop wanderlens-app 2>/dev/null || true
sudo docker rm wanderlens-app 2>/dev/null || true

echo ""
echo "2. Cleaning up Docker system..."
# Remove dangling images
sudo docker image prune -f

echo ""
echo "3. Building fresh container..."
sudo docker-compose build --no-cache

echo ""
echo "4. Starting container..."
sudo docker-compose up -d

echo ""
echo "5. Waiting for container to start..."
sleep 5

echo ""
echo "6. Checking status..."
./quick-check.sh

echo ""
echo "=== Deployment Complete ==="
echo ""
echo "If you see any errors above, check logs with:"
echo "  sudo docker logs -f wanderlens-app"
