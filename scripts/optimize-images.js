#!/usr/bin/env node
import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration for different image types
const IMAGE_CONFIGS = {
  thumbnail: {
    width: 400,
    quality: 75,
    suffix: '_thumb',
    targetSize: '40-80KB'
  },
  medium: {
    width: 800,
    quality: 75,
    suffix: '_medium',
    targetSize: '80-120KB'
  },
  large: {
    width: 1600,
    quality: 75,
    suffix: '_large',
    targetSize: '200-300KB'
  },
  original: {
    width: 2000,
    quality: 75,
    suffix: '',
    targetSize: '200-400KB'
  }
};

async function optimizeImage(inputPath, outputDir, filename, config) {
  const baseName = path.parse(filename).name;
  const outputPath = path.join(outputDir, `${baseName}${config.suffix}.webp`);
  
  try {
    const info = await sharp(inputPath)
      .resize(config.width, null, { 
        withoutEnlargement: true,
        fit: 'inside'
      })
      .webp({ 
        quality: config.quality,
        effort: 6 // Higher compression effort
      })
      .toFile(outputPath);
    
    const sizeKB = Math.round(info.size / 1024);
    console.log(`✓ ${filename} → ${baseName}${config.suffix}.webp (${sizeKB}KB)`);
    
    return {
      path: outputPath,
      size: info.size,
      width: info.width,
      height: info.height
    };
  } catch (error) {
    console.error(`✗ Error processing ${filename}:`, error.message);
    return null;
  }
}

async function processDirectory(inputDir, outputDir) {
  try {
    await fs.mkdir(outputDir, { recursive: true });
    const files = await fs.readdir(inputDir);
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png|webp)$/i.test(file)
    );
    
    console.log(`Found ${imageFiles.length} images in ${inputDir}`);
    console.log('Starting optimization...\n');
    
    for (const file of imageFiles) {
      const inputPath = path.join(inputDir, file);
      console.log(`Processing: ${file}`);
      
      // Generate all size variants
      for (const [configName, config] of Object.entries(IMAGE_CONFIGS)) {
        await optimizeImage(inputPath, outputDir, file, config);
      }
      console.log(''); // Empty line between files
    }
    
  } catch (error) {
    console.error('Error processing directory:', error.message);
  }
}

async function main() {
  const directories = [
    {
      input: 'client/public/images/wedding',
      output: 'client/public/images/wedding/optimized'
    },
    {
      input: 'client/public/images/portrait',
      output: 'client/public/images/portrait/optimized'
    },
    {
      input: 'client/public/images/lifestyle',
      output: 'client/public/images/lifestyle/optimized'
    },
    {
      input: 'client/public/images/culture',
      output: 'client/public/images/culture/optimized'
    },
    {
      input: 'client/public/images/romantic',
      output: 'client/public/images/romantic/optimized'
    },
    {
      input: 'attached_assets',
      output: 'client/public/images/wedding/optimized_attached'
    }
  ];
  
  console.log('🖼️  Portfolio Image Optimization Tool');
  console.log('=====================================\n');
  
  for (const dir of directories) {
    try {
      await fs.access(dir.input);
      console.log(`📁 Processing: ${dir.input}`);
      await processDirectory(dir.input, dir.output);
    } catch (error) {
      console.log(`⏭️  Skipping ${dir.input} (directory not found)`);
    }
  }
  
  console.log('✨ Image optimization complete!');
  console.log('\n📊 Generated sizes:');
  console.log('• Thumbnails (400px): 40-80KB - for grid previews');
  console.log('• Medium (800px): 80-120KB - for mobile lightbox');
  console.log('• Large (1600px): 200-300KB - for desktop lightbox');
  console.log('• Original (2000px): 200-400KB - for high-res displays');
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}