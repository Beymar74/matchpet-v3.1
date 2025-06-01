// cropImage.ts
export default function getCroppedImg(imageSrc: string, pixelCrop: any): Promise<string> {
    const createImage = (url: string): Promise<HTMLImageElement> =>
      new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener('load', () => resolve(image));
        image.addEventListener('error', error => reject(error));
        image.setAttribute('crossOrigin', 'anonymous'); // needed to avoid CORS issues on CodeSandbox
        image.src = url;
      });
  
    return new Promise(async (resolve, reject) => {
      const image = await createImage(imageSrc);
      const canvas = document.createElement('canvas');
      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;
      const ctx = canvas.getContext('2d');
  
      if (!ctx) {
        reject('No context');
        return;
      }
  
      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
      );
  
      canvas.toBlob(blob => {
        if (!blob) {
          reject('Canvas is empty');
          return;
        }
        const fileUrl = URL.createObjectURL(blob);
        resolve(fileUrl);
      }, 'image/jpeg');
    });
  }
  