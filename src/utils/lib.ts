import coreAutobind from 'core-decorators/lib/autobind'
import Taro, { nextTick } from '@tarojs/taro'

/**
 * 绑定this
 *
 * @export
 * @returns
 */
export const autobind = coreAutobind

/**
 * 防抖 应用于hook写法，类写法用装饰器@debounce(wait) 适用与input
 * @param func
 * @param wait
 */
export function debounce<T extends (...args: any) => any>(fn: T, delay = 300) {
  let timer = null as any
  return function(this: unknown, ...args: Parameters<T>) {
    return new Promise<ReturnType<T>>((resolve) => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        Reflect.apply(fn, this, args)
      }, delay)
    })
  }
}

/**
 * 节流函数  应用于hook写法，类写法用装饰器@throttle(wait),适用于表单提交
 * @param fn
 * @param interval
 */
/* 函数节流 */
export function throttle<T extends (...args: any) => any>(fn: T, interval = 300) {
  let enterTime = 0 // 触发的时间
  const gapTime = interval // 间隔时间，如果interval不传，则默认300ms
  return function(this: unknown, ...args: Parameters<T>) {
    const backTime = new Date() as any // 第一次函数return即触发的时间
    if (backTime - enterTime > gapTime) {
      Reflect.apply(fn, this, args)
      enterTime = backTime // 赋值给第一次触发的时间，这样就保存了第二次触发的时间
    }
  }
}

/**
 * 模拟异步
 */
export function sleep(time = 1000) {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

/**
 * 查询元素大小
 *
 * @export
 * @param {string} name
 * @param {*} scope
 * @returns
 */
export function selectRect(name: string) {
  return new Promise<Taro.NodesRef.BoundingClientRectCallbackResult>((resolve, reject) => {
    nextTick(() => {
      const query = Taro.createSelectorQuery()
      query
        .select(name)
        .boundingClientRect((res) => {
          resolve(res as Taro.NodesRef.BoundingClientRectCallbackResult)
        })
        .exec()
    })
  })
}
