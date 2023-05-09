import React, { memo, FC } from 'react'
import styles from './index.module.less'
import { View } from '@tarojs/components'
import { ButtonProps } from './const'
import { throttle } from '~/utils/lib'
import Loading from '../Loading'
import classnames from 'classnames'

const Component: FC<ButtonProps> = (props) => {
  const { loading, disabled, text, onClick } = props

  const handleClick = throttle(() => {
    if (disabled) {
      return
    }
    onClick && onClick()
  })

  return (
    <View
      className={classnames(styles.page, props.className)}
      style={props.style}
      onClick={() => handleClick()}
    >
      {loading ? <Loading /> : props.children || text}
    </View>
  )
}

const Button = memo(Component)
export default Button
