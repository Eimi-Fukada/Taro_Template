import Taro from '@tarojs/taro'

/** 支持路径参数替换的拦截器 */
const urlArgsHandler = {
  request: {
    onFulfilled: (config: Taro.Chain) => {
      const requestParams = config.requestParams
      const { data, url, args, params } = requestParams
      return config.proceed(requestParams).then((response: Taro.request.SuccessCallbackResult) => {
        if (data) {
          const lostParams: string[] = []
          const replacedUrl = url!.replace(/\{([^}]+)\}/g, (res, arg: string) => {
            if (!data[arg]) {
              lostParams.push(arg)
            }
            // 这里吧args里面的参数拼到路径后面
            return args[arg] as string
          })
          if (lostParams.length) {
            return Promise.reject(new Error('在args中找不到对应的路径参数'))
          }
          return { ...response, url: replacedUrl }
        }
        return response
      })
    },
  },
}

export default urlArgsHandler
