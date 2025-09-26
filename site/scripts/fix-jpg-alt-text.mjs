#!/usr/bin/env node

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const contentDir = 'src/content/portfolio';
const files = readdirSync(contentDir).filter(file => file.endsWith('.md'));

console.log('Fixing JPG/JPEG alt text in markdown files...');

let totalFiles = 0;
let totalReplacements = 0;

files.forEach(file => {
  const filePath = join(contentDir, file);
  let content = readFileSync(filePath, 'utf8');
  const originalContent = content;
  
  // Fix alt text that has .jpg or .jpeg but the path has .webp
  content = content.replace(/!\[([^[\]]*)\.(jpg|jpeg)\]\((\/optimized\/[^)]*?)\.webp\)/g, '![$1.webp]($3.webp)');
  
  if (content !== originalContent) {
    writeFileSync(filePath, content);
    totalFiles++;
    const matches = originalContent.match(/!\[([^[\]]*)\.(jpg|jpeg)\]\((\/optimized\/[^)]*?)\.webp\)/g);
    totalReplacements += matches ? matches.length : 0;
    console.log(`✅ Fixed ${matches ? matches.length : 0} references in ${file}`);
  }
});

console.log(`\n🎉 Total: Fixed ${totalReplacements} JPG/JPEG alt text references across ${totalFiles} files`);