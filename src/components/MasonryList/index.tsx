import React, { memo, FC, useState, useRef, useEffect } from 'react'
import styles from './index.module.less'
import { View } from '@tarojs/components'
import { MasonryListProps } from './const'
import Taro from '@tarojs/taro'
import CalcDom from './calcDom'

const TemplateComponent = () => {
  return <View>Component</View>
}

/**
 * 瀑布流组件
 * @returns
 */
const Component: FC<MasonryListProps> = (props) => {
  const { gap = 10, data } = props

  const [leftData, setLeftData] = useState<any[]>([])
  const [rightData, setRightData] = useState<any[]>([])

  const width = useRef((Taro.getSystemInfoSync().screenWidth - gap * 3) / 2)
  const dataHeightRef = useRef<Record<string, number>>({})
  const leftViewHeight = useRef(0)
  const rightViewHeight = useRef(0)

  const isInitRef = useRef(false)

  const calcDomRef = useRef<any>()

  useEffect(() => {
    /** 如果新的列表长度短于当前已经渲染的长度。表示是新列表。重新计算 */
    isInitRef.current =
      data.length < leftData.length + rightData.length ||
      (data.length <= 10 && leftData.length + rightData.length <= 10)
    /** 提取新列表数据 */
    const renderList = data.filter(({ ticket: { ticketId } }) => {
      return !dataHeightRef.current[ticketId] || isInitRef.current
    })
    calcDomRef
      .current!.getDataMap(renderList)
      .then((heightMap: Record<string, number>) => {
        if (isInitRef.current) {
          dataHeightRef.current = {}
          leftViewHeight.current = 0
          rightViewHeight.current = 0
        }

        dataHeightRef.current = { ...dataHeightRef.current, ...heightMap }

        const left: any[] = []
        const right: any[] = []
        // console.log(dataHeightRef.current, renderList)
        renderList.forEach((item) => {
          const {
            ticket: { ticketId },
          } = item
          const height = (dataHeightRef.current[ticketId] || 0) + gap
          // console.log(leftViewHeight.current, rightViewHeight.current, height)
          if (leftViewHeight.current <= rightViewHeight.current) {
            left.push(item)
            leftViewHeight.current += height
          } else {
            right.push(item)
            rightViewHeight.current += height
          }
        })

        setLeftData((pre) => (isInitRef.current ? left : pre.concat(left)))
        setRightData((pre) => (isInitRef.current ? right : pre.concat(right)))
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <>
      <CalcDom style={{ width: width.current }} ref={calcDomRef} />
      {!!data.length && (
        <View className={styles.masonryListStyle}>
          {/* 左列 */}
          <View className={styles.lview}>
            {leftData.map((item) => (
              <View key={item.ticket.ticketId} className={styles.item}>
                <TemplateComponent />
              </View>
            ))}
          </View>
          {/* 右列 */}
          <View className={styles.sview}>
            {rightData.map((item) => (
              <View key={item.ticket.ticketId} className={styles.item}>
                <TemplateComponent />
              </View>
            ))}
          </View>
        </View>
      )}
    </>
  )
}

const MasonryList = memo(Component)
export default MasonryList
