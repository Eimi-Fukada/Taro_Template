import { CSSProperties } from 'react'

/**
 * 形状
 *
 */
export enum EMMAvatarShape {
  /** 圆形 */
  circle = 'circle',

  /** 方形 */
  square = 'square',
}

export interface AvatarProps {
  /**
   * 形状
   *
   * @default square
   */
  shape?: EMMAvatarShape | keyof typeof EMMAvatarShape
  /**
   * 大小
   */
  size?: number
  /**
   * 图片类头像的资源地址
   */
  src: string
  /**
   * 额外样式。可以对color 和backgroundColor 进行设置
   */
  avatarStyle?: CSSProperties
  /**
   * 头像点击事件
   */
  onClick?(): void
}
