#!/bin/bash
set -e

echo "📦 Installing dependencies..."
# Check if jq is available, install if needed
if ! command -v jq &> /dev/null; then
  echo "Installing jq..."
  if command -v apt-get &> /dev/null; then
    apt-get update && apt-get install -y jq
  elif command -v yum &> /dev/null; then
    yum install -y jq
  elif command -v brew &> /dev/null; then
    brew install jq
  else
    echo "❌ Cannot install jq. Please install it manually."
    exit 1
  fi
fi

echo "📦 Downloading admin artifact from GitHub Actions..."

# Get the latest successful workflow run
WORKFLOW_ID=$(curl -s -H "Authorization: Bearer $GITHUB_TOKEN" \
  "https://api.github.com/repos/giovannimirulla/medusa-backend/actions/workflows/build-admin.yml/runs?status=success&per_page=1" \
  | jq -r '.workflow_runs[0].id')

if [ "$WORKFLOW_ID" = "null" ] || [ -z "$WORKFLOW_ID" ]; then
  echo "❌ No successful workflow run found"
  exit 1
fi

echo "✅ Found workflow run: $WORKFLOW_ID"

# Get artifact download URL
ARTIFACT_URL=$(curl -s -H "Authorization: Bearer $GITHUB_TOKEN" \
  "https://api.github.com/repos/giovannimirulla/medusa-backend/actions/runs/$WORKFLOW_ID/artifacts" \
  | jq -r '.artifacts[] | select(.name=="admin-dashboard") | .archive_download_url')

if [ "$ARTIFACT_URL" = "null" ] || [ -z "$ARTIFACT_URL" ]; then
  echo "❌ Artifact not found"
  exit 1
fi

echo "✅ Downloading artifact from: $ARTIFACT_URL"

# Download and extract artifact
curl -L -H "Authorization: Bearer $GITHUB_TOKEN" \
  -o admin-dashboard.zip \
  "$ARTIFACT_URL"

echo "✅ Extracting artifact..."
unzip -q admin-dashboard.zip -d admin

echo "✅ Admin dashboard ready for deployment"
ls -la admin/
