import React, { memo, useState, FC } from "react";
import styles from "./index.module.less";
import { View } from "@tarojs/components";
import { TabsProps } from "./const";
import Taro from "@tarojs/taro";

const Component: FC<TabsProps> = props => {
  const { onChange, currentIndex } = props;
  const tabs = ["firstTab", "SecondTab"];

  return (
    <View className={styles.page}>
      {tabs.map((item, index) => {
        return (
          <View
            key={index}
            className={index === currentIndex ? styles.itemActive : styles.item}
            onClick={() => onChange(index)}
          >
            {item}
          </View>
        );
      })}
      <View className={currentIndex === 1 ? styles.bgRight : styles.bg} />
    </View>
  );
};

const Tabs = memo(Component);
export default Tabs;
