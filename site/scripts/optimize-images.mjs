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

async function getImageInfo(inputPath) {
  try {
    const { stdout } = await execAsync(
      `identify -format "%wx%h %[colorspace] %b" "${inputPath}"`
    );
    const parts = stdout.trim().split(" ");
    const dimensions = parts[0];
    const [width, height] = dimensions.split("x").map(Number);

    return {
      width,
      height,
      colorspace: parts[1] || "unknown",
      size: parts[2] || "0B",
      format: path.extname(inputPath).toLowerCase().substring(1),
    };
  } catch (error) {
    console.warn(`Could not get info for ${inputPath}:`, error.message);
    return null;
  }
}

async function optimizeImage(inputPath, outputPath) {
  try {
    await ensureDirectoryExists(path.dirname(outputPath));

    // Skip if output already exists and is newer
    try {
      const inputStats = await fs.promises.stat(inputPath);
      const outputStats = await fs.promises.stat(outputPath);

      if (outputStats.mtime > inputStats.mtime) {
        return { skipped: true, reason: "already optimized" };
      }
    } catch (error) {
      // Output doesn't exist, proceed with optimization
    }

    const startTime = Date.now();
    const outputExt = path.extname(outputPath).toLowerCase();

    // Get input file size BEFORE optimization
    const inputStats = await fs.promises.stat(inputPath);

    // Determine quality settings based on output format
    let quality = 85;
    let additionalOptions = "";

    if (outputExt === ".webp") {
      quality = 80;
      additionalOptions = "-define webp:method=6";
    } else if (outputExt === ".jpg" || outputExt === ".jpeg") {
      quality = 85;
      additionalOptions = "-sampling-factor 4:2:0 -strip";
    } else if (outputExt === ".png") {
      additionalOptions = "-strip";
    }

    // Build ImageMagick command
    const magickCmd = [
      "magick",
      `"${inputPath}"`,
      "-quality",
      quality,
      "-resize",
      "2048x2048>",
      "-auto-orient",
      additionalOptions,
      `"${outputPath}"`,
    ]
      .filter(Boolean)
      .join(" ");

    console.log(`  🔄 Optimizing: ${path.basename(inputPath)}`);

    await execAsync(magickCmd);

    const endTime = Date.now();
    const processingTime = ((endTime - startTime) / 1000).toFixed(1);

    // Get output file size AFTER optimization
    const outputStats = await fs.promises.stat(outputPath);
    const compressionRatio = (
      (1 - outputStats.size / inputStats.size) *
      100
    ).toFixed(1);

    // Check if optimization actually made the file larger
    if (outputStats.size > inputStats.size) {
      console.log(
        `  ⚠️  Optimization made file larger (+${Math.abs(
          parseFloat(compressionRatio)
        ).toFixed(1)}%), keeping original`
      );
      // Remove the "optimized" file and copy the original instead
      await fs.promises.unlink(outputPath);
      await fs.promises.copyFile(inputPath, outputPath);

      return {
        success: true,
        originalSize: inputStats.size,
        optimizedSize: inputStats.size,
        compressionRatio: 0,
        processingTime: parseFloat(processingTime),
        keptOriginal: true,
      };
    }

    console.log(
      `  ✅ Completed in ${processingTime}s - ${compressionRatio}% smaller`
    );

    return {
      success: true,
      originalSize: inputStats.size,
      optimizedSize: outputStats.size,
      compressionRatio: parseFloat(compressionRatio),
      processingTime: parseFloat(processingTime),
    };
  } catch (error) {
    console.error(`  ❌ Error optimizing ${inputPath}:`, error.message);
    return { error: error.message };
  }
}

async function main() {
  console.log("🖼️  Starting image optimization...");

  // Check if ImageMagick is available
  try {
    await execAsync("magick -version");
  } catch (error) {
    console.error("❌ ImageMagick not found. Please install it first:");
    console.error("   brew install imagemagick");
    process.exit(1);
  }

  // Find all image files
  const imagePatterns = [
    `${PUBLIC_DIR}/portfolio/**/*.{jpg,jpeg,png,gif}`,
    `${PUBLIC_DIR}/images/**/*.{jpg,jpeg,png,gif}`,
  ];

  let allImages = [];
  for (const pattern of imagePatterns) {
    const images = await glob(pattern, { ignore: "**/optimized/**" });
    allImages = allImages.concat(images);
  }

  if (allImages.length === 0) {
    console.log("No image files found to optimize.");
    return;
  }

  console.log(`Found ${allImages.length} image files to process.`);

  let stats = {
    processed: 0,
    skipped: 0,
    errors: 0,
    totalOriginalSize: 0,
    totalOptimizedSize: 0,
    totalProcessingTime: 0,
    jpegToWebp: 0,
    keptOriginal: 0,
  };

  // Process images in batches
  const batchSize = 5;
  for (let i = 0; i < allImages.length; i += batchSize) {
    const batch = allImages.slice(i, i + batchSize);

    console.log(
      `\n📦 Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(
        allImages.length / batchSize
      )}`
    );

    await Promise.all(
      batch.map(async (inputPath) => {
        const relativePath = path.relative(PUBLIC_DIR, inputPath);
        const parsedPath = path.parse(relativePath);

        // Convert JPEG/JPG to WebP for better compression
        let outputExtension = parsedPath.ext;
        if (
          parsedPath.ext.toLowerCase() === ".jpg" ||
          parsedPath.ext.toLowerCase() === ".jpeg"
        ) {
          outputExtension = ".webp";
          stats.jpegToWebp++;
        }

        const outputPath = path.join(
          OPTIMIZED_DIR,
          parsedPath.dir,
          parsedPath.name + outputExtension
        );

        console.log(`\n🎯 Processing: ${relativePath}`);

        // Get image info
        const imageInfo = await getImageInfo(inputPath);
        if (imageInfo) {
          console.log(
            `  📊 ${imageInfo.width}x${
              imageInfo.height
            }, ${imageInfo.format.toUpperCase()}, ${imageInfo.size}`
          );
        }

        const result = await optimizeImage(inputPath, outputPath);

        if (result.skipped) {
          console.log(
            `  ⏭️  Skipping ${path.basename(inputPath)} (${result.reason})`
          );
          stats.skipped++;
        } else if (result.success) {
          stats.processed++;
          stats.totalOriginalSize += result.originalSize;
          stats.totalOptimizedSize += result.optimizedSize;
          stats.totalProcessingTime += result.processingTime;
          if (result.keptOriginal) {
            stats.keptOriginal++;
          }
        } else if (result.error) {
          stats.errors++;
        }
      })
    );

    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  // Print final statistics
  const totalSavings =
    stats.totalOriginalSize > 0
      ? (
          (1 - stats.totalOptimizedSize / stats.totalOriginalSize) *
          100
        ).toFixed(1)
      : 0;

  console.log("\n🎉 Image optimization complete!");
  console.log(`✅ Processed: ${stats.processed} images`);
  console.log(`📸 JPEG → WebP conversions: ${stats.jpegToWebp}`);
  console.log(
    `🔄 Kept original (optimization made larger): ${stats.keptOriginal}`
  );
  console.log(`⏭️  Skipped: ${stats.skipped} images`);
  console.log(`❌ Errors: ${stats.errors} images`);
  console.log(`💾 Total size reduction: ${totalSavings}%`);
  console.log(
    `⏱️  Total processing time: ${stats.totalProcessingTime.toFixed(1)}s`
  );

  if (stats.jpegToWebp > 0) {
    console.log(
      `\n🔄 Next step: Run 'npm run update-image-refs' to update markdown references`
    );
  }
}

main().catch(console.error);
