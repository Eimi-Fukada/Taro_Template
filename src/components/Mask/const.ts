import { ComponentProps } from "~/styles/commonStyle";

export interface ModalProps
  extends ComponentProps,
    React.PropsWithChildren<object> {
  /**
   * 是否显示
   *
   * @type {boolean}
   * @memberof
   */
  open: boolean;
  /**
   * 关闭回调
   *
   * @memberof
   */
  onClose?: () => void;
  /**
   * 是否开启蒙层
   *
   * @type {boolean}
   * @memberof
   */
  mask?: boolean;
  /**
   * 点击蒙层是否关闭
   *
   * @type {boolean}
   * @memberof
   */
  maskClosable?: boolean;
  /**
   * 样式表
   *
   * @type {string}
   * @memberof
   */
  className?: string;
  /**
   * mask 是否是透明的
   */
  isMaskOpacity?: boolean;
}
