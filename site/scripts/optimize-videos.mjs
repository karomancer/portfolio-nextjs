import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { glob } from "glob";

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.join(__dirname, "../public");
const OPTIMIZED_DIR = path.join(PUBLIC_DIR, "optimized");

async function ensureDirectoryExists(dirPath) {
  try {
    await fs.promises.mkdir(dirPath, { recursive: true });
  } catch (error) {
    if (error.code !== "EEXIST") {
      throw error;
    }
  }
}

async function getVideoInfo(inputPath) {
  try {
    const { stdout } = await execAsync(`ffprobe -v quiet -print_format json -show_format -show_streams "${inputPath}"`);
    const info = JSON.parse(stdout);
    const videoStream = info.streams.find(stream => stream.codec_type === 'video');
    
    return {
      duration: parseFloat(info.format.duration || 0),
      width: videoStream?.width || 0,
      height: videoStream?.height || 0,
      bitrate: parseInt(info.format.bit_rate || 0),
      codec: videoStream?.codec_name || 'unknown'
    };
  } catch (error) {
    console.warn(`Could not get info for ${inputPath}:`, error.message);
    return null;
  }
}

async function optimizeVideo(inputPath, outputPath, originalInfo) {
  try {
    // Create output directory
    await ensureDirectoryExists(path.dirname(outputPath));
    
    // Skip if output already exists and is newer
    try {
      const inputStats = await fs.promises.stat(inputPath);
      const outputStats = await fs.promises.stat(outputPath);
      if (outputStats.mtime > inputStats.mtime) {
        console.log(`  ⏭️  Skipping ${path.basename(outputPath)} (already optimized)`);
        return { skipped: true };
      }
    } catch (error) {
      // Output doesn't exist, continue with optimization
    }

    const startTime = Date.now();
    
    // Determine optimal settings based on input
    let crf = '28'; // Default quality (lower = better quality, higher file size)
    let preset = 'medium'; // Encoding speed vs compression efficiency
    let maxWidth = 1920; // Max width for web
    
    // Adjust settings based on original video properties
    if (originalInfo) {
      // For smaller videos, use better quality
      if (originalInfo.width <= 720) {
        crf = '26';
        maxWidth = 720;
      } else if (originalInfo.width <= 1280) {
        crf = '27';
        maxWidth = 1280;
      }
      
      // For very short videos (GIFs converted to video), use better quality
      if (originalInfo.duration < 10) {
        crf = '25';
      }
    }
    
    // Build ffmpeg command for web optimization
    const ffmpegCmd = [
      'ffmpeg',
      '-i', `"${inputPath}"`,
      '-c:v', 'libx264', // H.264 codec for wide browser support
      '-crf', crf, // Quality setting
      '-preset', preset, // Encoding speed
      '-c:a', 'aac', // AAC audio codec
      '-b:a', '128k', // Audio bitrate
      '-movflags', '+faststart', // Enable streaming (metadata at beginning)
      '-vf', `"scale=min(${maxWidth}\\,iw):-2"`, // Scale down if needed, maintain aspect ratio
      '-y', // Overwrite output file
      `"${outputPath}"`
    ].join(' ');
    
    console.log(`  🔄 Optimizing: ${path.basename(inputPath)}`);
    
    await execAsync(ffmpegCmd);
    
    const endTime = Date.now();
    const processingTime = ((endTime - startTime) / 1000).toFixed(1);
    
    // Get file sizes
    const inputStats = await fs.promises.stat(inputPath);
    const outputStats = await fs.promises.stat(outputPath);
    const compressionRatio = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1);
    
    console.log(`  ✅ Completed in ${processingTime}s - ${compressionRatio}% smaller`);
    
    return {
      success: true,
      originalSize: inputStats.size,
      optimizedSize: outputStats.size,
      compressionRatio: parseFloat(compressionRatio),
      processingTime: parseFloat(processingTime)
    };
    
  } catch (error) {
    console.error(`  ❌ Error optimizing ${inputPath}:`, error.message);
    return { error: error.message };
  }
}

