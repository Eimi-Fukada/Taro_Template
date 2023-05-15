import { useLayoutEffect, useRef } from 'react'
import './app.less'
import 'taro-ui/dist/style/index.scss'
import './components/Language/index'
import { useAtom } from 'jotai'
import { tabbarData, tabbarIndex } from './custom-tab-bar/store'
import Taro from '@tarojs/taro'

export default (props) => {
  useApp()

  // this.props.children 是将要会渲染的页面
  return props.children
}

// TODO：为了和app.ts里面的useApp解决自定义tabbar闪烁的问题，微信老狗
function useApp() {
  const [data] = useAtom(tabbarData)
  const [current, setCurrent] = useAtom(tabbarIndex)
  const oldSwitch = useRef(Taro.switchTab)

  /** 复写switchTabbar */
  useLayoutEffect(() => {
    function getExtendSwitchFuntion() {
      return function extendFunction(parameter) {
        const index = data.findIndex((it) => it.url === parameter.url)
        if (index !== -1 && current !== index) {
          setCurrent(index)
        }
        return oldSwitch.current.bind(this)(parameter)
      }
    }

    Taro.switchTab = getExtendSwitchFuntion()
  }, [current, data])
}
