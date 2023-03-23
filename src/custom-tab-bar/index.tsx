import React, { FC, memo, useState } from "react";
import styles from "./index.module.less";
import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import useTabbar from "./store";

const Component: FC = memo(() => {
  const { data, current } = useTabbar();
  const [redDot, setRedDot] = useState(0);

  async function handleClick(url: string) {
    Taro.redirectTo({ url });
  }

  return (
    <View className={styles.heightBox}>
      <View className={styles.page}>
        <View className={styles.box}>
          {data.map((value, index) => (
            <View
              key={value.url + index}
              className={
                current === index ? styles.contentSelected : styles.content
              }
              onClick={() => handleClick(value.url)}
            >
              <View
                className={styles.image}
                style={{
                  backgroundImage: `url(${
                    current === index ? value.imageSelected : value.image
                  })`
                }}
              />
              {redDot > 0 && index === 2 && <View className={styles.redDot} />}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
});

const TabBar = memo(Component);
export default TabBar;
