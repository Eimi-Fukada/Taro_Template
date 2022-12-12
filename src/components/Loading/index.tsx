import React, { memo, FC } from "react";
import styles from "./index.module.less";
import { View } from "@tarojs/components";
import { LoadingProps } from "./const";

const Component: FC<LoadingProps> = props => {
  const { color } = props;
  return (
    <View className={styles.loader}>
      <View className={styles.loaders}>
        <View className={styles.shadow}></View>
        <View
          className={styles.box}
          style={color ? { background: color } : {}}
        ></View>
      </View>
    </View>
  );
};

const Loading = memo(Component);
export default Loading;
