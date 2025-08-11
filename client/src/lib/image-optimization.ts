// Image optimization utilities for performance
export interface ResponsiveImage {
  src: string;
  srcSet: string;
  sizes: string;
  lqip: string;
  alt: string;
  width: number;
  height: number;
}

// Generate LQIP (Low Quality Image Placeholder) as base64 blur
export const generateLQIP = (color: string = '#f3f3f3'): string => {
  // Create a tiny 1x1 pixel blur placeholder
  const canvas = document.createElement('canvas');
  canvas.width = 10;
  canvas.height = 10;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 10, 10);
    // Add slight blur effect
    ctx.filter = 'blur(2px)';
    ctx.fillStyle = 'rgba(200, 200, 200, 0.3)';
    ctx.fillRect(0, 0, 10, 10);
  }
  return canvas.toDataURL('image/jpeg', 0.1);
};

// Generate responsive image object using optimized images
export const createResponsiveImage = (
  basePath: string,
  alt: string,
  lqipColor: string = '#f5f5f5'
): ResponsiveImage => {
  // Extract filename from path for optimized versions
  const filename = basePath.split('/').pop()?.replace('.webp', '') || '';
  const optimizedPath = '/images/wedding/optimized';
  
  return {
    src: `${optimizedPath}/${filename}_large.webp`, // Default to large for quality
    srcSet: `
      ${optimizedPath}/${filename}_thumb.webp 400w,
      ${optimizedPath}/${filename}_medium.webp 800w,
      ${optimizedPath}/${filename}_large.webp 1600w,
      ${optimizedPath}/${filename}.webp 2000w
    `.replace(/\s+/g, ' ').trim(),
    sizes: `
      (max-width: 640px) 400px,
      (max-width: 1024px) 800px,
      (max-width: 1280px) 1600px,
      2000px
    `.replace(/\s+/g, ' ').trim(),
    lqip: generateLQIP(lqipColor),
    alt,
    width: 1600,
    height: 1067
  };
};

// Wedding image definitions with dynamic paths
export const weddingImages = [
  {
    id: 'wedding-1',
    path: '/images/wedding/BLVD9348_1754654186488.webp',
    alt: 'Historic wedding venue exterior with elegant architecture',
    lqipColor: '#f0ede8'
  },
  {
    id: 'wedding-2', 
    path: '/images/wedding/BLVD9340_1754654186489.webp',
    alt: 'Romantic couple portrait in natural lighting',
    lqipColor: '#f2f0ed'
  },
  {
    id: 'wedding-3',
    path: '/images/wedding/BLVD9307_1754654186489.webp', 
    alt: 'Wedding ceremony moment with beautiful backdrop',
    lqipColor: '#ece9e4'
  },
  {
    id: 'wedding-4',
    path: '/images/wedding/BLVD9264-1_1754654186490.webp',
    alt: 'Intimate wedding reception details and decor',
    lqipColor: '#f1ede9'
  },
  {
    id: 'wedding-5',
    path: '/images/wedding/BLVD9204_1754654186491.webp',
    alt: 'Candid wedding celebration moments',
    lqipColor: '#ede8e3'
  },
  {
    id: 'wedding-6',
    path: '/images/wedding/BLVD9185_1754654186491.webp',
    alt: 'Historic venue romance with stunning interior',
    lqipColor: '#f3f0eb'
  },
  {
    id: 'wedding-7',
    path: '/images/wedding/BLVD9182_1754654186492.webp',
    alt: 'Wedding portrait with architectural elements',
    lqipColor: '#efeae5'
  },
  {
    id: 'wedding-8',
    path: '/images/wedding/BLVD9180_1754654186492.webp',
    alt: 'Elegant wedding party group photography',
    lqipColor: '#f0ebe6'
  },
  {
    id: 'wedding-9',
    path: '/images/wedding/BLVD9174_1754654186493.webp',
    alt: 'Final wedding moments with emotional depth',
    lqipColor: '#ece7e2'
  }
];

// Get responsive images
export const getWeddingImages = (): ResponsiveImage[] => {
  return weddingImages.map(img => 
    createResponsiveImage(img.path, img.alt, img.lqipColor)
  );
};

// Get main thumbnail (wedding-6 - Historic venue)
export const getWeddingThumbnail = (): ResponsiveImage => {
  const thumbnailImg = weddingImages[5]; // BLVD9185 - most representative
  return createResponsiveImage(thumbnailImg.path, thumbnailImg.alt, thumbnailImg.lqipColor);
};

// Get optimized romantic image for portfolio
export const getRomanticImage = (): ResponsiveImage => {
  return {
    src: "/images/featured/romantic-main-medium.webp",
    srcSet: `
      /images/featured/romantic-main-thumbnail.webp 400w,
      /images/featured/romantic-main-medium.webp 800w,
      /images/featured/romantic-main-large.webp 1600w,
      /images/featured/romantic-main-original.webp 2000w
    `.replace(/\s+/g, ' ').trim(),
    sizes: `
      (max-width: 640px) 400px,
      (max-width: 1024px) 800px,
      (max-width: 1600px) 1600px,
      2000px
    `.replace(/\s+/g, ' ').trim(),
    lqip: generateLQIP('#f4f1f0'),
    alt: "Romantic Photography - Love Stories",
    width: 1600,
    height: 2400
  };
};

// Get optimized birthday image for portfolio
export const getBirthdayImage = (): ResponsiveImage => {
  return {
    src: "/BLVD9998_1754914886741_medium.webp",
    srcSet: `
      /BLVD9998_1754914886741_thumb.webp 400w,
      /BLVD9998_1754914886741_medium.webp 800w,
      /BLVD9998_1754914886741_large.webp 1600w,
      /BLVD9998_1754914886741_original.webp 2000w
    `.replace(/\s+/g, ' ').trim(),
    sizes: `
      (max-width: 640px) 400px,
      (max-width: 1024px) 800px,
      (max-width: 1600px) 1600px,
      2000px
    `.replace(/\s+/g, ' ').trim(),
    lqip: generateLQIP('#fdf0f4'),
    alt: "Birthday Celebration Photography",
    width: 1600,
    height: 1067
  };
};