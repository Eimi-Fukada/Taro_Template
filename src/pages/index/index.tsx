import { FC, memo } from 'react'
import { View, Text, Button, Image } from '@tarojs/components'
import styles from './index.module.less'
import { ExploreContext, IndexProps } from './const'
import Navigation from '~/components/Navigation'
import PageContainer from '~/layout/PageContainer'
import { viewModel } from './viewModel'
import Tabs from './tabs'
import apis from '~/request'

const Component: FC<IndexProps> = () => {
  const { currentIndex, setCurrentIndex, contextState, dispatch } = viewModel()
  const templateImage =
    'https://twmw.oss-ap-southeast-1.aliyuncs.com/aliyun-oss/1-2022-12-23-16%3A56%3A47.webp'

  return (
    <PageContainer>
      <Navigation title="TestPage" />
      <ExploreContext.Provider value={{ contextState, dispatch }}>
        <View className={styles.page}>
          <View className={styles.tabs}>
            <Tabs currentIndex={currentIndex} onChange={(index) => setCurrentIndex(index)} />
          </View>
          <Image src={templateImage} className={styles.templateImage} />

          <View className={styles.textBox}>
            <Text className={styles.text}>Hello world!</Text>
          </View>
          <Button className={styles.btn}>Click Me</Button>
        </View>
      </ExploreContext.Provider>
    </PageContainer>
  )
}

const Index = memo(Component)
export default Index
