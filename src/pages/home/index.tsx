import React, { memo, FC } from "react";
import styles from "./index.module.less";
import { Button, View } from "@tarojs/components";
import { HomeProps } from "./const";
import Taro from "@tarojs/taro";
import Navigation from "~/components/Navigation";
import PageContainer from "~/layout/PageContainer";
import { ViewModel } from "./viewModel";

const Component: FC<HomeProps> = () => {
  const {} = ViewModel();

  return (
    <PageContainer>
      <Navigation title="home" />
      <View className={styles.page}>
        <Button type="primary" onClick={() => Taro.navigateBack()}>
          go back
        </Button>
      </View>
    </PageContainer>
  );
};

const Home = memo(Component);
export default Home;
