export const isH5 = process.env.TARO_ENV === "h5"; // 是不是h5
export const isWeapp = process.env.TARO_ENV === "weapp"; // 是不是小程序环境

export const isDev = process.env.NODE_ENV === "development"; // 开发环境

export const apiUrl = isDev
  ? "https://china.qieryideas.com/api"
  : "https://china.qieryideas.com/api";
