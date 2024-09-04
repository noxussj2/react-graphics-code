import App from './App.tsx'
import ReactDOM from 'react-dom/client'
import { createRoot } from 'react-dom/client'

if (import.meta.env.MODE === 'development') {
    createRoot(document.getElementById('root')!).render(<App />)
}

if (import.meta.env.MODE === 'production') {
    class PuzzleCaptchaButtonWC extends HTMLElement {
        onSuccess = () => {
            const event = new CustomEvent('success', {})
            this.dispatchEvent(event)
        }

        onFail = () => {
            const event = new CustomEvent('fail', {})
            this.dispatchEvent(event)
        }

        async connectedCallback() {
            // 创建 Shadow DOM
            const shadowRoot = this.attachShadow({ mode: 'open' })

            // 创建样式元素
            const styleElement = document.createElement('link')
            styleElement.rel = 'stylesheet'
            styleElement.href = './puzzle-captcha-button.css' // 替换为实际的 CSS 文件路径
            shadowRoot.appendChild(styleElement)

            // 挂载 React 组件
            const root = ReactDOM.createRoot(shadowRoot)
            root.render(<App onSuccess={this.onSuccess} onFail={this.onFail} />)
        }
    }

    // 注册自定义元素
    customElements.define('puzzle-captcha-button', PuzzleCaptchaButtonWC)
}