async function optimizeVideos() {
  try {
    console.log("🎬 Starting video optimization...");
    
    // Find all video files
    const videoExtensions = ["mp4", "mov", "avi", "webm"];
    const videoPatterns = videoExtensions.map(ext => 
      path.join(PUBLIC_DIR, `**/*.${ext}`).replace(/\\/g, "/")
    );
    
    let allVideos = [];
    for (const pattern of videoPatterns) {
      const videos = await glob(pattern, { ignore: "**/optimized/**" });
      allVideos = allVideos.concat(videos);
    }
    
    if (allVideos.length === 0) {
      console.log("No video files found to optimize.");
      return;
    }
    
    console.log(`Found ${allVideos.length} video files to process.`);
    
    let stats = {
      processed: 0,
      skipped: 0,
      errors: 0,
      totalOriginalSize: 0,
      totalOptimizedSize: 0,
      totalProcessingTime: 0
    };
    
    // Process videos in small batches to avoid overwhelming the system
    const batchSize = 3;
    for (let i = 0; i < allVideos.length; i += batchSize) {
      const batch = allVideos.slice(i, i + batchSize);
      
      console.log(`\n📦 Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(allVideos.length / batchSize)}`);
      
      await Promise.all(
        batch.map(async (inputPath) => {
          // Create output path that preserves directory structure
          const relativePath = path.relative(PUBLIC_DIR, inputPath);
          const parsedPath = path.parse(relativePath);
          
          // Always output as .mp4 for web compatibility
          const outputPath = path.join(
            OPTIMIZED_DIR, 
            parsedPath.dir, 
            parsedPath.name + '.mp4'
          );
          
          console.log(`\n🎯 Processing: ${relativePath}`);
          
          // Get video info first
          const videoInfo = await getVideoInfo(inputPath);
          if (videoInfo) {
            console.log(`  📊 ${videoInfo.width}x${videoInfo.height}, ${(videoInfo.duration).toFixed(1)}s, ${videoInfo.codec}`);
          }
          
          const result = await optimizeVideo(inputPath, outputPath, videoInfo);
          
          if (result.skipped) {
            stats.skipped++;
          } else if (result.error) {
            stats.errors++;
          } else if (result.success) {
            stats.processed++;
            stats.totalOriginalSize += result.originalSize;
            stats.totalOptimizedSize += result.optimizedSize;
            stats.totalProcessingTime += result.processingTime;
          }
        })
      );
    }
    
    // Summary
    console.log("\n📊 Video Optimization Summary:");
    console.log(`✅ Processed: ${stats.processed} videos`);
    console.log(`⏭️ Skipped: ${stats.skipped} videos`);
    console.log(`❌ Errors: ${stats.errors} videos`);
    
    if (stats.processed > 0) {
      const totalCompressionRatio = ((1 - stats.totalOptimizedSize / stats.totalOriginalSize) * 100).toFixed(1);
      const avgProcessingTime = (stats.totalProcessingTime / stats.processed).toFixed(1);
      
      console.log(`📉 Total size reduction: ${totalCompressionRatio}%`);
      console.log(`📏 Original total size: ${(stats.totalOriginalSize / (1024 * 1024)).toFixed(1)} MB`);
      console.log(`📏 Optimized total size: ${(stats.totalOptimizedSize / (1024 * 1024)).toFixed(1)} MB`);
      console.log(`⏱️ Average processing time: ${avgProcessingTime}s per video`);
      console.log(`⏱️ Total processing time: ${(stats.totalProcessingTime / 60).toFixed(1)} minutes`);
    }
    
    console.log("\n🎬 Video optimization complete!");
    
  } catch (error) {
    console.error("❌ Error during video optimization:", error);
    process.exit(1);
  }
}

// Run the optimization
optimizeVideos();