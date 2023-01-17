import { View, Image } from "@tarojs/components";
import { FC, memo, PropsWithChildren, useMemo } from "react";
import Taro, {
  getCurrentPages,
  getMenuButtonBoundingClientRect,
  getSystemInfoSync,
  useRouter
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
    backVisible = true,
    renderLeftContent,
    renderRightContent,
    beforeNavBack,
    contentClass,
    contentStyle,
    titleStyle
  } = props;
  const path = useRouter().path;

  const rootStyle = useMemo(
    () => ({
      // height: navigationHeight,
      ...props.style
    }),
    [props.style]
  );

  const className = useMemo(() => {
    return classnames(styles.fixed, contentClass);
  }, [contentClass]);

  async function hanldeNavBack() {
    let result = true;
    const normal = window.sessionStorage.getItem("normal");
    if (beforeNavBack) {
      result = await beforeNavBack();
    }
    if (result) {
      if (!normal) {
        Taro.redirectTo({ url: "/" });
      } else {
        Taro.navigateBack({ delta: 1 });
      }
    }
  }

  const renderGoBack = () => {
    // const { length } = getCurrentPages();
    return (
      // length > 1 &&
      backVisible && (
        <View className={styles.goback} onClick={hanldeNavBack}>
          <Image src={images.left} className={styles.leftIcon} />
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
          ...contentStyle
        }}
      >
        <View className={styles.content}>
          {renderLeftContent ? (
            <View className={styles.leftBox}>{props.renderLeftContent}</View>
          ) : (
            renderGoBack()
          )}

          <View className={styles.title} style={titleStyle}>
            {props.children || title}
          </View>
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
