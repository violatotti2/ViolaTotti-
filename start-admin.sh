#!/usr/bin/env bash
set -e
PORT=${PORT:-8080}
CMS_PORT=${CMS_PORT:-8081}

echo "➡️ Avvio Decap CMS (local backend) sulla porta $CMS_PORT ..."
npx --yes decap-server -p "$CMS_PORT" &
CMS_PID=$!
sleep 1

echo "➡️ Avvio server statico su http://localhost:$PORT ..."
if command -v python3 >/dev/null 2>&1; then
  python3 -m http.server "$PORT"
else
  python -m http.server "$PORT"
fi

echo "➡️ Spengo il proxy del CMS ..."
kill $CMS_PID 2>/dev/null || true
