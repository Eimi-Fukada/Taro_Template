import { ImageProps, ITouchEvent } from '@tarojs/components'
import { CSSProperties } from 'react'

export interface ImageLoadProps {
  /** src
   *  @type {string}
   */
  src: string
  /** defaultSource
   *  @type {string}
   */
  defaultSource?: string
  /** className
   *  @type {string}
   */
  className?: string
  /** style
   *  @type {CSSProperties}
   */
  style?: CSSProperties
  /** mode
   *  @memberof ImageProps.Mode
   */
  mode?: keyof ImageProps.Mode
  /** lazyLoad
   *  @type {boolean}
   *  @default true
   */
  lazyLoad?: boolean
  /** onClick
   *  @type {function}
   */
  onClick?: (event: ITouchEvent) => void
}
