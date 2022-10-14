import { ReactNode } from 'react'

export interface IPullToRefreshProps {
  /**
   * 状态
   *
   * @type {PullToRefreshState}
   * @memberof IPullToRefreshProps
   */
  state: PullToRefreshState

  /**
   * 没有更多
   *
   * @type {boolean}
   * @memberof IPullToRefreshProps
   */
  noMore: boolean

  /**
   * 没有更多的文案
   */
  noMoreText?: ReactNode

  /**
   * 没有更多的文案延迟显示时间
   *
   * 毫秒
   *
   * @description 用于配合瀑布流组件内部100毫秒的渲染延迟
   */
  noMoreTextDelay?: number

  empty?: ReactNode

  /**
   * 渲染底部 低于无更多
   *
   * @memberof IPullToRefreshProps
   */
  renderFooter?: ReactNode

  /**
   * 容器高度
   *
   * @description 下拉刷新必须指定一个高度。
   * 大部分情况下组件内会自动根据距离顶部距离计算出容器剩余高度作为组件高度。
   * 但是有些特定情况。造成两个滚动条的时候。你可能需要手动指定容器高度
   */
  height?: number

  /** 是否计算底部距离 */
  bottom?: boolean

  /**
   * 是否启用下拉刷新
   * @default true
   */
  enablePull?: boolean

  /**
   * 是否显示滚动条
   * @default true
   */
  showScrollbar?: boolean

  /**
   * 刷新事件回调
   *
   * @memberof IPullToRefreshProps
   */
  onRefresh: () => void | Promise<void>

  /**
   * 滚动到地步回调
   *
   * @memberof IMMPullToRefreshProps
   */
  onScrollToLower: () => void
}

export interface IPullToRefreshState {
  pulling: boolean
  top: number
  scrollViewHeight: number
  showNoMoreText: boolean
}

export enum PullToRefreshState {
  /**
   * 普通状态
   */
  none,
  /**
   * 刷新中
   */
  refreshing,
  /**
   * 添加中
   */
  pushing
}

export interface IPullRefreshHookRefreshParams {
  /**
   * 刷新时是否清空旧数组
   *
   * @default false
   */
  clearList?: boolean
}

export interface IPullRefreshHookReturn extends Omit<IPullToRefreshProps, 'onRefresh'> {
  onRefresh: (params?: IPullRefreshHookRefreshParams) => void
}
