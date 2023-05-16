import { memo, FC } from 'react'
import styles from './index.module.less'
import { View } from '@tarojs/components'
import { PageContainerProps } from './const'
import { getisNewIphone } from '~/utils/help'
import PageLoading from './PageLoading'
import ErrorBoundary from '../ErrorBoundary'

/**
 * 通用页面容器
 * 给页面添加安全底部
 */
const Component: FC<PageContainerProps> = (props) => {
  const { noPlace = false, loading = false, isTab = false, ...rest } = props

  return (
    <ErrorBoundary>
      <View className={styles.page} {...rest}>
        {loading ? <PageLoading /> : props.children}

        {isTab && <View className={styles.tabHeight} />}

        {getisNewIphone() && !noPlace && (
          <View className={styles.spacingIphone} />
        )}
      </View>
    </ErrorBoundary>
  )
}

const PageContainer = memo(Component)
export default PageContainer
