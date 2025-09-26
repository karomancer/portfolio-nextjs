#!/usr/bin/env node

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const contentDir = 'src/content/portfolio';
const files = readdirSync(contentDir).filter(file => file.endsWith('.md'));

console.log('Fixing JPG/JPEG references in markdown files...');

let totalFiles = 0;
let totalReplacements = 0;

files.forEach(file => {
  const filePath = join(contentDir, file);
  let content = readFileSync(filePath, 'utf8');
  const originalContent = content;
  
  // Count initial matches
  const initialMatches = content.match(/!\[[^[\]]*\.(jpg|jpeg)\]/g);
  
  // Fix alt text: replace .jpg/.jpeg with .webp when the file path also uses .webp
  content = content.replace(/!\[([^[\]]*)\.(jpg|jpeg)\]/g, '![$1.webp]');
  
  if (content !== originalContent) {
    writeFileSync(filePath, content);
    totalFiles++;
    totalReplacements += initialMatches ? initialMatches.length : 0;
    console.log(`✅ Fixed ${initialMatches ? initialMatches.length : 0} alt text references in ${file}`);
  }
});

console.log(`\n🎉 Total: Fixed ${totalReplacements} JPG/JPEG alt text references across ${totalFiles} files`);