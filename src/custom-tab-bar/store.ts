import Taro, { useDidShow } from '@tarojs/taro'
import ticketList from './images/ticketList.svg'
import ticketListActive from './images/ticketListActive.svg'
import notice from './images/notice.svg'
import noticeActive from './images/noticeActive.svg'
import mine from './images/mine.svg'
import mineActive from './images//mineActive.svg'
import beep from './images/beep.svg'
import beepActive from './images/beepActive.svg'
import { atom, useAtom } from 'jotai'

export interface TabBarData {
  /** 图标 */
  image: any

  /** 选中时候的样式 */
  imageSelected: any

  /** 跳转连接 */
  url: string

  /** 文字 */
  text?: string

  /** 红点 */
  redHot?: boolean

  /** 未读数 */
  count?: number
}

const defaultTabbarData = [
  {
    image: beep,
    imageSelected: beepActive,
    url: '/',
  },
  {
    image: ticketList,
    imageSelected: ticketListActive,
    url: '/index',
  },
  {
    image: notice,
    imageSelected: noticeActive,
    url: '/notification',
  },
  {
    image: mine,
    imageSelected: mineActive,
    url: '/profile',
  },
]

// TODO：为了和app.ts里面的useApp解决自定义tabbar闪烁的问题，微信老狗
export const tabbarData = atom<TabBarData[]>(defaultTabbarData)
export const tabbarIndex = atom<number>(0)

export default function useTabbar() {
  const [data, setData] = useAtom(tabbarData)
  const [current, setCurrent] = useAtom(tabbarIndex)

  function setCount(index: number, count: number) {
    setData(
      data.map((value, dataIndex) => {
        if (index === dataIndex) {
          value.count = count
        }
        return value
      })
    )
  }

  function setRedDot(index: number, redHot: boolean) {
    setData(
      data.map((value, dataIndex) => {
        if (index === dataIndex) {
          value.redHot = redHot
        }
        return value
      })
    )
  }

  // eslint-disable-next-line no-unused-vars
  const handleBeforeClick = async (index) => {
    // if ([routeNames.tabBarShopCart].indexOf(data[index].url) !== -1 ) {
    //   Taro.navigateTo({ url: routeNames.auth })
    //   throw new Error('需要授权')
    // }
  }

  async function handleClick(url: string, index: number) {
    await handleBeforeClick(index)
    Taro.switchTab({ url })
  }

  useDidShow(() => {
    const route = Taro.getCurrentPages()[0].route
    route &&
      setCurrent(
        defaultTabbarData.findIndex((value) => value.url === '/' + route) ??
          current
      )
  })

  return {
    data,
    current,
    setData,
    setRedDot,
    setCount,
    setCurrentValue: setCurrent,
    handleClick,
  }
}
