export async function compressImage(file: File, maxSizeMB: number = 1): Promise<File> {
  const options = {
    maxSizeMB,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    preserveExif: true
  };

  try {
    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  } catch (error) {
    console.error('Error compressing image:', error);
    return file;
  }
}

export function generateFileName(originalName: string, prefix: string = 'processed'): string {
  const extension = originalName.split('.').pop();
  const timestamp = new Date().getTime();
  return `${prefix}-${timestamp}.${extension}`;
}

export async function validateImage(file: File): Promise<boolean> {
  const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
  const maxSize = 10 * 1024 * 1024; // 10MB

  if (!validTypes.includes(file.type)) {
    throw new Error('Invalid file type. Please upload a JPEG, PNG, or WebP image.');
  }

  if (file.size > maxSize) {
    throw new Error('File size too large. Maximum size is 10MB.');
  }

  return true;
}