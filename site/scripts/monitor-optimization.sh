#!/bin/bash

# Monitor optimization progress
echo "=== OPTIMIZATION PROGRESS MONITOR ==="
echo "Press Ctrl+C to stop monitoring"
echo

while true; do
    clear
    echo "=== OPTIMIZATION PROGRESS $(date) ==="
    echo
    
    # Video progress
    video_count=$(find public/optimized/portfolio/ -name "*.mp4" 2>/dev/null | wc -l | tr -d ' ')
    echo "🎬 Videos optimized: $video_count / ~112"
    
    # Image progress  
    image_count=$(find public/optimized/portfolio/ -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" -o -name "*.gif" -o -name "*.webp" 2>/dev/null | wc -l | tr -d ' ')
    echo "🖼️  Images optimized: $image_count / ~532"
    
    # Check if processes are still running
    video_running=$(ps aux | grep "optimize-videos" | grep -v grep | wc -l | tr -d ' ')
    image_running=$(ps aux | grep "optimize-images" | grep -v grep | wc -l | tr -d ' ')
    
    echo
    echo "📊 Process Status:"
    if [ "$video_running" -gt 0 ]; then
        echo "   🎬 Video optimization: RUNNING"
    else
        echo "   🎬 Video optimization: STOPPED"
    fi
    
    if [ "$image_running" -gt 0 ]; then
        echo "   🖼️  Image optimization: RUNNING"
    else
        echo "   🖼️  Image optimization: STOPPED"
    fi
    
    echo
    echo "Latest optimized files:"
    find public/optimized/ -name "*.mp4" -o -name "*.webp" -o -name "*.jpg" -o -name "*.png" 2>/dev/null | sort -t/ -k4 | tail -5
    
    sleep 3
done