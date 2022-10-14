
import type { FC } from 'react';
import React, { memo } from 'react';
import styles from './index.module.less';
import { Button, View } from "@tarojs/components";
import {HomeProps} from './const';
import Taro from '@tarojs/taro';
import Navigation from '~/components/navigation';

const Component: FC<HomeProps> = () => {
    return (
      <>
        <Navigation title="home" />
      <View className={styles.page}>
        <Button type="primary" onClick={() => Taro.navigateBack()}>go back</Button>
      </View>
      </>
    );
  };
  
  const Home = memo(Component);
  export default Home;
