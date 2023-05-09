interface ImageSettingsProps {
  src: string
  x: number
  y: number
  height: number
  width: number
  /** excavate
   *  @default {false}
   */
  excavate: boolean
}

export interface QrcodeProps {
  /** qrcode 值
   *  @type {string}
   */
  value: string
  /** level
   *  @type {string ('L' 'M' 'Q' 'H')}
   *  @default 'H'
   */
  level?: 'L' | 'M' | 'Q' | 'H'
  /** size
   * @type {number}
   * @default 160
   */
  size?: number
  /**
   * includeMargin
   * @type {boolean}
   * @default true
   */
  includeMargin?: boolean
  /**
   * bgColor
   * @type {string}
   */
  bgColor?: string
  /**
   * fgColor
   * @type {string}
   */
  fgColor?: string
  /**
   * imageSettings
   * @memberof ImageSettingsProps
   */
  imageSettings?: ImageSettingsProps
}
