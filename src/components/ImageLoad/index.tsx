import React, { memo, FC, useState } from 'react'
import styles from './index.module.less'
import { View, Image } from '@tarojs/components'
import { ImageLoadProps } from './const'
import images from '~/assets/icon-image/images'
import classnames from 'classnames'

const Component: FC<ImageLoadProps> = (props) => {
  const {
    src,
    defaultSource = images.defaultImage,
    lazyLoad = true,
    className,
    style,
    mode,
    onClick,
  } = props

  const [finishFlag, setFinishFlag] = useState(false)

  return (
    <View className={styles.page}>
      {!finishFlag && (
        <Image
          src={defaultSource}
          className={classnames(className)}
          style={style}
          mode={mode}
          lazyLoad={lazyLoad}
        />
      )}
      <Image
        src={src}
        className={className}
        style={
          finishFlag
            ? { ...style, opacity: 1 }
            : { opacity: 0, width: 0, height: 0 }
        }
        mode={mode}
        lazyLoad={lazyLoad}
        onClick={(event) => onClick && onClick(event)}
        onLoad={() => setFinishFlag(true)}
      />
    </View>
  )
}

const ImageLoad = memo(Component)
export default ImageLoad
