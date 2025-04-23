## 为什么要自己动手做一个验证码？

目前常见的验证码大多是数字和字母的组合，样式和交互体验相对普通。现在比较流行的验证码形式包括滑动验证码、拼图验证码、短信验证码等，这些方式的用户体验较好。我本来打算直接使用第三方验证码库，但最近在各大平台（包括 NPM 和 GitHub）搜索了一番，却未能找到合适的解决方案。

-   要么下载量太少

-   要么设计感不足，样式不好看

-   有设计感且成熟的库往往需要付费

-   有的库甚至没有提供使用文档，连基本的 API 介绍都缺乏

-   有的库则是调用 API 逻辑特别复杂。

-   如果是 Vue 组件，那么 React 组件又不支持，相反也是。

所以我最后决定开发一个吧，从 UI 设计到开发，再到后端接口。过程中发现比预想的要复杂，难怪一些优秀的库要收费。但经过几天的努力，最终我还是做出了一个免费提供给需要的宝子使用的版本。如果有需要整套源码独立部署或者加强安全措施的，另行商议。

## 验证码预览效果

请自行前往体验 https://note.noxussj.top/plugin/puzzle-captcha.html 

## 免费版验证码调用

### 初始化

首先需要引入博主提供的 `puzzle-captcha-button.js` 文件，`puzzle-captcha-button.css` 不需要引入，只要放在同一个目录下即可。

然后通过标签 `<puzzle-captcha-button />` 即可渲染验证码组件

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <script src="./puzzle-captcha-button.js"></script>
    </head>
    <body>
        <puzzle-captcha-button />
    </body>
</html>
```

### 事件监听

通过事件 `addEventListener('success')` 和 `addEventListener('fail')` 可以监听验证码的校验结果

```html
<script>
    document
        .querySelector('puzzle-captcha-button')
        .addEventListener('success', () => {
            console.log('校验成功')
        })

    document
        .querySelector('puzzle-captcha-button')
        .addEventListener('fail', () => {
            console.log('校验失败')
        })
</script>
```

### 通过 CSS Variables 修改样式（推荐）

验证码 Web Components 组件采用了 attachShadow 的沙箱模式，确保外部样式不会影响组件内部，避免项目的 CSS 代码与组件样式发生冲突。

为了方便用户自定义样式，组件支持 CSS 变量修改部分常用样式。

```html
<style>
    puzzle-captcha-button {
        /** 验证按钮样式 */
        --puzzle-button-width: 260px; /** 按钮宽度 */
        --puzzle-button-height: 50px; /** 按钮高度 */
        --puzzle-button-fontSize: 16px; /** 按钮字体大小 */
        --puzzle-button-background: #2b2d30; /** 按钮背景色 */
        --puzzle-button-tag: linear-gradient(
            to bottom,
            #ceff20 0%,
            #27e500 100%
        ); /** 左侧灯牌背景色 */

        /** 拼图弹窗样式 */
        --puzzle-popup-background: rgba(43, 45, 48, 1); /** 背景色 */
        --puzzle-popup-title-color: #fff; /** 标题颜色 */
        --puzzle-popup-button-background: linear-gradient(
            to right,
            #b5dc2b 0%,
            #38c21b 100%
        ); /** 滑动按钮背景色 */
    }
</style>
```

### 通过修改 `puzzle-captcha-button.css` 样式文件

由于 CSS Variables 支持的样式修改有限，如果需要调整更多样式，可以直接编辑 `puzzle-captcha-button.css` 文件。所有拼图验证码的样式都定义在这个文件中。

在修改时请务必小心，因为不当修改可能会导致拼图验证码的计算出现问题，从而导致程序崩溃。

建议仅修改颜色、背景色、字体大小、圆角等简单样式。对于弹窗宽度、高度、拼图块大小等样式，不建议进行修改。

### 加强验证码安全性

上面的验证码示例调用非常简单，基本上是纯前端实现。然而，它无法有效保障接口的安全性。

#### 例如登录接口，纯前端实现验证码逻辑如下：

1. 用户在表单中输入账号和密码等信息

2. 点击验证码按钮，触发验证码验证功能（验证码会调用其自带的接口进行校验）

3. 校验成功后，再次调用登录接口，传递参数 `{ account: 'xiaoming', password: '123456' }`

4. 登录成功

然而，如果有人通过抓包工具直接调用登录接口，就可以绕过验证码

如果只是为了练习，可以使用纯前端的验证码方式

<br />

#### 前后端实现验证码逻辑如下：

1. 用户在表单中输入账号和密码等信息

2. 点击验证码按钮，触发验证功能（不发起自带的接口请求）

3. 拼图验证码拖拽结束后，将拖拽的距离参数 `x` 和验证码图片的 `uuid` 参数存储起来

4. 调用登录接口，传递参数 `{ account: 'xiaoming', password: '123456', x: 50, uuid: '09cb9471-896e-4b05-9b88-f7ef8e15f27b' }`

5. 后端在登录逻辑中调用菜园前端验证码接口 `/api/v1/captcha`，传递参数 `{ x: 50, uuid: '09cb9471-896e-4b05-9b88-f7ef8e15f27b' }`

6. 将 `/api/v1/captcha` 接口的校验结果返回给前端

7. 前端将结果传递给 `document.querySelector('puzzle-captcha-button').api` 函数

8. 验证码校验完毕，登录成功

通过这种方式，即使有人绕过可视化界面，使用程序暴力请求登录接口，他们也无法得知 `09cb9471-896e-4b05-9b88-f7ef8e15f27b` 的 `x` 值。

#### 代码实现

实现起来也相对简单，只需手动定义 `api` 方法。

当你为 WC 组件 `puzzle-captcha-button` 定义 `api` 方法时，组件内部会自动监听该方法，从而跳过内部的接口校验功能。

```html
<script>
    document.querySelector('puzzle-captcha-button').api = async ({
        uuid,
        x
    }) => {
        // 模拟登录接口
        const login = (form) =>
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve({
                        code: 200,
                        message: '登录成功',
                        data: {
                            match: 0
                        }
                    })
                }, 1000)
            })

        // 调用登录接口
        return login({ username: 'xiaoming', password: '123456', uuid, x })
    }
</script>
```

## 进阶版本，更加高级的功能

以上介绍的是免费版本，虽然调用起来非常简单，基本上足够使用，但仍存在一些问题。

### 验证码接口不可靠

验证码接口服务部署在菜园服务器上，无法保证其始终在线。如果服务宕机，验证码图片将无法显示，验证码校验功能也会失效。如果你的网站需要一个高度稳定的验证码服务，可以考虑独立部署验证码服务器。

### 独立管理图片

当前的验证码图片由菜园前端维护，可能不符合你的需求。此外，图片的维护是在后端服务上进行的。

### 个性化调整

由于目前的样式和布局结构基本固定，难以进行重新排版和个性化调整。

为解决上述问题，你可以获取完整的前端和后端源代码，进行个性化调整和部署。
