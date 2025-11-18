#!/bin/bash

echo "=== Checking if latest code is deployed ==="
echo ""

# Check git status
echo "1. Git Status:"
git status
echo ""

echo "2. Latest commit:"
git log -1 --oneline
echo ""

echo "3. Remote latest commit:"
git fetch origin
git log origin/claude/wanderlens-travel-platform-01DCATzvoFeYLJpv1M2zmNPg -1 --oneline
echo ""

# Check if local is behind remote
LOCAL=$(git rev-parse HEAD)
REMOTE=$(git rev-parse origin/claude/wanderlens-travel-platform-01DCATzvoFeYLJpv1M2zmNPg)

if [ "$LOCAL" = "$REMOTE" ]; then
    echo "✓ Local is up to date with remote"
else
    echo "✗ Local is BEHIND remote - need to pull!"
    echo ""
    echo "Run: git pull"
fi

echo ""
echo "4. Check if gemini-pro is in current code:"
if grep -q "gemini-pro" app/api/agents/chat/route.ts; then
    echo "✓ Found 'gemini-pro' in route.ts"
else
    echo "✗ NOT found 'gemini-pro' in route.ts - using old code!"
fi

echo ""
echo "5. Current Docker container build:"
sudo docker inspect wanderlens-app --format='{{.Created}}'

echo ""
echo "=== Recommendation ==="
echo "If local is behind or using old model:"
echo "1. git pull"
echo "2. ./REDEPLOY.sh"
