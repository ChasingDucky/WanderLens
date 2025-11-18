#!/bin/bash

echo "=== WanderLens Redeploy Script ==="
echo ""
echo "This will rebuild and restart the WanderLens container with the latest code."
echo ""

# Pull latest changes (if using git)
if [ -d .git ]; then
    echo "Pulling latest changes from git..."
    git pull
    echo ""
fi

# Stop current container
echo "Stopping current container..."
sudo docker-compose down

echo ""
echo "Rebuilding and starting container..."
sudo docker-compose up -d --build

echo ""
echo "Waiting for container to start..."
sleep 5

echo ""
echo "Checking deployment status..."
./quick-check.sh

echo ""
echo "=== Redeploy Complete ==="
echo ""
echo "View logs: sudo docker logs -f wanderlens-app"
echo "Check status: ./quick-check.sh"
