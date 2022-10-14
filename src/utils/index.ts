import coreAutobind from "core-decorators/lib/autobind";
import Taro, { nextTick } from "@tarojs/taro";

/**
 * 绑定this
 *
 * @export
 * @returns
 */
export const autobind = coreAutobind;

/**
 * 延迟触发  多次提交，提交最后一次
 *
 * @export
 * @param {number} [time=10]
 * @returns {MethodDecorator}
 */
export function debounce(time: number = 200): MethodDecorator {
  let st;
  return (_target, _name, descriptor: any) => {
    const fun = descriptor.value;
    descriptor.value = function(...args) {
      clearTimeout(st);
      st = setTimeout(() => {
        fun.apply(this, args);
      }, time);
    };
    return descriptor;
  };
}

/**
 * 特殊限流，最后一次的函数肯定触发
 *
 * @export
 * @param {number} [time=200]
 * @returns {MethodDecorator}
 */
export function throttleLast(time: number = 200): MethodDecorator {
  let date = new Date();
  let stLast;
  return (_target, _name, descriptor: any) => {
    const fun = descriptor.value;
    descriptor.value = function(...args) {
      const now = new Date();
      clearTimeout(stLast);
      if (now.getTime() - date.getTime() > time) {
        date = now;
        fun.apply(this, args);
      } else {
        stLast = setTimeout(() => {
          fun.apply(this, args);
        }, time);
      }
    };
    return descriptor;
  };
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
  return new Promise<Taro.NodesRef.BoundingClientRectCallbackResult>(
    (resolve, reject) => {
      nextTick(() => {
        const query = Taro.createSelectorQuery();
        query
          .select(name)
          .boundingClientRect(res => {
            resolve(res as Taro.NodesRef.BoundingClientRectCallbackResult);
          })
          .exec();
      });
    }
  );
}
