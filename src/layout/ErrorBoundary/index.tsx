import React from 'react'
import styles from './index.module.less'
import { View, Image } from '@tarojs/components'
import images from '~/assets/icon-image/images'
import { ErrorBoundaryProps } from './const'

class ErrorBoundary extends React.Component<ErrorBoundaryProps> {
  state = {
    hasError: false,
  }

  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromError(error) {
    return {
      hasError: true,
    }
  }

  componentDidCatch(error, errorInfo) {
    console.log('error==>', error, errorInfo)
  }

  render() {
    return this.state.hasError ? (
      <View className={styles.box}>
        <Image src={images.error} className={styles.errorIcon} />
        <View className={styles.errorBox}>
          <View className={styles.errorText}>Unknown error occurred</View>
          <View
            className={styles.errorBtn}
            onClick={() => window.location.reload()}
          >
            Retry
          </View>
        </View>
      </View>
    ) : (
      this.props.children
    )
  }
}

export default ErrorBoundary
