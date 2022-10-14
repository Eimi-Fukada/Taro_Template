import { CSSProperties } from "react";

/**
 * 通用组件props
 */
export interface ComponentProps {
  className?: any;

  style?: CSSProperties;
}

export type ComponentSize = "small" | "default" | "large";
