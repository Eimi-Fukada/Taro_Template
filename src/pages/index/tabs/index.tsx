import { memo, FC, useContext } from 'react'
import styles from './index.module.less'
import { View } from '@tarojs/components'
import { TabsProps } from './const'
import { ExploreContext } from '../const'

const Component: FC<TabsProps> = (props) => {
  const { onChange, currentIndex } = props
  const tabs = ['firstTab', 'SecondTab']
  // eslint-disable-next-line no-unused-vars
  const { contextState, dispatch } = useContext(ExploreContext)
  console.log('contextState', contextState)

  return (
    <View className={styles.page}>
      {tabs.map((item, index) => {
        return (
          <View
            key={index}
            className={index === currentIndex ? styles.itemActive : styles.item}
            onClick={() => onChange(index)}
          >
            {item}
          </View>
        )
      })}
      <View className={currentIndex === 1 ? styles.bgRight : styles.bg} />
    </View>
  )
}

const Tabs = memo(Component)
export default Tabs
