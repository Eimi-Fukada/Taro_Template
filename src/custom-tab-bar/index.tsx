import React, { FC, memo } from 'react'
import styles from './index.module.less'
import { View, Image } from '@tarojs/components'
import useTabbar from './store'
import { getisNewIphone } from '~/utils/help'

/**
 * 自定义tabbar
 * 增加底部安全区
 * Taro.getSystemInfo({
      success: (res) => {
        console.log(
          'res====>',
          res.screenHeight - res.safeArea?.bottom, = 34
        )
      },
    })
*/
const TabBar: FC = memo(() => {
  const { data, current, handleClick } = useTabbar()

  return (
    <View className={styles.page}>
      <View className={styles.box}>
        {data.map((value, index) => (
          <View
            key={value.url + index}
            className={
              current === index ? styles.contentSelected : styles.content
            }
            onClick={() => handleClick(value.url, index)}
          >
            <Image
              className={styles.image}
              src={current === index ? value.imageSelected : value.image}
            />
            {!!value.redHot && <View className={styles.redDot} />}
            {!!value.count && <View className={styles.count} />}
          </View>
        ))}
      </View>
      {getisNewIphone() && <View className={styles.spacingIphone} />}
    </View>
  )
})

TabBar.displayName = 'TabBar'

export default TabBar
