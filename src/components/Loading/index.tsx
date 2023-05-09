import React, { memo, FC, CSSProperties } from 'react'
import styles from './index.module.less'
import { View } from '@tarojs/components'
import { LoadingProps } from './const'
import { px2vw } from '~/styles/commonStyle'

const Component: FC<LoadingProps> = (props) => {
  const { color = '#12aaa2', size = 50 } = props

  const boxStyle = {
    background: color,
    width: px2vw(size),
    height: px2vw(size),
    borderRadius: px2vw(size / 10),
  } as CSSProperties

  return (
    <View className={styles.loader}>
      <View className={styles.box} style={boxStyle} />
      <View
        className={styles.shadow}
        style={{
          width: px2vw(size),
          height: px2vw(size / 10),
          top: px2vw(size + (size / 10) * 2),
        }}
      />
    </View>
  )
}

const Loading = memo(Component)
export default Loading
