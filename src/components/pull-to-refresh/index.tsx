/* eslint-disable no-console */
import { PropsWithChildren, PureComponent } from "react";
import { View, ScrollView } from "@tarojs/components";
import { ITouch, ITouchEvent } from "@tarojs/components/types/common";
import Taro, { getCurrentInstance, nextTick } from "@tarojs/taro";
import classname from "classnames";
import {
  IPullToRefreshProps,
  IPullToRefreshState,
  PullToRefreshState,
} from "./const";
import styles from "./index.modules.less";
import { AtLoadMore } from "taro-ui";
import { autobind, debounce, selectRect, throttleLast } from "~/utils";

/**
 * @name 下拉刷新
 */
@autobind
export default class PullToRefresh extends PureComponent<
  PropsWithChildren<IPullToRefreshProps>,
  IPullToRefreshState
> {
  static defaultProps = {
    enablePull: true,
    height: 0,
    noMoreText: "",
    bottom: false,
    showScrollbar: true,
  };

  static getDerivedStateFromProps(
    nextProps: IPullToRefreshProps,
    prevState: IPullToRefreshState
  ) {
    if (nextProps.state === PullToRefreshState.refreshing) {
      return {
        top: PullToRefresh.loadingHeight,
        pulling: false,
      };
    }

    if (prevState.pulling) {
      return null;
    }

    return {
      top: 0,
    };
  }

  public state: IPullToRefreshState = {
    pulling: false,
    scrollViewHeight: 0,
    // eslint-disable-next-line no-invalid-this
    top:
      this.props.state === PullToRefreshState.refreshing
        ? PullToRefresh.loadingHeight
        : 0,
    showNoMoreText: false,
    // scrollTop: undefined
  };

  /** 当前滚动条高度 */
  private scrollTop = 0;

  static loadingHeight = 50;

  /** 记录开始startTouch */
  private startTouch: ITouch | undefined;

  /** 可以拖动开始 */
  private get canPull() {
    if (this.props.state !== PullToRefreshState.none) {
      return false;
    }

    if (this.scrollTop > 5) {
      return false;
    }
    return true;
  }

  private get classNameContent() {
    const classNames = [styles.content];
    if (this.props.state === PullToRefreshState.refreshing) {
      classNames.push(styles.content__refreshing);
    }

    return classname(...classNames);
  }

  componentDidMount() {
    nextTick(() => {
      this.calculateScrollViewHeight();
    });
    this.setNoMore();
  }

  componentDidUpdate() {
    nextTick(() => {
      this.calculateScrollViewHeight();
    });
    this.setNoMore();
  }

  render() {
    const { top } = this.state;
    const height = PullToRefresh.loadingHeight;
    const style =
      this.state.scrollViewHeight !== 0
        ? { height: this.state.scrollViewHeight + "px" }
        : {};
    return (
      <View className={classname(styles.PullToRefresh)} style={{ ...style }}>
        <View id="PullToRefreshTop" />
        <ScrollView
          id="InnerScrollView"
          scrollY
          enhanced
          bounces={false}
          showScrollbar={this.props.showScrollbar}
          onScroll={this.onScroll}
          lowerThreshold={100}
          onScrollToLower={this.onScrollToLower}
          className={styles.scrollView}
        >
          <View
            className={this.classNameContent}
            style={{ top }}
            onTouchMove={this.onTouchMove}
            onTouchEnd={this.onTouchEnd}
          >
            {/* <View className={styles.loading} style={{ marginTop: -height + 'px', height: height + 'px' }}>
              <AtLoadMore status="loading" loadingText='' />
            </View> */}

            {this.props.children}

            {this.renderMyFooter()}

            {this.props.renderFooter}
          </View>
        </ScrollView>
      </View>
    );
  }

  private renderMyFooter() {
    const { state, empty, noMore, noMoreText } = this.props;
    const { showNoMoreText } = this.state;
    if (state === PullToRefreshState.pushing) {
      return (
        <View className={styles.footerLoading}>
          <AtLoadMore status="loading" loadingText="" />
        </View>
      );
    } else if (state !== PullToRefreshState.refreshing) {
      if (empty) {
        return empty;
      } else if (noMore && showNoMoreText) {
        return <View className={styles.more}>{noMoreText}</View>;
      }
    }
  }

  private onScrollToLower() {
    const { state, noMore, onScrollToLower } = this.props;
    if (state !== PullToRefreshState.pushing && !noMore) {
      this.setState({ showNoMoreText: false });
      onScrollToLower();
    }
  }

  @debounce(100)
  private async reviseScrollTop() {
    Taro.createSelectorQuery()
      .select("#InnerScrollView")
      .scrollOffset((res) => {
        this.scrollTop = res.scrollTop;
      })
      .exec();
  }

  private onScroll(event) {
    this.scrollTop = event.target.scrollTop;
    this.reviseScrollTop();
  }

  async calculateScrollViewHeight() {
    const { bottom } = this.props;
    let scrollViewHeight = this.props.height;

    try {
      if (!scrollViewHeight || scrollViewHeight === 0) {
        const topViewRes = await selectRect("#PullToRefreshTop");
        // const { screenHeight } = await Taro.getSystemInfoSync();
        /**
         * @abstract H5上不要调用Taro.getSystemInfoSync() 获取可视区域高度，不准确
         * */
        const screenHeight = window.innerHeight;
        scrollViewHeight =
          screenHeight - topViewRes.top - (bottom ? topViewRes.bottom : 0);
      }
      this.setState({
        scrollViewHeight,
      });
    } catch (error) {
      console.log(error);
    }
  }

  private setNoMore() {
    const { noMoreTextDelay, noMore, state, empty } = this.props;
    // 如果状态完毕、非空并且需要渲染更多
    if (
      state === PullToRefreshState.none &&
      !empty &&
      noMore &&
      !this.state.showNoMoreText
    ) {
      if (noMoreTextDelay) {
        setTimeout(() => {
          this.setState({ showNoMoreText: true });
        }, noMoreTextDelay);
      } else {
        this.setState({ showNoMoreText: true });
      }
    }
  }

  @throttleLast(60)
  private onTouchMove(event: ITouchEvent) {
    const { enablePull, state } = this.props;
    if (!enablePull) {
      return;
    }

    if (!this.canPull) {
      this.startTouch = undefined;
      if (state !== PullToRefreshState.refreshing) {
        this.setState({ top: 0 });
      }
      return;
    }

    const [touche] = event.touches;
    if (!this.startTouch) {
      this.startTouch = touche;
      return;
    }

    const top = touche.clientY - this.startTouch.clientY;
    if (top > 0) {
      this.setState({
        pulling: true,
        top: Math.min(top, PullToRefresh.loadingHeight),
      });
    }
  }

  private async onTouchEnd(_event: ITouchEvent) {
    if (!this.canPull) {
      return;
    }

    if (this.state.top < PullToRefresh.loadingHeight) {
      this.setState({ top: 0 });
      this.startTouch = undefined;
      return;
    }

    this.setState({ top: PullToRefresh.loadingHeight, pulling: false });
    this.startTouch = undefined;

    this.setState({ showNoMoreText: false });
    this.props.onRefresh();
  }
}
