import React, { memo, FC } from 'react'
import styles from './index.module.less'
import { View, Image } from '@tarojs/components'
import { AvatarProps, EMMAvatarShape } from './const'

const Component: FC<AvatarProps> = (props) => {
  const {
    shape = EMMAvatarShape.square,
    size = 32,
    src,
    avatarStyle,
    onClick,
  } = props

  const imgStyle = {
    ...avatarStyle,
    borderRadius: shape === EMMAvatarShape.circle ? '50%' : '',
    width: `${size}px`,
    height: `${size}px`,
  }

  return (
    <View className={styles.page} onClick={() => onClick && onClick()}>
      {src && <Image src={src} className={styles.img} style={imgStyle} />}
    </View>
  )
}

const Avatar = memo(Component)
export default Avatar
