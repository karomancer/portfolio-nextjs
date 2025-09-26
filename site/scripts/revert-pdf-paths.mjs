#!/usr/bin/env node

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const contentDir = 'src/content/portfolio';
const files = readdirSync(contentDir).filter(file => file.endsWith('.md'));

console.log('Reverting PDF references back to original paths...');

let totalFiles = 0;
let totalReplacements = 0;

files.forEach(file => {
  const filePath = join(contentDir, file);
  let content = readFileSync(filePath, 'utf8');
  const originalContent = content;
  
  // Count initial matches
  const initialMatches = content.match(/!\[([^\]]*)\]\(\/optimized\/portfolio\/[^)]*\.pdf\)/g);
  
  // Replace /optimized/portfolio/ with /portfolio/ for PDF files only
  content = content.replace(/!\[([^\]]*)\]\(\/optimized\/(portfolio\/[^)]*\.pdf)\)/g, '![$1](/$2)');
  
  if (content !== originalContent) {
    writeFileSync(filePath, content);
    totalFiles++;
    totalReplacements += initialMatches ? initialMatches.length : 0;
    console.log(`✅ Reverted ${initialMatches ? initialMatches.length : 0} PDF references in ${file}`);
  }
});

console.log(`\n🎉 Total: Reverted ${totalReplacements} PDF references across ${totalFiles} files`);