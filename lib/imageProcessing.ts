interface ProcessingOptions {
  quality?: number;
  isHD?: boolean;
  format?: 'png' | 'jpeg';
  compression?: number;
}

export async function createBackgroundImage(
  processedImage: string,
  background: string,
  options: ProcessingOptions = {}
): Promise<string> {
  const {
    isHD = false,
    quality = 1.0,
  } = options;

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }

      // Set canvas size (double for HD)
      const scale = isHD ? 2 : 1;
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;

      // Draw background
      if (background !== 'transparent') {
        if (background.startsWith('http')) {
          // Load background image
          const bgImg = new Image();
          bgImg.crossOrigin = "anonymous";
          bgImg.src = background;
          
          bgImg.onload = () => {
            ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            resolve(canvas.toDataURL('image/png', quality));
          };
          
          bgImg.onerror = () => reject(new Error('Failed to load background image'));
        } else if (background.startsWith('linear-gradient')) {
          // Create gradient background
          const gradient = createCanvasGradient(ctx, canvas.width, canvas.height, background);
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL('image/png', quality));
        } else {
          // Solid color background
          ctx.fillStyle = background;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL('image/png', quality));
        }
      } else {
        // Transparent background
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/png', quality));
      }
    };

    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = processedImage;
  });
}

function createCanvasGradient(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  gradientString: string
): CanvasGradient {
  const gradient = ctx.createLinearGradient(0, 0, width, 0);
  const colors = gradientString.match(/rgba?\([\d\s,\.]+\)|#[a-f\d]+/gi) || [];
  
  colors.forEach((color, index) => {
    gradient.addColorStop(index / (colors.length - 1), color);
  });
  
  return gradient;
}

export async function analyzeImageQuality(imageUrl: string): Promise<number> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Calculate image quality based on edge detection and noise analysis
      let edgeStrength = 0;
      let noiseLevel = 0;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        // Simple edge detection
        if (i < data.length - 4) {
          const nextR = data[i + 4];
          const nextG = data[i + 5];
          const nextB = data[i + 6];
          
          edgeStrength += Math.abs(r - nextR) + Math.abs(g - nextG) + Math.abs(b - nextB);
        }
        
        // Noise estimation
        if (i > 0 && i < data.length - 4) {
          const prevR = data[i - 4];
          const prevG = data[i - 3];
          const prevB = data[i - 2];
          
          noiseLevel += Math.abs(r - prevR) + Math.abs(g - prevG) + Math.abs(b - prevB);
        }
      }

      // Normalize scores
      const normalizedEdgeStrength = Math.min(edgeStrength / (data.length * 3), 1);
      const normalizedNoiseLevel = 1 - Math.min(noiseLevel / (data.length * 3), 1);
      
      // Combined quality score (70% edge strength, 30% noise level)
      const qualityScore = (normalizedEdgeStrength * 0.7) + (normalizedNoiseLevel * 0.3);
      
      resolve(qualityScore);
    };

    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = imageUrl;
  });
}