#!/usr/bin/env bash
# bootstrap.sh — one-time Linode server setup for InfrastructureSickos Minecraft server
# Runs on Ubuntu 22.04 LTS. Idempotent where possible.
set -euo pipefail

MINECRAFT_DIR=/opt/minecraft
MCADMIN_USER=mcadmin
FORGE_VERSION=1.20.1-47.3.12
FORGE_JAR=forge-${FORGE_VERSION}-server.jar

# --- JDK 17 via Adoptium Temurin ---
if ! java -version 2>&1 | grep -q 'version "17'; then
  apt-get update -y
  apt-get install -y wget apt-transport-https gnupg
  wget -qO - https://packages.adoptium.net/artifactory/api/gpg/key/public \
    | gpg --dearmor -o /usr/share/keyrings/adoptium.gpg
  echo "deb [signed-by=/usr/share/keyrings/adoptium.gpg] https://packages.adoptium.net/artifactory/deb $(lsb_release -sc) main" \
    > /etc/apt/sources.list.d/adoptium.list
  apt-get update -y
  apt-get install -y temurin-17-jdk
fi

# --- mcadmin user ---
if ! id "$MCADMIN_USER" &>/dev/null; then
  useradd -r -m -s /bin/bash "$MCADMIN_USER"
fi

# --- /opt/minecraft directory ---
mkdir -p "$MINECRAFT_DIR"
chown "$MCADMIN_USER:$MCADMIN_USER" "$MINECRAFT_DIR"

# --- Forge server JAR ---
# Place forge-<version>-server.jar in $MINECRAFT_DIR before running this script,
# or copy it here after the Forge installer produces it.
if [ ! -f "$MINECRAFT_DIR/$FORGE_JAR" ]; then
  echo "WARNING: $MINECRAFT_DIR/$FORGE_JAR not found."
  echo "Run the Forge installer and copy the resulting server jar to $MINECRAFT_DIR/$FORGE_JAR"
fi

# --- eula.txt ---
if [ ! -f "$MINECRAFT_DIR/eula.txt" ] || ! grep -q "eula=true" "$MINECRAFT_DIR/eula.txt"; then
  echo "eula=true" > "$MINECRAFT_DIR/eula.txt"
  chown "$MCADMIN_USER:$MCADMIN_USER" "$MINECRAFT_DIR/eula.txt"
fi

# --- systemd unit ---
cat > /etc/systemd/system/minecraft.service <<EOF
[Unit]
Description=InfrastructureSickos Minecraft Server
After=network.target

[Service]
User=${MCADMIN_USER}
WorkingDirectory=${MINECRAFT_DIR}
ExecStart=/usr/bin/java -Xms4G -Xmx4G -jar ${MINECRAFT_DIR}/${FORGE_JAR} nogui
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable minecraft.service

# --- CI deploy key ---
AUTHORIZED_KEYS="/home/${MCADMIN_USER}/.ssh/authorized_keys"
mkdir -p "/home/${MCADMIN_USER}/.ssh"
chmod 700 "/home/${MCADMIN_USER}/.ssh"
touch "$AUTHORIZED_KEYS"
chmod 600 "$AUTHORIZED_KEYS"
chown -R "$MCADMIN_USER:$MCADMIN_USER" "/home/${MCADMIN_USER}/.ssh"

# Replace the line below with the actual CI deploy public key
CI_DEPLOY_KEY="ssh-ed25519 AAAAC3Nza... ci-deploy-key@infrastructuresickos"
if ! grep -qF "$CI_DEPLOY_KEY" "$AUTHORIZED_KEYS"; then
  echo "$CI_DEPLOY_KEY" >> "$AUTHORIZED_KEYS"
fi

echo "Bootstrap complete."
