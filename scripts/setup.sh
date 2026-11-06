#!/bin/sh
set -eu

install_dependencies() {
    if ! command -v nodejs >/dev/null 2>&1; then
        echo "Installing nodejs..."
        sudo apt-get update && sudo apt-get install -y nodejs > /dev/null
    fi
    if ! command -v npm >/dev/null 2>&1; then
        echo "Installing npm..."
        sudo apt-get update && sudo apt-get install -y npm > /dev/null
    fi
}

install_dependencies

npm install > /dev/null