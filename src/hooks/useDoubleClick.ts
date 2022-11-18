import { ITouchEvent } from "@tarojs/components";
import { useRef, useState } from "react";
/**
 * 双击hooks
 * @abstract {为了解决双击事件会触发单击事件的问题}
 * 双击时, 首先触发了单击事件, 由于设置了 200ms 的延迟, 所以单击事件并没有立即触发,
 * 这个单击事件被存储在了 clickTimeout 中.在这300ms内, 发生了第二次单击鼠标的行为(双击),
 * 在双击事件中, clearTimeout(clickTimeout) 清除了存储在 clickTimeout 中的第一次单击事件,
 * 然后执行了双击事件的代码.
 * 而如果在300ms中没有触发第二次单击事件，则进入定时器触发单击事件
 */
export function useDoubleClick() {
  const [lastClickTime, setClickTime] = useState(0);
  /** 用来存储单击事件 */
  const clickTimeout = useRef() as any;

  const clearClickTimeout = () => {
    if (clickTimeout) {
      clearTimeout(clickTimeout.current);
      clickTimeout.current = null;
    }
  };

  return (click?: Function, doubleClick?: Function) => (e: ITouchEvent) => {
    const currentTime = e.timeStamp;
    const gap = currentTime - lastClickTime;
    if (gap > 0 && gap < 300) {
      clearClickTimeout();
      doubleClick && doubleClick(e);
    } else {
      clearClickTimeout();
      clickTimeout.current = setTimeout(() => {
        click && click(e);
      }, 200);
    }
    setClickTime(currentTime);
  };
}
