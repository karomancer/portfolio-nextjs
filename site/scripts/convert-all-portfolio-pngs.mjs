#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Function to find all unique PNG file paths referenced in markdown files
async function findPngReferences() {
    const markdownFiles = await glob('src/content/portfolio/*.md', { cwd: rootDir });
    const pngFiles = new Set();
    
    for (const mdFile of markdownFiles) {
        const fullPath = path.join(rootDir, mdFile);
        const content = fs.readFileSync(fullPath, 'utf8');
        
        // Find all PNG references (both in markdown images and frontmatter)
        const pngMatches = content.match(/\/optimized\/portfolio\/[^)\s"']+\.png/gi);
        if (pngMatches) {
            pngMatches.forEach(match => {
                // Convert to file system path
                const filePath = path.join(rootDir, 'public', match);
                pngFiles.add(filePath);
            });
        }
    }
    
    return Array.from(pngFiles);
}

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
        
        return { success: true, originalSize, webpSize };
    } catch (error) {
        console.error(`❌ Error converting ${pngPath}:`, error.message);
        return { success: false, originalSize: 0, webpSize: 0 };
    }
}

// Update markdown references in all portfolio files
async function updateMarkdownReferences() {
    const markdownFiles = await glob('src/content/portfolio/*.md', { cwd: rootDir });
    let totalUpdates = 0;
    
    for (const mdFile of markdownFiles) {
        const fullPath = path.join(rootDir, mdFile);
        let content = fs.readFileSync(fullPath, 'utf8');
        
        // Count original PNG references
        const originalPngCount = (content.match(/\.png/gi) || []).length;
        
        // Replace .png and .PNG with .webp in all references
        content = content.replace(/(\S*)\.png(\s|$|[)\]"'])/gi, '$1.webp$2');
        content = content.replace(/(\S*)\.PNG(\s|$|[)\]"'])/gi, '$1.webp$2');
        
        // Count remaining PNG references (should be 0)
        const remainingPngCount = (content.match(/\.png/gi) || []).length;
        const updatesInFile = originalPngCount - remainingPngCount;
        
        if (updatesInFile > 0) {
            fs.writeFileSync(fullPath, content, 'utf8');
            console.log(`✅ Updated ${updatesInFile} PNG references in ${path.basename(mdFile)}`);
            totalUpdates += updatesInFile;
        }
    }
    
    return totalUpdates;
}

// Main execution
async function main() {
    console.log('🔄 Starting comprehensive PNG to WebP conversion for all portfolio files...\n');
    
    // Find all PNG files referenced in markdown
    console.log('📝 Scanning all portfolio markdown files for PNG references...');
    const pngFiles = await findPngReferences();
    console.log(`Found ${pngFiles.length} unique PNG files referenced\n`);
    
    let convertedCount = 0;
    let totalOriginalSize = 0;
    let totalWebpSize = 0;
    
    // Convert each PNG file
    for (const pngFile of pngFiles) {
        if (fs.existsSync(pngFile)) {
            const result = convertPngToWebP(pngFile);
            if (result.success) {
                convertedCount++;
                totalOriginalSize += result.originalSize;
                totalWebpSize += result.webpSize;
                
                // Remove the original PNG file
                fs.unlinkSync(pngFile);
            }
        } else {
            console.log(`⚠️  File not found: ${pngFile}`);
        }
    }
    
    // Update markdown references
    console.log('\n🔄 Updating markdown references in all portfolio files...');
    const totalUpdates = await updateMarkdownReferences();
    
    // Summary
    console.log('\n📊 CONVERSION SUMMARY:');
    console.log(`✅ Files converted: ${convertedCount}/${pngFiles.length}`);
    console.log(`✅ References updated: ${totalUpdates}`);
    console.log(`📦 Total size reduction: ${(totalOriginalSize/1024/1024).toFixed(2)}MB → ${(totalWebpSize/1024/1024).toFixed(2)}MB`);
    console.log(`💾 Space saved: ${((totalOriginalSize - totalWebpSize)/1024/1024).toFixed(2)}MB (${((totalOriginalSize - totalWebpSize)/totalOriginalSize * 100).toFixed(1)}%)`);
    console.log('\n🎉 Complete portfolio PNG to WebP conversion finished!');
}

main().catch(console.error);