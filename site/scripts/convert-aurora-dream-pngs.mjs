#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// PNG files to convert
const pngFiles = [
    'public/optimized/portfolio/aurora-dream/8up.png',
    'public/optimized/portfolio/aurora-dream/businesscard.png', 
    'public/optimized/portfolio/aurora-dream/sketchdraft.png'
];

// Convert PNG to WebP
function convertPngToWebP(pngPath) {
    const webpPath = pngPath.replace(/\.png$/i, '.webp');
    
    try {
        console.log(`Converting ${path.basename(pngPath)} to WebP...`);
        
        // Use ImageMagick to convert PNG to WebP with 85% quality
        execSync(`magick "${pngPath}" -quality 85 "${webpPath}"`, { stdio: 'inherit' });
        
        // Get file sizes for comparison
        const originalSize = fs.statSync(pngPath).size;
        const webpSize = fs.statSync(webpPath).size;
        const savings = ((originalSize - webpSize) / originalSize * 100).toFixed(1);
        
        console.log(`✅ ${path.basename(pngPath)}: ${(originalSize/1024/1024).toFixed(2)}MB → ${(webpSize/1024/1024).toFixed(2)}MB (${savings}% reduction)`);
        
        return webpPath;
    } catch (error) {
        console.error(`❌ Error converting ${pngPath}:`, error.message);
        return null;
    }
}

// Update markdown references
function updateMarkdownReferences() {
    const markdownPath = path.join(rootDir, 'src', 'content', 'portfolio', 'aurora-dream.md');
    
    try {
        let content = fs.readFileSync(markdownPath, 'utf8');
        
        // Replace .png and .PNG with .webp in image references
        content = content.replace(/(\!\[.*?\]\(.*?)\.png(\))/gi, '$1.webp$2');
        content = content.replace(/(\!\[.*?\]\(.*?)\.PNG(\))/gi, '$1.webp$2');
        
        fs.writeFileSync(markdownPath, content, 'utf8');
        console.log('✅ Updated markdown references from .png/.PNG to .webp');
        
        return true;
    } catch (error) {
        console.error('❌ Error updating markdown references:', error.message);
        return false;
    }
}

// Main execution
console.log('🔄 Starting PNG to WebP conversion for aurora-dream...\n');

let convertedCount = 0;
let totalOriginalSize = 0;
let totalWebpSize = 0;

// Convert each PNG file
for (const pngFile of pngFiles) {
    const fullPath = path.join(rootDir, pngFile);
    if (fs.existsSync(fullPath)) {
        const webpPath = convertPngToWebP(fullPath);
        if (webpPath) {
            convertedCount++;
            
            // Calculate sizes
            const originalSize = fs.statSync(fullPath).size;
            const webpSize = fs.statSync(webpPath).size;
            totalOriginalSize += originalSize;
            totalWebpSize += webpSize;
            
            // Remove the original PNG file
            fs.unlinkSync(fullPath);
        }
    } else {
        console.log(`⚠️  File not found: ${pngFile}`);
    }
}

// Update markdown references
console.log('\n🔄 Updating markdown references...');
updateMarkdownReferences();

// Summary
console.log('\n📊 CONVERSION SUMMARY:');
console.log(`✅ Converted: ${convertedCount}/${pngFiles.length} files`);
console.log(`📦 Total size reduction: ${(totalOriginalSize/1024/1024).toFixed(2)}MB → ${(totalWebpSize/1024/1024).toFixed(2)}MB`);
console.log(`💾 Space saved: ${((totalOriginalSize - totalWebpSize)/1024/1024).toFixed(2)}MB (${((totalOriginalSize - totalWebpSize)/totalOriginalSize * 100).toFixed(1)}%)`);
console.log('\n🎉 Aurora Dream PNG conversion complete!');