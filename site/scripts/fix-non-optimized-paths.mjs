#!/usr/bin/env node

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const contentDir = 'src/content/portfolio';
const files = readdirSync(contentDir).filter(file => file.endsWith('.md'));

console.log('Fixing non-optimized path references in markdown files...');

let totalFiles = 0;
let totalReplacements = 0;

files.forEach(file => {
  const filePath = join(contentDir, file);
  let content = readFileSync(filePath, 'utf8');
  const originalContent = content;
  
  // Count initial matches
  const initialMatches = content.match(/!\[.*\]\(\/portfolio\/[^)]*\)/g);
  
  // Replace /portfolio/ with /optimized/portfolio/ in image references
  content = content.replace(/!\[([^\]]*)\]\(\/portfolio\//g, '![$1](/optimized/portfolio/');
  
  if (content !== originalContent) {
    writeFileSync(filePath, content);
    totalFiles++;
    totalReplacements += initialMatches ? initialMatches.length : 0;
    console.log(`✅ Fixed ${initialMatches ? initialMatches.length : 0} path references in ${file}`);
  }
});

console.log(`\n🎉 Total: Fixed ${totalReplacements} non-optimized path references across ${totalFiles} files`);