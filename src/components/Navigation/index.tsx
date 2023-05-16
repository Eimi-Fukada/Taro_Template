import { View, Image } from '@tarojs/components'
import { FC, memo, PropsWithChildren, useMemo } from 'react'
import Taro, {
  getCurrentPages,
  getMenuButtonBoundingClientRect,
  getSystemInfoSync,
} from '@tarojs/taro'
import classnames from 'classnames'
import styles from './index.module.less'
import { NavigationProps } from './const'
import images from '~/assets/icon-image/images'

const isWeapp = process.env.TARO_ENV === 'weapp'
// h5暂时不支持 API getMenuButtonBoundingClientRect, 模拟导航栏iphone6/7/8固定高度
const statusBarHeight = isWeapp ? getSystemInfoSync().statusBarHeight || 20 : 20

const menuButtonBoundingClientRect = isWeapp
  ? getMenuButtonBoundingClientRect()
  : {
      bottom: 56,
      height: 32,
      left: 278,
      right: 365,
      top: 24,
      width: 87,
    }

const stateHeigth =
  (menuButtonBoundingClientRect.top - statusBarHeight) * 2 +
  menuButtonBoundingClientRect.height

export const navigationHeight = isWeapp
  ? stateHeigth + statusBarHeight
  : stateHeigth

const Component: FC<PropsWithChildren<NavigationProps>> = (props) => {
  const {
    title,
    renderLeftContent,
    beforeNavBack,
    contentClass,
    contentStyle,
    titleStyle,
    place = true,
  } = props

  const rootStyle = useMemo(
    () => ({
      // 是否占据高度
      height: !place ? 0 : navigationHeight,
      ...props.style,
    }),
    [props.style, place]
  )

  const className = useMemo(() => {
    return classnames(styles.fixed, contentClass)
  }, [contentClass])

  async function hanldeNavBack() {
    let result = true
    if (beforeNavBack) {
      result = await beforeNavBack()
    }
    if (result) {
      Taro.navigateBack({ delta: 1 })
    }
  }

  const renderGoBack = () => {
    const { length } = getCurrentPages()
    return (
      length > 1 && (
        <View className={styles.goback} onClick={hanldeNavBack}>
          <Image src={images.left} className={styles.leftIcon} />
        </View>
      )
    )
  }

  return (
    <View
      className={classnames(styles.Navigation, props.className)}
      style={rootStyle}
    >
      <View
        className={className}
        style={{
          zIndex: 1000,
          paddingTop: isWeapp ? statusBarHeight : 0,
          ...contentStyle,
        }}
      >
        <View className={styles.content} style={{ height: stateHeigth }}>
          {renderLeftContent === false ? null : renderLeftContent ? (
            <View className={styles.leftBox}>{renderLeftContent}</View>
          ) : (
            renderGoBack()
          )}
          <View className={styles.title} style={titleStyle}>
            {props.children || title}
          </View>
        </View>
      </View>
    </View>
  )
}

const Navigation = memo(Component) as React.NamedExoticComponent<
  PropsWithChildren<NavigationProps>
> & {
  /**
   * 导航占位高度
   *
   */
  navigationHeight: number
}

Navigation.navigationHeight = navigationHeight

export default Navigation
