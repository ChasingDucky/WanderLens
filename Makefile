.PHONY: help build start stop restart logs status clean rebuild dev install

# Variables
DOCKER_COMPOSE = docker-compose
CONTAINER_NAME = wanderlens-app
PORT = 3666

# Default target
help:
	@echo "WanderLens - Available Commands:"
	@echo ""
	@echo "  make install    - Install dependencies"
	@echo "  make dev        - Run development server"
	@echo "  make build-app  - Build Next.js application"
	@echo ""
	@echo "  make build      - Build Docker image"
	@echo "  make start      - Start Docker container"
	@echo "  make stop       - Stop Docker container"
	@echo "  make restart    - Restart Docker container"
	@echo "  make logs       - View container logs"
	@echo "  make status     - Check container status"
	@echo "  make rebuild    - Rebuild and restart container"
	@echo "  make clean      - Remove containers and images"
	@echo ""
	@echo "  make test       - Run tests (when implemented)"
	@echo "  make lint       - Run linter"
	@echo ""

# Development
install:
	npm install

dev:
	npm run dev

build-app:
	npm run build

lint:
	npm run lint

# Docker commands
build:
	@echo "Building Docker image..."
	$(DOCKER_COMPOSE) build
	@echo "✓ Build completed"

start:
	@echo "Starting WanderLens container..."
	$(DOCKER_COMPOSE) up -d
	@echo "✓ WanderLens is running at http://localhost:$(PORT)"

stop:
	@echo "Stopping WanderLens container..."
	$(DOCKER_COMPOSE) down
	@echo "✓ Container stopped"

restart: stop start

logs:
	$(DOCKER_COMPOSE) logs -f

status:
	$(DOCKER_COMPOSE) ps

rebuild: stop build start
	@echo "✓ Rebuild completed"

clean:
	@echo "Cleaning up Docker resources..."
	$(DOCKER_COMPOSE) down -v
	docker rmi wanderlens:latest 2>/dev/null || true
	@echo "✓ Cleanup completed"

test:
	@echo "Tests not yet implemented"
