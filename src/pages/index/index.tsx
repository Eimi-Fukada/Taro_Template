import React, { FC, memo, PropsWithChildren, useEffect } from "react";
import { View, Text, Button } from "@tarojs/components";
import styles from "./index.module.less";
import { IndexProps } from "./const";
import Taro from "@tarojs/taro";
import { routeNames } from "~/routes";
import Navigation from "~/components/Navigation";
import { get } from "~/request/http";

const Component: FC<IndexProps> = () => {
  return (
    <>
      <Navigation title="hello" />
      <View>
        <Text>Hello world!</Text>
        <Button
          type="primary"
          onClick={() => Taro.navigateTo({ url: routeNames.home })}
        >
          Click It
        </Button>
      </View>
    </>
  );
};

const Index = memo(Component);
export default Index;
