#!/bin/sh

# Check if cwebp is installed
if ! command -v cwebp >/dev/null 2>&1; then
  echo "Error: cwebp is not installed."
  echo "Please install it using: brew install webp"
  exit 1
fi

IMG_DIR="$(dirname "$0")/../images"

for img in "$IMG_DIR"/*.jpg "$IMG_DIR"/*.jpeg "$IMG_DIR"/*.png; do
  [ -e "$img" ] || continue
  webp="${img%.*}.webp"
  cwebp "$img" -o "$webp"
done
