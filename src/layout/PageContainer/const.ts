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
}
