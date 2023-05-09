import { ImageProps } from '@tarojs/components'
import { ComponentProps } from '~/styles/commonStyle'

export interface PictureProps extends ComponentProps {
  /**
   * src
   * @type {string}
   */
  src: string
  /** 单击
   * @type {function}
   */
  onClick?: () => void
  /** 双击
   * @type {function}
   */
  onDoubleClick?: () => void
  /**
   * mode
   * @memberof ImageProps.Mode
   */
  mode?: keyof ImageProps.Mode
  /**
   * defaultSource
   * @type {string}
   */
  defaultSource?: string
}
