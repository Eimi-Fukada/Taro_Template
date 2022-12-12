import Taro from "@tarojs/taro";

export function throttle<T extends (...args: any) => any>(fun: T, time = 300) {
  let date = new Date();
  return (...args: Parameters<T>) => {
    return new Promise<ReturnType<T>>(resolve => {
      const now = new Date();
      if (now.getTime() - date.getTime() > time) {
        date = now;
        resolve(fun.apply(this, args));
      }
    });
  };
}

export const NavigationTo = throttle(({ url }: { url: string }) => {
  Taro.navigateTo({
    url: url,
    success: () => {}
  });
});

export const RedirectTo = throttle(({ url }: { url: string }) => {
  Taro.redirectTo({
    url: url,
    success: () => {}
  });
});

export const ReLaunch = throttle(({ url }: { url: string }) => {
  Taro.reLaunch({
    url: url,
    success: () => {}
  });
});

export const NavigationBack = throttle(({ delta = 1 }: { delta: number }) => {
  Taro.navigateBack({
    delta: delta
  });
});
