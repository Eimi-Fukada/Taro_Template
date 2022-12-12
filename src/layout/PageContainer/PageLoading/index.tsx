import React, { memo, FC } from "react";
import styles from "./index.module.less";
import { View } from "@tarojs/components";
import { PageLoadingProps } from "./const";
import Taro from "@tarojs/taro";

const Component: FC<PageLoadingProps> = () => {
  const loadingList = ["L", "O", "A", "D", "I", "N", "G", "..."];

  return (
    <View className={styles.page}>
      {loadingList.map(item => {
        return (
          <View key={item} className={styles.textItem}>
            {item}
          </View>
        );
      })}
    </View>
  );
};

const PageLoading = memo(Component);
export default PageLoading;
