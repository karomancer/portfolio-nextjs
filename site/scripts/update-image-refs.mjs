import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { glob } from "glob";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONTENT_DIR = path.join(__dirname, "../src/content");

async function updateImageReferences() {
  console.log("🔄 Updating image references in markdown files...");
  
  // Find all markdown files
  const mdFiles = await glob(`${CONTENT_DIR}/**/*.md`);
  
  let totalUpdates = 0;
  let filesModified = 0;
  
  for (const mdFile of mdFiles) {
    const content = await fs.promises.readFile(mdFile, 'utf-8');
    let updatedContent = content;
    let fileUpdates = 0;
    
    // Replace image references: /portfolio/ -> /optimized/portfolio/
    // Also convert .jpg and .jpeg extensions to .webp
    updatedContent = updatedContent.replace(
      /!\[([^\]]*)\]\((\/portfolio\/[^)]+\.(jpe?g|png|gif))\)/gi,
      (match, alt, imagePath, extension) => {
        fileUpdates++;
        
        // Convert JPEG to WebP, keep other formats as-is
        let newPath = imagePath.replace(/^\/portfolio\//, '/optimized/portfolio/');
        if (extension.toLowerCase() === 'jpg' || extension.toLowerCase() === 'jpeg') {
          newPath = newPath.replace(/\.(jpe?g)$/i, '.webp');
        }
        
        return `![${alt}](${newPath})`;
      }
    );
    
    // Also handle images in other directories
    updatedContent = updatedContent.replace(
      /!\[([^\]]*)\]\((\/images\/[^)]+\.(jpe?g|png|gif))\)/gi,
      (match, alt, imagePath, extension) => {
        fileUpdates++;
        
        let newPath = imagePath.replace(/^\/images\//, '/optimized/images/');
        if (extension.toLowerCase() === 'jpg' || extension.toLowerCase() === 'jpeg') {
          newPath = newPath.replace(/\.(jpe?g)$/i, '.webp');
        }
        
        return `![${alt}](${newPath})`;
      }
    );
    
    if (fileUpdates > 0) {
      await fs.promises.writeFile(mdFile, updatedContent, 'utf-8');
      console.log(`  ✅ ${path.relative(CONTENT_DIR, mdFile)}: ${fileUpdates} references updated`);
      filesModified++;
      totalUpdates += fileUpdates;
    }
  }
  
  console.log(`\n🎉 Image reference update complete!`);
  console.log(`📝 Files modified: ${filesModified}`);
  console.log(`🔗 Total references updated: ${totalUpdates}`);
}

updateImageReferences().catch(console.error);
