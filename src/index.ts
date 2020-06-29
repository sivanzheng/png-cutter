interface Cutted {
    w: number,
    h: number,
    offsetX: number,
    offsetY: number,
    sourceW: number,
    sourceH: number,
    dataUrl: string,
}

async function pngCutter(path: string): Promise<Cutted> {
    const canvas = document.createElement('canvas');
    if (canvas && canvas.getContext) {
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        const image = new Image();
        image.crossOrigin = 'Anonymous';
        image.src = path;
        await new Promise(resolve => image.onload = () => resolve());
        const sourceW = image.width;
        const sourceH = image.height;
        const xSpaces = Array(sourceW).fill(true);
        const ySpaces = Array(sourceH).fill(true);
    
        canvas.width = sourceW;
        canvas.height = sourceH;
    
        ctx.drawImage(image, 0, 0);
        for (let x = 0; x < sourceW; x++) {
            for (let y = 0; y < sourceH; y++) {
                const imgData = ctx.getImageData(x, y, 1, 1);
                const alpha = imgData.data[3];
                if (alpha !== 0) {
                    xSpaces[x] = false;
                    ySpaces[y] = false;
                }
            }
        }
    
        const offsetX = xSpaces.indexOf(false);
        const offsetY = ySpaces.indexOf(false);
        const w = xSpaces.lastIndexOf(false) - offsetX;
        const h = ySpaces.lastIndexOf(false) - offsetY;
    
        const canvas2 = document.createElement('canvas');
        canvas2.width = w;
        canvas2.height = h;
        const ctx2 = canvas2.getContext('2d') as CanvasRenderingContext2D;
        ctx2.drawImage(image, offsetX, offsetY, w, h, 0, 0, w, h);
        const dataUrl = canvas2.toDataURL('image/png');
        return {
            w,
            h,
            offsetX,
            offsetY,
            sourceW,
            sourceH,
            dataUrl,
        };
    } else {
        throw Error('needs canvas');
    }
}

export {
    pngCutter,
    Cutted,
}