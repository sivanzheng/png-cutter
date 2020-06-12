interface Cutted {
    w: number;
    h: number;
    offsetX: number;
    offsetY: number;
    sourceW: number;
    sourceH: number;
    dataUrl: string;
}
declare function pngCutter(path: string, quality?: number): Promise<Cutted>;
export { pngCutter, Cutted, };
