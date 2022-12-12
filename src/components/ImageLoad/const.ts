import { ImageProps, ITouchEvent } from "@tarojs/components";
import { CSSProperties } from "react";

export interface ImageLoadProps {
  defaultSource?: string;
  src: string;
  className?: string;
  style?: CSSProperties;
  mode?: keyof ImageProps.Mode;
  lazyLoad?: boolean;
  onClick?: (event: ITouchEvent) => void;
}
