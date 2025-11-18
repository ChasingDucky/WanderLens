#!/bin/bash

# WanderLens Docker Management Script
# Usage: ./docker-start.sh [command]

set -e

CONTAINER_NAME="wanderlens-app"
IMAGE_NAME="wanderlens"
PORT=3666

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Print colored message
print_msg() {
    echo -e "${GREEN}[WanderLens]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Check if Docker is running
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        print_error "Docker is not running. Please start Docker first."
        exit 1
    fi
    print_msg "Docker is running ✓"
}

# Build Docker image
build() {
    print_msg "Building Docker image..."
    docker build -t $IMAGE_NAME:latest .
    print_msg "Build completed successfully ✓"
}

# Start container with docker-compose
start() {
    print_msg "Starting WanderLens container..."
    docker-compose up -d
    print_msg "Container started successfully ✓"
    print_msg "WanderLens is running at http://localhost:$PORT"
}

# Stop container
stop() {
    print_msg "Stopping WanderLens container..."
    docker-compose down
    print_msg "Container stopped successfully ✓"
}

# Restart container
restart() {
    print_msg "Restarting WanderLens container..."
    stop
    start
}

# View logs
logs() {
    print_msg "Showing container logs (Ctrl+C to exit)..."
    docker-compose logs -f
}

# Check container status
status() {
    print_msg "Container status:"
    docker-compose ps
}

# Clean up (remove images and containers)
clean() {
    print_warning "This will remove all WanderLens containers and images."
    read -p "Are you sure? (y/N) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        print_msg "Cleaning up..."
        docker-compose down -v
        docker rmi $IMAGE_NAME:latest 2>/dev/null || true
        print_msg "Cleanup completed ✓"
    else
        print_msg "Cleanup cancelled"
    fi
}

# Full rebuild (clean + build + start)
rebuild() {
    print_msg "Full rebuild starting..."
    stop || true
    build
    start
    print_msg "Rebuild completed ✓"
}

# Show help
help() {
    echo -e "${BLUE}WanderLens Docker Management Script${NC}"
    echo ""
    echo "Usage: ./docker-start.sh [command]"
    echo ""
    echo "Commands:"
    echo "  build       Build Docker image"
    echo "  start       Start the container"
    echo "  stop        Stop the container"
    echo "  restart     Restart the container"
    echo "  logs        View container logs"
    echo "  status      Check container status"
    echo "  rebuild     Clean, build, and start"
    echo "  clean       Remove containers and images"
    echo "  help        Show this help message"
    echo ""
    echo "Examples:"
    echo "  ./docker-start.sh build"
    echo "  ./docker-start.sh start"
    echo "  ./docker-start.sh logs"
}

# Main script logic
main() {
    check_docker

    case "${1:-help}" in
        build)
            build
            ;;
        start)
            start
            ;;
        stop)
            stop
            ;;
        restart)
            restart
            ;;
        logs)
            logs
            ;;
        status)
            status
            ;;
        rebuild)
            rebuild
            ;;
        clean)
            clean
            ;;
        help|--help|-h)
            help
            ;;
        *)
            print_error "Unknown command: $1"
            help
            exit 1
            ;;
    esac
}

main "$@"
