import React, { FC, memo } from "react";
import { View, Text, Button, Image } from "@tarojs/components";
import styles from "./index.module.less";
import { IndexProps } from "./const";
import Taro from "@tarojs/taro";
import { routeNames } from "~/routes";
import Navigation from "~/components/Navigation";
import PageContainer from "~/layout/PageContainer";
import { ViewModel } from "./viewModel";
import Tabs from "./tabs";

const Component: FC<IndexProps> = () => {
  const { currentIndex, setCurrentIndex } = ViewModel();
  const templateImage = "imageUrl";

  return (
    <PageContainer>
      <Navigation title="TestPage" />
      <View className={styles.page}>
        <View className={styles.tabs}>
          <Tabs
            currentIndex={currentIndex}
            onChange={index => setCurrentIndex(index)}
          />
        </View>
        <Image src={templateImage} className={styles.templateImage} />

        <View className={styles.textBox}>
          <Text className={styles.text}>Hello world!</Text>
        </View>
        <Button
          onClick={() => Taro.navigateTo({ url: routeNames.home })}
          className={styles.btn}
        >
          Click Me
        </Button>
        <View className={styles.box} />
      </View>
    </PageContainer>
  );
};

const Index = memo(Component);
export default Index;
