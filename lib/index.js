"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pngCutter = void 0;
function pngCutter(path) {
    return __awaiter(this, void 0, void 0, function* () {
        const canvas = document.createElement('canvas');
        if (canvas && canvas.getContext) {
            const ctx = canvas.getContext('2d');
            const image = new Image();
            image.crossOrigin = 'Anonymous';
            image.src = path;
            yield new Promise(resolve => image.onload = () => resolve());
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
            const offsetX = xSpaces.indexOf(false) - 1;
            const offsetY = ySpaces.indexOf(false) - 1;
            const w = xSpaces.lastIndexOf(false) - offsetX + 3;
            const h = ySpaces.lastIndexOf(false) - offsetY + 3;
            const canvas2 = document.createElement('canvas');
            canvas2.width = w;
            canvas2.height = h;
            const ctx2 = canvas2.getContext('2d');
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
        }
        else {
            throw Error('needs canvas');
        }
    });
}
exports.pngCutter = pngCutter;
