export interface ToastProps {
  /**
   * toast内容
   * @type {string}
   */
  message?: string
  /**
   * toast icon
   * @memberof keyof 'success' | 'fail'
   */
  icon?: 'success' | 'fail'
}
