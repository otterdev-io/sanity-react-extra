import { SanityPickerColor } from "./types/color-picker";

export const rgba = (color: SanityPickerColor): string =>
  `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`;