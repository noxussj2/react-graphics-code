import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { url } from './config/api'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    base: './',
    server: {
        port: 12005,
        proxy: {
            '/api': {
                target: url,
                changeOrigin: true,
                secure: false
            }
        }
    },
    resolve: {
        alias: {
            '@': path.join(__dirname, 'src'),
            config: path.join(__dirname, 'config')
        }
    },
    build: {
        assetsInlineLimit: 1024 * 1024,
        rollupOptions: {
            output: {
                entryFileNames: 'puzzle-captcha-button.js',
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name === 'style.css') {
                        return 'puzzle-captcha-button.css' // 生产模式下的样式文件名
                    }
                    return assetInfo.name // 其他文件保持原名
                }
            }
        }
    },
    plugins: [react()]
})
