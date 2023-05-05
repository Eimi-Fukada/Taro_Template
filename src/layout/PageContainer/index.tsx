import { memo, FC } from 'react'
import styles from './index.module.less'
import { View } from '@tarojs/components'
import { PageContainerProps } from './const'
import { getisNewIphone } from '~/utils/help'
import PageLoading from './PageLoading'
import ErrorBoundary from '../ErrorBoundary'

const isH5 = process.env.TARO_ENV === 'h5'

const Component: FC<PageContainerProps> = (props) => {
  const { noPlace = false, loading = false, ...rest } = props

  return (
    <ErrorBoundary>
      <View className={styles.page} {...rest}>
        {loading ? <PageLoading /> : props.children}

        {getisNewIphone() && !noPlace && isH5 && <View className={styles.spacingIphone} />}
      </View>
    </ErrorBoundary>
  )
}

const PageContainer = memo(Component)
export default PageContainer
