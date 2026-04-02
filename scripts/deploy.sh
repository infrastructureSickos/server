#!/usr/bin/env bash
# deploy.sh — called by CI on each deploy to update the Minecraft server
# Usage: deploy.sh <tarball-path>
set -euo pipefail

TARBALL="${1:?Usage: deploy.sh <tarball-path>}"
MINECRAFT_DIR=/opt/minecraft

systemctl stop minecraft.service

tar -xf "$TARBALL" -C "$MINECRAFT_DIR"

systemctl start minecraft.service

echo "Deploy complete."
