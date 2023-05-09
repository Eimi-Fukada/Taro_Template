import { CSSProperties } from 'react'

/**
 * 通用组件props
 */
export interface ComponentProps {
  /**
   * 样式表
   * @type {string}
   * @memberof
   */
  className?: any
  /**
   * 内联样式
   * @type {CSSProperties}
   * @memberof
   */
  style?: CSSProperties
}

/**
 * 将行内样式转换成vw,TODO:如果修改UI稿的宽度，需要修改这里的750,按照设计图 1vw = 7.5px
 * @param px
 * @returns
 */
export const px2vw = (px: number): string => `${px / 7.5}vw`
