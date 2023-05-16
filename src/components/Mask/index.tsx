import React, { memo, FC } from 'react'
import styles from './index.module.less'
import { ITouchEvent, View } from '@tarojs/components'
import { ModalProps } from './const'
import classnames from 'classnames'

const Component: FC<ModalProps> = (props) => {
  const {
    open,
    onClose,
    mask = true,
    maskClosable = true,
    className,
    style,
    isMaskOpacity = false,
  } = props

  function onTouchMove(event: ITouchEvent) {
    event.stopPropagation()
  }

  function getClassName() {
    const classNameArray = [styles.Modal, className]
    if (!open) {
      classNameArray.push(styles.Modal__hide)
    }

    classNameArray.push(styles.Modal__center)

    return classnames(...classNameArray)
  }

  return (
    <View
      className={getClassName()}
      onTouchMove={(event) => onTouchMove(event)}
      style={style}
    >
      {mask && (
        <View
          onClick={() => maskClosable && onClose && onClose()}
          className={
            isMaskOpacity ? styles.Modal_mask_Opacity : styles.Modal_mask
          }
          catchMove
        />
      )}
      <View className={styles.Modal_content} catchMove>
        {props.children}
      </View>
    </View>
  )
}

const Mask = memo(Component)
export default Mask
