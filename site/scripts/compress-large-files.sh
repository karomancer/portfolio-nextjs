#!/bin/bash

echo "🎯 Optimizing remaining large files for GitHub compatibility..."

# Target files over 50MB for aggressive compression
cd public/optimized/

echo "Processing large GIFs..."
for file in portfolio/youtopia/idea2_*.gif; do
  if [ -f "$file" ]; then
    echo "  🔄 Compressing: $file"
    # Convert large GIFs to MP4 for better compression
    ffmpeg -i "$file" -vf "scale=480:-1" -c:v libx264 -preset slow -crf 28 "${file%.gif}.mp4" -y
    rm "$file"
    echo "  ✅ Converted to MP4"
  fi
done

echo "Processing large videos..."
for file in portfolio/tv-remote/PXL_20220924_094602872_*.mp4 portfolio/cosmic-courier/interview.mp4; do
  if [ -f "$file" ]; then
    echo "  🔄 Re-compressing: $file"
    temp_file="${file%.mp4}_temp.mp4"
    # More aggressive compression
    ffmpeg -i "$file" -vf "scale='min(1280,iw)':'min(720,ih)'" -c:v libx264 -preset slow -crf 28 -c:a aac -b:a 128k "$temp_file" -y
    mv "$temp_file" "$file"
    echo "  ✅ Compressed"
  fi
done

echo "🎉 Large file optimization complete!"