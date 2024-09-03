import App from './App.tsx'
import ReactDOM from 'react-dom/client'
import { createRoot } from 'react-dom/client'

if (import.meta.env.MODE === 'development') {
    createRoot(document.getElementById('root')!).render(<App />)
}

if (import.meta.env.MODE === 'production') {
    class CaptchaButtonWC extends HTMLElement {
        async connectedCallback() {
            // 创建 Shadow DOM
            const shadowRoot = this.attachShadow({ mode: 'open' })

            // 创建样式元素
            const styleElement = document.createElement('link')
            styleElement.rel = 'stylesheet'
            styleElement.href = './index.css' // 替换为实际的 CSS 文件路径
            shadowRoot.appendChild(styleElement)

            // 挂载 React 组件
            const mountPoint = document.createElement('div')
            shadowRoot.appendChild(mountPoint)
            const root = ReactDOM.createRoot(mountPoint)
            root.render(<App />)
        }
    }

    // 注册自定义元素
    customElements.define('captcha-button', CaptchaButtonWC)
}
