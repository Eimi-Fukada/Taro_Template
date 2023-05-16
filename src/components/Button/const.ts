import { ReactNode } from 'react'
import { ComponentProps } from '../../styles/commonStyle'

export interface ButtonProps
  extends ComponentProps,
    React.PropsWithChildren<object> {
  /**
   * 加载状态
   * @description 默认不自带loading动画
   */
  loading?: boolean
  /**
   * 禁用
   */
  disabled?: boolean
  /**
   * 文字
   */
  text?: ReactNode
  /**
   * 点击事件 返回的是promise 未运行完毕不会触发第二次
   */
  onClick?: () => void | Promise<any>
}
