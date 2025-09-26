#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';

const filePath = 'src/content/portfolio/tv-remote.md';

console.log('Fixing tv-remote.md image references...');

// Read the file
let content = readFileSync(filePath, 'utf8');

// Replace all /portfolio/tv-remote/ paths with /optimized/portfolio/tv-remote/
const updatedContent = content.replace(/!\[(.*?)\]\(\/portfolio\/tv-remote\//g, '![$1](/optimized/portfolio/tv-remote/');

// Write the file back
writeFileSync(filePath, updatedContent);

console.log('✅ Fixed all tv-remote.md image references');
console.log('Updated paths from /portfolio/tv-remote/ to /optimized/portfolio/tv-remote/');