export interface SanityPickerColor {
  hex: string;
  alpha: number;
  hsl: {
    _type: "hslaColor";
    h: number;
    s: number;
    l: number;
    a: number;
  };
  hsv: {
    _type: "hsvaColor";
    h: number;
    s: number;
    v: number;
    a: number;
  };
  rgb: {
    _type: "rgbaColor";
    r: number;
    g: number;
    b: number;
    a: number;
  };
}