#!/bin/sh
# Builds the Android APK and publishes it at https://focus.salemkode.com/android.
#
# The APK is signed with the Focus Garden release key (see plugins/withReleaseSigning.js) and
# built for arm64-v8a only, which every current Android phone uses, so it is a third of the size
# of an all-architectures build. Each version is uploaded under its own name to the R2 bucket
# focus-garden-downloads (https://focus-download.salemkode.com), and the landing page's
# /android redirect is pointed at it. Deploy the landing page afterwards to publish the redirect.
#
# Usage: scripts/android-release.sh <versionCode>   (higher than the last published one)
set -eu
VERSION_CODE=${1:?versionCode, higher than the last published APK}
ROOT=$(cd "$(dirname "$0")/.." && pwd)
REPO=$(cd "$ROOT/../.." && pwd)
BUCKET=focus-garden-downloads
HOST=https://focus-download.salemkode.com
# SHA-256 of the Focus Garden release certificate. A build signed with anything else is refused.
RELEASE_CERT=59904efde3e1bec54a5e4f33e969062b97766f9077b5a0d4baaf39df7199e915

grep -q '^FOCUS_GARDEN_RELEASE_STORE_FILE=' "$HOME/.gradle/gradle.properties" 2>/dev/null \
  || { echo "The release key is not configured in ~/.gradle/gradle.properties (see plugins/withReleaseSigning.js)." >&2; exit 1; }

cd "$ROOT"
ANDROID_VERSION_CODE=$VERSION_CODE CI=1 npx expo prebuild --platform android --no-install
(cd android && ./gradlew assembleRelease -PreactNativeArchitectures=arm64-v8a)

APK=$ROOT/android/app/build/outputs/apk/release/app-release.apk
BUILD_TOOLS=$(ls -d "${ANDROID_HOME:-$HOME/Library/Android/sdk}"/build-tools/* | grep -v rc | sort -V | tail -1)
# apksigner 36 prints "Signer #1 certificate SHA-256 digest: …", 37 prints "V2 Signer: certificate SHA-256 digest: …".
CERT=$("$BUILD_TOOLS/apksigner" verify --print-certs "$APK" | sed -n 's/^.*certificate SHA-256 digest: //p' | sort -u)
[ "$CERT" = "$RELEASE_CERT" ] || { echo "Refusing to publish: the APK is signed with $CERT, not the release key." >&2; exit 1; }
AAPT=$BUILD_TOOLS/aapt; [ -x "$AAPT" ] || AAPT=$BUILD_TOOLS/aapt2
BADGING=$("$AAPT" dump badging "$APK" | head -1)
echo "$BADGING" | grep -q "versionCode='$VERSION_CODE'" || { echo "Unexpected versionCode: $BADGING" >&2; exit 1; }
VERSION_NAME=$(echo "$BADGING" | sed -n "s/.*versionName='\([^']*\)'.*/\1/p")

NAME=focus-garden-$VERSION_NAME-$VERSION_CODE.apk
cf r2 objects put "android/$NAME" --bucket-name "$BUCKET" --file "$APK" \
  --content-type application/vnd.android.package-archive >/dev/null
curl -fsI "$HOST/android/$NAME" >/dev/null || { echo "Uploaded, but $HOST/android/$NAME does not answer." >&2; exit 1; }

printf '/android %s/android/%s 302\n' "$HOST" "$NAME" > "$REPO/packages/landing/public/_redirects"
echo "Published $HOST/android/$NAME ($(du -h "$APK" | cut -f1))."
echo "Next: deploy the landing page so https://focus.salemkode.com/android points at it:"
echo "  cd packages/landing && bun run build && cf deploy ./dist"
