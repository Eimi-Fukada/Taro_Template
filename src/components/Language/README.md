# 使用方法

```js
// 使用前需要在app.ts中默认导入
import { useTranslation } from "react-i18next";
const { i18n, t } = useTranslation();
/** 获取当前语言 */
i18n.language;
/** 根据key取对应的value */
t("home");
/** 切换语言*/
i18n.changeLanguage("zh");
```
