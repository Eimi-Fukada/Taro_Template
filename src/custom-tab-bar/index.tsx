import React, { FC, memo } from 'react'
import styles from './index.module.less'
import { View, Image } from '@tarojs/components'
import useTabbar from './store'

const Component: FC = memo(() => {
  const { data, current, handleClick } = useTabbar()

  return (
    <View className={styles.heightBox}>
      <View className={styles.page}>
        <View className={styles.box}>
          {data.map((value, index) => (
            <View
              key={value.url + index}
              className={current === index ? styles.contentSelected : styles.content}
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
      </View>
    </View>
  )
})

const TabBar = memo(Component)
export default TabBar
