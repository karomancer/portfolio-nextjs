import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { glob } from "glob";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORTFOLIO_DIR = path.join(__dirname, "../src/content/portfolio");

async function updateVideoReferences() {
  try {
    console.log("🎬 Starting video reference updates...");

    // Get all markdown files
    const markdownFiles = await glob(
      path.join(PORTFOLIO_DIR, "*.md").replace(/\\/g, "/")
    );

    let totalUpdates = 0;

    for (const filePath of markdownFiles) {
      console.log(`📝 Processing: ${path.basename(filePath)}`);

      let content = fs.readFileSync(filePath, "utf8");
      let fileUpdates = 0;

      // Replace video references that point to /portfolio/ with /optimized/portfolio/
      // Handle both .mp4 and .mov files, but always output .mp4 (since we convert to mp4)
      const videoRegex =
        /!\[([^\]]*)\]\(\/portfolio\/([^)]+\.(mp4|mov|avi|webm))\)/gi;

      content = content.replace(
        videoRegex,
        (match, altText, videoPath, extension) => {
          // Convert the path to optimized version
          // Always use .mp4 as the extension since we convert all videos to mp4
          const pathWithoutExtension = videoPath.replace(
            /\.(mp4|mov|avi|webm)$/i,
            ""
          );
          const newPath = `/optimized/portfolio/${pathWithoutExtension}.mp4`;
          fileUpdates++;
          console.log(`  ✅ /portfolio/${videoPath} → ${newPath}`);
          return `![${altText}](${newPath})`;
        }
      );

      if (fileUpdates > 0) {
        fs.writeFileSync(filePath, content, "utf8");
        console.log(
          `  📊 Updated ${fileUpdates} references in ${path.basename(filePath)}`
        );
        totalUpdates += fileUpdates;
      } else {
        console.log(
          `  ⏭️  No video references to update in ${path.basename(filePath)}`
        );
      }
    }

    console.log("✅ Video reference updates complete!");
    console.log(
      `📊 Total updates: ${totalUpdates} references across ${markdownFiles.length} files`
    );
  } catch (error) {
    console.error("❌ Error updating video references:", error);
    process.exit(1);
  }
}

// Run the update
updateVideoReferences();
