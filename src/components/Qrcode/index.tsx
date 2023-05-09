import { memo, FC } from 'react'
import styles from './index.module.less'
import { View } from '@tarojs/components'
import { QrcodeProps } from './const'
import { QRCodeCanvas } from 'qrcode.react'

const Component: FC<QrcodeProps> = (props) => {
  const {
    value,
    level = 'H',
    size = 160,
    includeMargin = true,
    bgColor,
    fgColor,
    imageSettings,
  } = props

  return (
    <View className={styles.page}>
      <QRCodeCanvas
        value={JSON.stringify({ data: value })}
        level={level}
        size={size}
        includeMargin={includeMargin}
        bgColor={bgColor}
        fgColor={fgColor}
        imageSettings={imageSettings}
      />
    </View>
  )
}

const Qrcode = memo(Component)
export default Qrcode
