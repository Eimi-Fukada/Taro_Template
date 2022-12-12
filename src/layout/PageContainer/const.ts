import { CSSProperties } from "react";

export interface PageContainerProps extends React.PropsWithChildren<object> {
  className?: string;

  style?: CSSProperties | string;

  /**
   * 底部是否需要垫高
   * @default {false}
   */
  noPlace?: boolean;
  /**
   * 是否显示骨架屏
   * @default {false}
   * 默认不显示，目前没办法适用列表数据请求，自己控制一下详情页那些接口需要
   * TODO: 随时关注
   */
  loading?: boolean;
}
