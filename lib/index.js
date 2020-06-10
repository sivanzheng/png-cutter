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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pngCutter = void 0;
function pngCutter(path) {
    return __awaiter(this, void 0, void 0, function () {
        var canvas, ctx, image_1, sourceW, sourceH, xSpaces, ySpaces, x, y, imgData, alpha, offsetX, offsetY, w, h, canvas2, ctx2, dataUrl;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    canvas = document.createElement('canvas');
                    if (!(canvas && canvas.getContext)) return [3 /*break*/, 2];
                    ctx = canvas.getContext('2d');
                    image_1 = new Image();
                    image_1.crossOrigin = 'Anonymous';
                    image_1.src = path;
                    console.log(path);
                    console.log('1111111111111111111');
                    return [4 /*yield*/, new Promise(function (resolve) { return image_1.onload = function () { return resolve(); }; })];
                case 1:
                    _a.sent();
                    console.log('?????????????');
                    sourceW = image_1.width;
                    sourceH = image_1.height;
                    xSpaces = Array(sourceW).fill(true);
                    ySpaces = Array(sourceH).fill(true);
                    canvas.width = sourceW;
                    canvas.height = sourceH;
                    ctx.drawImage(image_1, 0, 0);
                    console.log('after draw');
                    for (x = 0; x < sourceW; x++) {
                        for (y = 0; y < sourceH; y++) {
                            imgData = ctx.getImageData(x, y, 1, 1);
                            alpha = imgData.data[3];
                            if (alpha !== 0) {
                                xSpaces[x] = false;
                                ySpaces[y] = false;
                            }
                        }
                    }
                    console.log('after for');
                    offsetX = xSpaces.indexOf(false) - 1;
                    offsetY = ySpaces.indexOf(false) - 1;
                    w = xSpaces.lastIndexOf(false) - offsetX + 3;
                    h = ySpaces.lastIndexOf(false) - offsetY + 3;
                    canvas2 = document.createElement('canvas');
                    canvas2.width = w;
                    canvas2.height = h;
                    ctx2 = canvas2.getContext('2d');
                    ctx2.drawImage(image_1, offsetX, offsetY, w, h, 0, 0, w, h);
                    dataUrl = canvas2.toDataURL('image/png');
                    // const newImage = new Image();
                    // console.log(newImage)
                    // await new Promise(resolve => newImage.onload = () => resolve());
                    console.log(555555555555555);
                    console.log(dataUrl);
                    return [2 /*return*/, {
                            w: w,
                            h: h,
                            offsetX: offsetX,
                            offsetY: offsetY,
                            sourceW: sourceW,
                            sourceH: sourceH,
                            dataUrl: dataUrl,
                        }];
                case 2: throw Error('needs canvas');
            }
        });
    });
}
exports.pngCutter = pngCutter;
