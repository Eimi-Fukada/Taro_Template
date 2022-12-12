import React, { memo, useMemo, FC } from "react";
import styles from "./index.module.less";
import { Image } from "@tarojs/components";
import { PictureProps } from "./const";
import Taro from "@tarojs/taro";
import classnames from "classnames";
import { useDoubleClick } from "~/hooks/useDoubleClick";
import ImageLoad from "../ImageLoad";

const Component: FC<PictureProps> = props => {
  const { src, onClick, onDoubleClick, mode = "scaleToFill" } = props;

  const buttonOnDoubleClick = useDoubleClick();

  const rootStyle = useMemo(
    () => ({
      ...props.style
    }),
    [props.style]
  );

  return (
    <ImageLoad
      src={src}
      onClick={buttonOnDoubleClick(
        () => onClick && onClick(),
        () => onDoubleClick && onDoubleClick()
      )}
      style={rootStyle}
      className={classnames(styles.imageBox, props.className)}
      mode={mode}
    />
  );
};

const Picture = memo(Component);
export default Picture;
