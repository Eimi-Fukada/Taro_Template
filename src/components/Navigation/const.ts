import { CSSProperties } from "react";
import { ComponentProps } from "~/styles/commonStyle";

export enum NavigationType {
  /** 白色背景，黑色字体 */
  Default = "Default",

  /** 透明背景。白色字体 */
  Transparent = "Transparent",

  Primary = "Primary"
}

export interface NavigationProps extends ComponentProps {
  /**
   * 中间显示的标题
   *
   * @type {string}
   * @memberof INavigationProps
   */
  title?: string;
  /**
   * 返回按钮是否显示,当路由只剩一页或路由是tab页面时。此属性无效
   *
   * @type {boolean}
   * @memberof INavigationProps
   */
  backVisible?: boolean;
  /**
   * 渲染左边的元素
   *
   * @type {(JSX.Element | string)}
   * @memberof INavigationProps
   */
  renderLeftContent?: JSX.Element;
  /**
   * 渲染右边的元素
   *
   * @type {(JSX.Element | string)}
   * @memberof INavigationProps
   */
  renderRightContent?: JSX.Element;

  /**
   * 点击返回之前处理函数
   *
   * @description 你可以通过此函数在返回之前做拦截处理操作。 支持返回一个者异步函数 。结果为true时可以返回。为false时阻止返回
   */
  beforeNavBack?: () => Promise<boolean> | boolean;

  /**
   * 导航条样式
   */
  contentClass?: any;

  /**
   * 导航条样式
   */
  contentStyle?: CSSProperties;

  /**
   * 导航title样式
   */
  titleStyle?: CSSProperties;
}
