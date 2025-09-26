#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';

const filePath = 'src/content/portfolio/tv-remote.md';

console.log('Fixing tv-remote.md JPG/JPEG references to WebP...');

// Read the file
let content = readFileSync(filePath, 'utf8');

// Replace JPG and JPEG extensions with WebP in image paths
const updatedContent = content.replace(/!\[(.*?)\]\((\/optimized\/portfolio\/tv-remote\/.*?)\.(jpg|jpeg)\)/g, '![$1]($2.webp)');

// Write the file back
writeFileSync(filePath, updatedContent);

console.log('✅ Fixed all JPG/JPEG references to WebP in tv-remote.md');