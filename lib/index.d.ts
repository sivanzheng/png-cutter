interface Cutted {
    w: number;
    h: number;
    offsetX: number;
    offsetY: number;
    sourceW: number;
    sourceH: number;
    dataUrl: string;
}
export declare function pngCutter(path: string): Promise<Cutted>;
export {};
