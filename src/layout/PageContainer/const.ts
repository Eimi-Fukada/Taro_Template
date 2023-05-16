import { CSSProperties } from 'react'

export interface PageContainerProps extends React.PropsWithChildren<object> {
  className?: string

  style?: CSSProperties | string

  /**
   * 底部是否需要垫高
   * @default {false}
   */
  noPlace?: boolean

  /**
   * 是否显示骨架屏
   * @default {false}
   */
  loading?: boolean

  /**
   * 是否是tab页
   * 设置为tab页面。会额外提供一个tabbar的高度
   */
  isTab?: boolean
}
