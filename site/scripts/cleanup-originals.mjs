import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { glob } from "glob";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PUBLIC_DIR = path.join(__dirname, "../public");

async function main() {
  console.log("🧹 Starting cleanup of original files...");

  // Find original image files that have optimized versions
  const originalImages = await glob(
    `${PUBLIC_DIR}/portfolio/**/*.{jpg,jpeg,png,gif}`,
    {
      ignore: "**/optimized/**",
    }
  );

  const originalVideos = await glob(`${PUBLIC_DIR}/**/*.{mp4,mov}`, {
    ignore: "**/optimized/**",
  });

  let deletedImages = 0;
  let deletedVideos = 0;
  let spaceFreed = 0;

  console.log(`\nChecking ${originalImages.length} original images...`);

  for (const originalPath of originalImages) {
    const relativePath = path.relative(PUBLIC_DIR, originalPath);
    const parsedPath = path.parse(relativePath);

    // Check for WebP version in optimized folder
    let optimizedPath = path.join(
      PUBLIC_DIR,
      "optimized",
      parsedPath.dir,
      parsedPath.name + ".webp"
    );

    // Also check for same format in optimized folder
    if (!fs.existsSync(optimizedPath)) {
      optimizedPath = path.join(
        PUBLIC_DIR,
        "optimized",
        parsedPath.dir,
        parsedPath.name + parsedPath.ext
      );
    }

    if (fs.existsSync(optimizedPath)) {
      const stats = await fs.promises.stat(originalPath);
      spaceFreed += stats.size;
      await fs.promises.unlink(originalPath);
      console.log(`  🗑️  Deleted: ${relativePath}`);
      deletedImages++;
    }
  }

  console.log(`\nChecking ${originalVideos.length} original videos...`);

  for (const originalPath of originalVideos) {
    const relativePath = path.relative(PUBLIC_DIR, originalPath);
    const parsedPath = path.parse(relativePath);

    // Check for MP4 version in optimized folder
    const optimizedPath = path.join(
      PUBLIC_DIR,
      "optimized",
      parsedPath.dir,
      parsedPath.name + ".mp4"
    );

    if (fs.existsSync(optimizedPath)) {
      const stats = await fs.promises.stat(originalPath);
      spaceFreed += stats.size;
      await fs.promises.unlink(originalPath);
      console.log(`  🗑️  Deleted: ${relativePath}`);
      deletedVideos++;
    }
  }

  console.log(`\n✅ Cleanup complete!`);
  console.log(`🖼️  Deleted ${deletedImages} original images`);
  console.log(`🎬 Deleted ${deletedVideos} original videos`);
  console.log(`💾 Space freed: ${(spaceFreed / 1024 / 1024).toFixed(1)} MB`);

  console.log(
    `\n⚠️  IMPORTANT: Make sure to run 'npm run update-image-refs' and 'npm run update-video-refs' first!`
  );
  console.log(`   Original files are needed for reference updates.`);
}

main().catch(console.error);
