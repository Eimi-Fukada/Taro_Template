import React, { FC } from "react";
import styles from "./index.module.less";
import { View, Image } from "@tarojs/components";
import { ToastProps } from "./const";
import Taro from "@tarojs/taro";
import images from "~/assets/icon-image/images";
import { render, unmountComponentAtNode } from "react-dom";

const ToastComponent: FC<ToastProps> = props => {
  const { message = "Message", icon = "success" } = props;
  return (
    <View className={styles.page}>
      <View className={styles.contain}>
        <Image
          src={icon === "success" ? images.right : images.icon}
          className={styles.success}
        />
        <View className={styles.text}>{message}</View>
      </View>
    </View>
  );
};

export const createToast = ({
  message,
  icon,
  type = "toast"
}: {
  message?: string;
  icon?: "success" | "fail";
  type?: "toast" | "copyToast" | "easyToast";
}) => {
  const view = document.createElement("view");
  const currentPages = Taro.getCurrentPages();
  const currentPage = currentPages[currentPages.length - 1];
  const path = currentPage.$taroPath;
  const pageElement = document.getElementById(path);

  function getRenderComponent() {
    switch (type) {
      case "toast":
        return <ToastComponent message={message} icon={icon} />;
      default:
        return <ToastComponent message={message} icon={icon} />;
    }
  }

  render(getRenderComponent(), view);
  pageElement?.appendChild(view);
  setTimeout(() => {
    destroyToast(view);
  }, 1500);
  return () => {
    destroyToast(view);
  };
};

export const destroyToast = node => {
  const currentPages = Taro.getCurrentPages();
  const currentPage = currentPages[currentPages.length - 1];
  const path = currentPage.$taroPath;
  const pageElement = document.getElementById(path);
  unmountComponentAtNode(node);
  pageElement?.removeChild(node);
};
