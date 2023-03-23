import Taro, { useDidShow } from "@tarojs/taro";
import ticketList from "./images/ticketList.svg";
import ticketListActive from "./images/ticketListActive.svg";
import notice from "./images/notice.svg";
import noticeActive from "./images/noticeActive.svg";
import mine from "./images/mine.svg";
import mineActive from "./images//mineActive.svg";
import beep from "./images/beep.svg";
import beepActive from "./images/beepActive.svg";
import { useState } from "react";

export interface TabBarData {
  /** 图标 */
  image: any;

  /** 选中时候的样式 */
  imageSelected: any;

  /** 跳转连接 */
  url: string;

  /** 文字 */
  text?: string;
}

const defaultTabbarData = [
  {
    image: beep,
    imageSelected: beepActive,
    url: "/"
  },
  {
    image: ticketList,
    imageSelected: ticketListActive,
    url: "/index"
  },
  {
    image: notice,
    imageSelected: noticeActive,
    url: "/notification"
  },
  {
    image: mine,
    imageSelected: mineActive,
    url: "/profile"
  }
];

export default function useTabbar() {
  const [data, setData] = useState<TabBarData[]>(defaultTabbarData);
  const [current, setCurrent] = useState(0);

  useDidShow(() => {
    const route = Taro.getCurrentPages()[0].route?.split("?")[0];
    route &&
      setCurrent(
        defaultTabbarData.findIndex(value => value.url === route) ?? current
      );
  });

  return {
    data,
    current,
    setData,
    setCurrentValue: setCurrent
  };
}
