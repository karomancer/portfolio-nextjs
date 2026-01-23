#!/bin/sh

# Install git hooks from scripts/hooks to .git/hooks
# Run this after cloning the repo or after npm install

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
HOOKS_SOURCE="$SCRIPT_DIR/hooks"
GIT_HOOKS_DIR="$SCRIPT_DIR/../../.git/hooks"

echo "📦 Installing git hooks..."

# Check if .git/hooks exists
if [ ! -d "$GIT_HOOKS_DIR" ]; then
    echo "❌ Could not find .git/hooks directory at $GIT_HOOKS_DIR"
    exit 1
fi

# Copy all hooks
for hook in "$HOOKS_SOURCE"/*; do
    if [ -f "$hook" ]; then
        hook_name=$(basename "$hook")
        cp "$hook" "$GIT_HOOKS_DIR/$hook_name"
        chmod +x "$GIT_HOOKS_DIR/$hook_name"
        echo "  ✅ Installed $hook_name"
    fi
done

echo "✅ Git hooks installed successfully!"
