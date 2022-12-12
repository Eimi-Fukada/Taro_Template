import { View, Image } from "@tarojs/components";
import { FC, memo, PropsWithChildren, useMemo } from "react";
import Taro, {
  getCurrentPages,
  getMenuButtonBoundingClientRect,
  getSystemInfoSync
} from "@tarojs/taro";
import classnames from "classnames";
import styles from "./index.module.less";
import { NavigationProps, NavigationType } from "./const";
import images from "~/assets/icon-image/images";

const statusBarHeight = 20;

const menuButtonBoundingClientRect = {
  bottom: 56,
  height: 32,
  left: 278,
  right: 365,
  top: 24,
  width: 87
};

const stateHeigth =
  (menuButtonBoundingClientRect.top - statusBarHeight) * 2 +
  menuButtonBoundingClientRect.height;

export const navigationHeight = stateHeigth;

const Component: FC<PropsWithChildren<NavigationProps>> = props => {
  const {
    title,
    backVisible,
    renderLeftContent,
    renderRightContent,
    beforeNavBack,
    contentClass,
    contentStyle
  } = props;

  const rootStyle = useMemo(
    () => ({
      // height: navigationHeight,
      borderBottom: "0.5px solid transparent",
      ...props.style
    }),
    [props.style]
  );

  const className = useMemo(() => {
    return classnames(styles.fixed, contentClass);
  }, [contentClass]);

  async function hanldeNavBack() {
    let result = true;
    if (beforeNavBack) {
      result = await beforeNavBack();
    }
    if (result) {
      Taro.navigateBack({ delta: 1 });
    }
  }

  const renderGoBack = () => {
    // const { length } = getCurrentPages();
    /** 浏览器上如果刷新就会导致获取的路由length变成1 */
    return (
      backVisible && (
        <View className={styles.goback} onClick={hanldeNavBack}>
          <Image src={images.right} className={styles.leftIcon} />
        </View>
      )
    );
  };

  return (
    <View
      className={classnames(styles.Navigation, props.className)}
      style={rootStyle}
    >
      <View
        className={className}
        style={{
          zIndex: 1000,
          paddingTop: 0,
          ...contentStyle
        }}
      >
        <View className={styles.content} style={{ height: stateHeigth }}>
          {renderLeftContent ? (
            <View className={styles.leftBox}>{renderLeftContent}</View>
          ) : (
            renderGoBack()
          )}

          <View className={styles.title}>{props.children || title}</View>
          <View className={styles.rightBox}>{renderRightContent}</View>
        </View>
      </View>
    </View>
  );
};

const Navigation = memo(Component) as React.NamedExoticComponent<
  PropsWithChildren<NavigationProps>
> & {
  /**
   * 导航占位高度
   *
   */
  navigationHeight: number;
};

Navigation.navigationHeight = navigationHeight;

export default Navigation;
