import { ImageProps } from "@tarojs/components";
import { ComponentProps } from "~/styles/commonStyle";

export interface PictureProps extends ComponentProps {
  src: string;
  /** 单击 */
  onClick?: () => void;
  /** 双击 */
  onDoubleClick?: () => void;
  mode?: keyof ImageProps.Mode;
  defaultSource?: string;
}
