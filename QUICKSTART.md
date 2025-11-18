# 🚀 WanderLens Quick Start Guide

Get WanderLens running in under 5 minutes!

## Choose Your Path

### 🏃 Super Quick (Docker - Recommended)

**Requirements**: Docker installed

```bash
# 1. Clone and enter directory
git clone <repo-url>
cd WanderLens

# 2. Start with one command
docker-compose up -d

# 3. Open browser
open http://localhost:3666
```

That's it! 🎉

---

### 💻 Development Mode

**Requirements**: Node.js 18+

```bash
# 1. Clone repository
git clone <repo-url>
cd WanderLens

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev

# 4. Open browser
open http://localhost:3000
```

---

### 🐳 Docker (Detailed)

#### Option A: Docker Compose
```bash
# Build and start
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

#### Option B: Helper Script
```bash
# Make executable
chmod +x docker-start.sh

# Build and start
./docker-start.sh build
./docker-start.sh start

# Check status
./docker-start.sh status
```

#### Option C: Makefile
```bash
# Build
make build

# Start
make start

# View logs
make logs

# Stop
make stop
```

---

## Access Points

| Mode | URL | Port |
|------|-----|------|
| Development | http://localhost:3000 | 3000 |
| Docker | http://localhost:3666 | 3666 |

---

## Common Commands

### Development
```bash
npm run dev         # Start dev server
npm run build       # Build for production
npm start           # Start production server
npm run lint        # Run linter
```

### Docker
```bash
docker-compose up -d              # Start
docker-compose down               # Stop
docker-compose logs -f            # View logs
docker-compose ps                 # Check status
docker-compose build --no-cache   # Rebuild from scratch
```

### Make
```bash
make help           # Show all commands
make dev            # Run dev server
make build          # Build Docker image
make start          # Start Docker container
make logs           # View logs
make clean          # Clean up Docker resources
```

---

## Troubleshooting

### Port already in use?

**Development (port 3000):**
```bash
# Find and kill process
lsof -i :3000
kill -9 <PID>
```

**Docker (port 3666):**
```bash
# Find and kill process
lsof -i :3666
kill -9 <PID>

# Or change port in docker-compose.yml
```

### Docker build fails?

```bash
# Clean build
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Dependencies issues?

```bash
# Clean reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## Next Steps

1. ✅ Application running
2. 📚 Read the [README](README.md) for features
3. 🐳 Check [DOCKER.md](DOCKER.md) for deployment
4. 📝 Review [CHANGELOG.md](CHANGELOG.md) for updates

---

## Features Overview

- 🔍 **Flight Search** - Compare prices, view trends
- 🏨 **Hotel Search** - Filter by price, rating, location
- 📅 **Itinerary Planner** - Organize your trip
- 📊 **Price Predictions** - Know when to book
- 🌱 **Eco-Friendly** - Track carbon emissions
- ❤️ **Favorites** - Save your preferred options

---

## Need Help?

- 📖 [Full Documentation](README.md)
- 🐳 [Docker Guide](DOCKER.md)
- 📝 [Changelog](CHANGELOG.md)
- 🆘 [Help Page](http://localhost:3666/help) (when running)

---

**Happy Traveling! ✈️🌍**
